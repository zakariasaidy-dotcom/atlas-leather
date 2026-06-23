"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight } from "lucide-react";

const CATEGORIES = [
  {
    label: "Sacs femme",
    href: "/boutique?categorie=sacs-femme",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800",
    accent: "Collection Femme",
  },
  {
    label: "Sacs homme",
    href: "/boutique?categorie=sacs-homme",
    image: "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=800",
    accent: "Collection Homme",
  },
  {
    label: "Petite maroquinerie",
    href: "/boutique?categorie=portefeuilles",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800",
    accent: "Accessoires essentiels",
  },
  {
    label: "Éditions limitées",
    href: "/boutique?categorie=editions-limitees",
    image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800",
    accent: "Pièces numérotées",
  },
];

export function CategoriesSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section ref={ref} className="py-20 lg:py-28 container-premium">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="text-center mb-12"
      >
        <p className="overline mb-3">Collections</p>
        <h2 className="font-serif text-display-sm lg:text-display-md text-ink">
          Explorez notre univers
        </h2>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        {CATEGORIES.map((cat, i) => (
          <motion.div
            key={cat.href}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: i * 0.1 }}
          >
            <Link href={cat.href} className="group block relative">
              {/* Image */}
              <div className="img-zoom-wrap aspect-[3/4] relative bg-cream-300">
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  className="img-zoom object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
                {/* Overlay au survol */}
                <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/20 transition-colors duration-500" />
              </div>

              {/* Légende */}
              <div className="mt-3">
                <p className="text-[10px] uppercase tracking-[0.2em] text-ink-muted mb-1">
                  {cat.accent}
                </p>
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-base lg:text-lg text-ink">
                    {cat.label}
                  </h3>
                  <ArrowRight
                    size={14}
                    strokeWidth={1.5}
                    className="text-ink-muted group-hover:translate-x-1 transition-transform duration-300"
                  />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
