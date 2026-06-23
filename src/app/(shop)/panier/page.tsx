"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/cart.store";
import { formatPrice, calculateShipping } from "@/lib/utils";

export default function PanierPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore();
  const subtotal = getTotalPrice();
  const shipping = calculateShipping(subtotal, "MA");
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="container-premium py-20 text-center">
        <ShoppingBag size={48} strokeWidth={1} className="text-ink-muted/30 mx-auto mb-6" />
        <h1 className="font-serif text-display-sm text-ink mb-3">Votre panier est vide</h1>
        <p className="text-ink-muted mb-8">
          Découvrez nos collections et ajoutez vos pièces préférées.
        </p>
        <Link href="/boutique" className="btn-primary">
          Voir la boutique
        </Link>
      </div>
    );
  }

  return (
    <div className="container-premium py-10 lg:py-16">
      <h1 className="font-serif text-display-sm text-ink mb-10">Mon panier</h1>

      <div className="grid lg:grid-cols-[1fr_360px] gap-12">
        {/* Liste des articles */}
        <div>
          <div className="border-t border-cream-300">
            <AnimatePresence initial={false}>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex gap-5 py-6 border-b border-cream-300"
                >
                  <Link href={`/produit/${item.slug}`} className="shrink-0 w-24 h-28 relative bg-cream-300">
                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="96px" />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <Link href={`/produit/${item.slug}`} className="font-serif text-base text-ink hover:text-leather-100 transition-colors">
                          {item.name}
                        </Link>
                        <p className="text-xs text-ink-muted mt-1 flex items-center gap-1.5">
                          <span className="w-3 h-3 rounded-full border border-cream-300" style={{ backgroundColor: item.colorHex }} />
                          {item.color}
                        </p>
                      </div>
                      <p className="font-serif text-lg text-ink shrink-0">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-cream-300">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 text-ink-muted hover:text-ink">
                          <Minus size={12} />
                        </button>
                        <span className="px-4 text-sm">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} disabled={item.quantity >= item.stock} className="p-2 text-ink-muted hover:text-ink disabled:opacity-30">
                          <Plus size={12} />
                        </button>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-xs text-ink-muted hover:text-destructive flex items-center gap-1 transition-colors">
                        <Trash2 size={12} strokeWidth={1.5} />
                        Retirer
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Résumé */}
        <div className="bg-cream-200/60 p-6 h-fit">
          <h2 className="font-serif text-lg text-ink mb-6">Résumé de la commande</h2>

          <div className="space-y-3 text-sm border-b border-cream-300 pb-5 mb-5">
            <div className="flex justify-between">
              <span className="text-ink-muted">Sous-total</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink-muted">Livraison</span>
              <span>{shipping === 0 ? <span className="text-leather-100 text-xs uppercase tracking-wide">Offerte</span> : formatPrice(shipping)}</span>
            </div>
          </div>

          <div className="flex justify-between items-baseline mb-8">
            <span className="text-xs uppercase tracking-widest text-ink-muted">Total</span>
            <span className="font-serif text-2xl text-ink">{formatPrice(total)}</span>
          </div>

          <Link href="/paiement" className="btn-primary w-full flex items-center justify-center gap-2 mb-4">
            Passer la commande <ArrowRight size={14} />
          </Link>
          <Link href="/boutique" className="block text-center text-xs uppercase tracking-widest text-ink-muted hover:text-ink transition-colors">
            Continuer les achats
          </Link>

          {/* Badges confiance */}
          <div className="mt-6 pt-5 border-t border-cream-300 space-y-2">
            {["Paiement 100% sécurisé", "Livraison soignée sous emballage premium", "Service client Casablanca"].map((t) => (
              <p key={t} className="text-[11px] text-ink-muted flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                {t}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
