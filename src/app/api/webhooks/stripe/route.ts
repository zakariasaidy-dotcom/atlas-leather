import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createAdminClient } from "@/lib/supabase/server";
import { generateOrderNumber } from "@/lib/utils";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: "STRIPE_SECRET_KEY manquante" },
      { status: 500 }
    );
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: "STRIPE_WEBHOOK_SECRET manquante" },
      { status: 500 }
    );
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-12-18.acacia",
  });

  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json(
      { error: "Signature manquante" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("[webhook/stripe] Signature invalide :", err);

    return NextResponse.json(
      { error: "Webhook invalide" },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      const supabase = await createAdminClient();
      const orderNumber = generateOrderNumber();

      const itemsMeta = session.metadata?.items
        ? JSON.parse(session.metadata.items)
        : [];

      await supabase.from("orders").insert({
        order_number: orderNumber,
        email: session.customer_email ?? "",
        items: itemsMeta,
        subtotal: (session.amount_subtotal ?? 0) / 100,
        shipping_cost: (session.shipping_cost?.amount_total ?? 0) / 100,
        total: (session.amount_total ?? 0) / 100,
        currency: "MAD",
        shipping_address: session.shipping_details?.address ?? {},
        payment_method: "stripe",
        payment_reference: String(session.payment_intent ?? ""),
        status: "confirmee",
      });

      console.log(`[webhook/stripe] Commande ${orderNumber} créée`);
    } catch (err) {
      console.error("[webhook/stripe] Erreur Supabase :", err);
    }
  }

  return NextResponse.json({ received: true });
}