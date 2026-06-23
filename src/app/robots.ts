import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://atlasleather.ma";
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/compte/", "/paiement/", "/connexion/", "/inscription/"],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
  };
}
