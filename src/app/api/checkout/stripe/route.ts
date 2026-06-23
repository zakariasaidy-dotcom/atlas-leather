import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import type { CartItem } from "@/types";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
});

export async function POST(req: NextRequest) {
  try {
    const { items, address, shipping } = (await req.json()) as {
      items: CartItem[];
      address: Record<string, string>;
      shipping: number;
    };

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Panier vide" }, { status: 400 });
    }

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map(
      (item) => ({
        price_data: {
          currency: "mad",
          product_data: {
            name: `${item.name} — ${item.color}`,
            images: item.image ? [item.image] : [],
          },
          unit_amount: Math.round(item.price * 100), // centimes
        },
        quantity: item.quantity,
      })
    );

    // Frais de livraison
    if (shipping > 0) {
      lineItems.push({
        price_data: {
          currency: "mad",
          product_data: { name: "Frais de livraison" },
          unit_amount: Math.round(shipping * 100),
        },
        quantity: 1,
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/commande-confirmee?ref={CHECKOUT_SESSION_ID}&method=stripe`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/paiement?cancelled=1`,
      customer_email: address.email,
      shipping_address_collection: {
        allowed_countries: ["MA", "FR", "BE", "ES", "DE", "US", "CA"],
      },
      metadata: {
        items: JSON.stringify(items.map((i) => ({ id: i.productId, qty: i.quantity }))),
        customer_name: address.fullName,
        customer_phone: address.phone,
      },
      locale: "fr",
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("[stripe/checkout]", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de la session de paiement" },
      { status: 500 }
    );
  }
}
