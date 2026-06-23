import { NextRequest, NextResponse } from "next/server";
import type { CartItem } from "@/types";

const PAYPAL_BASE =
  process.env.PAYPAL_ENV === "production"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

async function getPayPalAccessToken(): Promise<string> {
  const credentials = Buffer.from(
    `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
  ).toString("base64");

  const res = await fetch(`${PAYPAL_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const data = await res.json();
  return data.access_token;
}

export async function POST(req: NextRequest) {
  try {
    const { items, shipping } = (await req.json()) as {
      items: CartItem[];
      shipping: number;
    };

    const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
    const total = subtotal + shipping;

    const accessToken = await getPayPalAccessToken();

    const order = await fetch(`${PAYPAL_BASE}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD", // PayPal ne supporte pas MAD — conversion indicative
              value: (total / 10.8).toFixed(2),
              breakdown: {
                item_total: {
                  currency_code: "USD",
                  value: (subtotal / 10.8).toFixed(2),
                },
                shipping: {
                  currency_code: "USD",
                  value: (shipping / 10.8).toFixed(2),
                },
              },
            },
            items: items.map((item) => ({
              name: `${item.name} — ${item.color}`,
              unit_amount: {
                currency_code: "USD",
                value: (item.price / 10.8).toFixed(2),
              },
              quantity: String(item.quantity),
            })),
          },
        ],
        application_context: {
          brand_name: "Atlas Leather",
          locale: "fr-MA",
          return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/checkout/paypal/capture`,
          cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/paiement?cancelled=1`,
        },
      }),
    });

    const orderData = await order.json();
    const approveLink = orderData.links?.find(
      (l: { rel: string; href: string }) => l.rel === "approve"
    );

    return NextResponse.json({ orderId: orderData.id, approveUrl: approveLink?.href });
  } catch (error) {
    console.error("[paypal/checkout]", error);
    return NextResponse.json({ error: "Erreur PayPal" }, { status: 500 });
  }
}
