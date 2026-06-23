"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const FADE_UP = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

export function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center overflow-hidden bg-leather-500">
      {/* Image de fond */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1920&q=90"
          alt="Sac en cuir artisanal Atlas Leather"
          fill
          priority
          className="object-cover opacity-40"
          sizes="100vw"
        />
        {/* Dégradé */}
        <div className="absolute inset-0 bg-gradient-to-b from-leather-500/60 via-leather-500/30 to-leather-500/70" />
      </div>

      {/* Grain texture subtil */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Contenu centré */}
      <div className="relative z-10 text-center px-5 max-w-3xl mx-auto">
        <motion.p
          variants={FADE_UP}
          initial="hidden"
          animate="visible"
          custom={0.1}
          className="text-[11px] uppercase tracking-[0.3em] text-gold-light mb-6"
        >
          Maroquinerie artisanale marocaine
        </motion.p>

        <motion.h1
          variants={FADE_UP}
          initial="hidden"
          animate="visible"
          custom={0.25}
          className="font-serif text-display-md lg:text-display-lg text-cream-100 leading-[1.12] mb-8"
        >
          L&apos;élégance du cuir marocain,{" "}
          <em className="not-italic text-sand-200">façonnée à la main.</em>
        </motion.h1>

        <motion.p
          variants={FADE_UP}
          initial="hidden"
          animate="visible"
          custom={0.4}
          className="text-cream-100/65 text-base lg:text-lg font-sans mb-10 max-w-lg mx-auto leading-relaxed"
        >
          Chaque pièce est travaillée par nos artisans à Casablanca, selon des
          techniques transmises de génération en génération.
        </motion.p>

        <motion.div
          variants={FADE_UP}
          initial="hidden"
          animate="visible"
          custom={0.55}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/boutique" className="btn-gold">
            Découvrir la collection
            <ArrowRight size={14} />
          </Link>
          <Link
            href="/histoire"
            className="text-cream-100/70 text-xs uppercase tracking-[0.2em] hover:text-cream-100 transition-colors link-underline"
          >
            Notre savoir-faire
          </Link>
        </motion.div>
      </div>

      {/* Indicateur scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-cream-100/50 to-transparent"
        />
        <span className="text-[10px] uppercase tracking-[0.25em] text-cream-100/40">
          Défiler
        </span>
      </motion.div>
    </section>
  );
}
