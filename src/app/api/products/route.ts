import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { DEMO_PRODUCTS } from "@/data/products";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("categorie");
  const gender = searchParams.get("genre");
  const sort = searchParams.get("tri") ?? "nouveautes";
  const limit = parseInt(searchParams.get("limit") ?? "50");

  try {
    // Tentative Supabase — fallback sur données statiques si non configuré
    const supabase = await createClient();
    let query = supabase
      .from("products")
      .select("*")
      .eq("is_published", true)
      .limit(limit);

    if (category) query = query.eq("category", category);
    if (gender) query = query.eq("gender", gender);

    switch (sort) {
      case "meilleures-ventes":
        query = query.order("review_count", { ascending: false });
        break;
      case "prix-croissant":
        query = query.order("price", { ascending: true });
        break;
      case "prix-decroissant":
        query = query.order("price", { ascending: false });
        break;
      default:
        query = query.order("created_at", { ascending: false });
    }

    const { data, error } = await query;

    if (error || !data) throw new Error("Supabase unavailable");

    return NextResponse.json({ products: data, source: "supabase" });
  } catch {
    // Fallback données statiques
    let products = [...DEMO_PRODUCTS];
    if (category) products = products.filter((p) => p.category === category);
    if (gender) products = products.filter((p) => p.gender === gender);

    return NextResponse.json({ products: products.slice(0, limit), source: "static" });
  }
}
