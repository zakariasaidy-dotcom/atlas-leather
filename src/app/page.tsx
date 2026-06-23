import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { SavoirFaireSection } from "@/components/home/SavoirFaireSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { MarqueeSection } from "@/components/home/MarqueeSection";
import { DEMO_PRODUCTS, DEMO_TESTIMONIALS } from "@/data/products";

export const metadata: Metadata = {
  title: "Atlas Leather — Maroquinerie artisanale marocaine",
  description:
    "Découvrez Atlas Leather, maison de maroquinerie artisanale fondée à Casablanca. L'élégance du cuir marocain, façonnée à la main.",
};

export default function HomePage() {
  const featured = DEMO_PRODUCTS.filter((p) => p.isBestSeller || p.isNewArrival).slice(0, 4);

  return (
    <>
      <HeroSection />
      <MarqueeSection />
      <CategoriesSection />
      <FeaturedProducts products={featured} />
      <SavoirFaireSection />
      <TestimonialsSection testimonials={DEMO_TESTIMONIALS} />
    </>
  );
}
