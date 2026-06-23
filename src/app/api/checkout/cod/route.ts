import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { generateOrderNumber } from "@/lib/utils";
import type { CartItem } from "@/types";

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

    if (address.country !== "MA") {
      return NextResponse.json(
        { error: "Le paiement à la livraison est disponible au Maroc uniquement" },
        { status: 400 }
      );
    }

    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const total = subtotal + shipping;
    const orderNumber = generateOrderNumber();

    const supabase = await createAdminClient();

    const { error } = await supabase.from("orders").insert({
      order_number: orderNumber,
      email: address.email,
      items: items,
      subtotal,
      shipping_cost: shipping,
      total,
      currency: "MAD",
      shipping_address: {
        fullName: address.fullName,
        phone: address.phone,
        addressLine1: address.addressLine1,
        addressLine2: address.addressLine2 ?? "",
        city: address.city,
        postalCode: address.postalCode,
        country: address.country,
      },
      payment_method: "cod",
      status: "confirmee",
    });

    if (error) {
      console.error("[cod/checkout] Supabase error:", error);
      return NextResponse.json({ error: "Erreur lors de la création de la commande" }, { status: 500 });
    }

    return NextResponse.json({ orderNumber, total });
  } catch (error) {
    console.error("[cod/checkout]", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
