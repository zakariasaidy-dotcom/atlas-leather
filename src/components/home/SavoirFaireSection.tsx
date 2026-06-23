"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight } from "lucide-react";

const VALUES = [
  {
    label: "Qualité",
    text: "Seul le cuir pleine fleur tanné végétalement est sélectionné pour nos créations.",
  },
  {
    label: "Authenticité",
    text: "Chaque pièce est produite dans notre atelier de Casablanca, avec des techniques ancestrales.",
  },
  {
    label: "Durabilité",
    text: "Conçues pour durer des décennies, nos pièces se bonifient avec le temps.",
  },
];

export function SavoirFaireSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-leather-500 overflow-hidden">
      <div className="container-premium grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="aspect-[4/5] relative">
            <Image
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900"
              alt="Artisan Atlas Leather façonnant du cuir à la main"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          {/* Encadré chiffre */}
          <div className="absolute -bottom-6 -right-4 lg:-right-8 bg-cream-100 p-6 lg:p-8 shadow-lg">
            <p className="font-serif text-4xl text-ink">15+</p>
            <p className="text-[11px] uppercase tracking-wider text-ink-muted mt-1">
              Années de savoir-faire
            </p>
          </div>
        </motion.div>

        {/* Texte */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-cream-100"
        >
          <p className="text-[11px] uppercase tracking-[0.25em] text-gold-light mb-5">
            Notre savoir-faire
          </p>
          <h2 className="font-serif text-display-sm lg:text-display-md leading-tight mb-6">
            L&apos;artisanat marocain,
            <br />
            <em className="not-italic text-sand-200">réinventé pour aujourd&apos;hui</em>
          </h2>
          <p className="text-cream-100/65 leading-relaxed mb-8 text-base">
            Fondée à Casablanca, Atlas Leather puise ses racines dans les ateliers
            de maroquinerie qui font la réputation du Maroc à travers le monde.
            Chaque point de couture, chaque coupe de cuir est exécuté à la main
            par des maîtres artisans formés au sein de notre atelier.
          </p>

          {/* Valeurs */}
          <div className="space-y-5 mb-10">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.label}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.12 }}
                className="flex gap-4"
              >
                <div className="w-px bg-gold/40 shrink-0" />
                <div>
                  <h3 className="text-cream-100 text-sm font-medium uppercase tracking-wider mb-1">
                    {v.label}
                  </h3>
                  <p className="text-cream-100/55 text-sm leading-relaxed">{v.text}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <Link href="/histoire" className="btn-gold inline-flex">
            Notre histoire <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
