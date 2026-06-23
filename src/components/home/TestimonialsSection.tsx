"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Star } from "lucide-react";
import type { Testimonial } from "@/types";
import { cn } from "@/lib/utils";

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={12}
          className={cn(
            i < rating ? "fill-gold text-gold" : "text-cream-300 fill-cream-300"
          )}
        />
      ))}
    </div>
  );
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="py-20 lg:py-28 container-premium">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="text-center mb-14"
      >
        <p className="overline mb-3">Avis clients</p>
        <h2 className="font-serif text-display-sm lg:text-display-md text-ink mb-3">
          Ce qu&apos;ils en disent
        </h2>
        <div className="flex items-center justify-center gap-2 text-sm text-ink-muted">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={14} className="fill-gold text-gold" />
            ))}
          </div>
          <span>4,9 / 5 · Plus de 180 avis vérifiés</span>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            className="bg-cream-200/60 p-6 flex flex-col gap-4"
          >
            <StarRating rating={t.rating} />
            <blockquote className="font-serif text-sm text-ink leading-relaxed flex-1">
              &ldquo;{t.content}&rdquo;
            </blockquote>
            <div>
              <p className="text-sm font-medium text-ink">{t.authorName}</p>
              {t.authorLocation && (
                <p className="text-xs text-ink-muted mt-0.5">{t.authorLocation}</p>
              )}
              {t.productName && (
                <p className="text-[11px] uppercase tracking-wider text-leather-100 mt-2">
                  {t.productName}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
