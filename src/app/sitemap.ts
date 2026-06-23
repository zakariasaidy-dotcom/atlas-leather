import { MetadataRoute } from "next";
import { DEMO_PRODUCTS } from "@/data/products";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://atlasleather.ma";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: BASE, priority: 1.0, changeFrequency: "weekly" as const },
    { url: `${BASE}/boutique`, priority: 0.9, changeFrequency: "daily" as const },
    { url: `${BASE}/histoire`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${BASE}/blog`, priority: 0.7, changeFrequency: "weekly" as const },
    { url: `${BASE}/contact`, priority: 0.6, changeFrequency: "monthly" as const },
  ];

  const productPages = DEMO_PRODUCTS.map((p) => ({
    url: `${BASE}/produit/${p.slug}`,
    priority: 0.8,
    changeFrequency: "weekly" as const,
    lastModified: new Date(p.createdAt),
  }));

  const blogPages = [
    "entretenir-cuir-pleine-fleur",
    "tendances-maroquinerie-2025",
    "histoire-artisanat-maroquinerie-marocaine",
  ].map((slug) => ({
    url: `${BASE}/blog/${slug}`,
    priority: 0.6,
    changeFrequency: "monthly" as const,
  }));

  return [...staticPages, ...productPages, ...blogPages];
}
