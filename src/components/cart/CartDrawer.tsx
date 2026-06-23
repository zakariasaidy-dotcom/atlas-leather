"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/cart.store";
import { formatPrice } from "@/lib/utils";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getTotalPrice } =
    useCartStore();

  // Fermer avec Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeCart]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-ink/40 backdrop-blur-sm z-[60]"
            onClick={closeCart}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.aside
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="fixed top-0 right-0 h-full w-full max-w-[420px] bg-cream-100 z-[70] flex flex-col shadow-2xl"
            aria-label="Panier"
          >
            {/* En-tête */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-cream-300">
              <div className="flex items-center gap-2">
                <ShoppingBag size={18} strokeWidth={1.5} className="text-ink" />
                <h2 className="font-serif text-lg text-ink">Mon panier</h2>
                {items.length > 0 && (
                  <span className="text-ink-muted text-sm">({items.length})</span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="p-1.5 text-ink-muted hover:text-ink transition-colors"
                aria-label="Fermer le panier"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            {/* Corps */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <ShoppingBag size={40} strokeWidth={1} className="text-ink-muted/40" />
                  <p className="font-serif text-xl text-ink">Votre panier est vide</p>
                  <p className="text-sm text-ink-muted">
                    Découvrez nos collections et ajoutez vos pièces préférées.
                  </p>
                  <button onClick={closeCart} className="btn-outline mt-2">
                    Voir la boutique
                  </button>
                </div>
              ) : (
                <ul className="space-y-5">
                  {items.map((item) => (
                    <motion.li
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex gap-4 pb-5 border-b border-cream-300 last:border-0"
                    >
                      {/* Image */}
                      <Link
                        href={`/produit/${item.slug}`}
                        onClick={closeCart}
                        className="shrink-0 block w-20 h-20 bg-cream-300 relative overflow-hidden"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </Link>

                      {/* Infos */}
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/produit/${item.slug}`}
                          onClick={closeCart}
                          className="font-serif text-sm text-ink hover:text-leather-100 transition-colors line-clamp-1"
                        >
                          {item.name}
                        </Link>
                        <p className="text-xs text-ink-muted mt-0.5 flex items-center gap-1.5">
                          <span
                            className="w-3 h-3 rounded-full border border-cream-300 inline-block"
                            style={{ backgroundColor: item.colorHex }}
                          />
                          {item.color}
                        </p>
                        <p className="text-sm font-medium text-ink mt-1">
                          {formatPrice(item.price * item.quantity)}
                        </p>

                        {/* Quantité */}
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center border border-cream-300">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1.5 text-ink-muted hover:text-ink transition-colors"
                              aria-label="Diminuer"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="px-3 text-sm min-w-[28px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              disabled={item.quantity >= item.stock}
                              className="p-1.5 text-ink-muted hover:text-ink transition-colors disabled:opacity-30"
                              aria-label="Augmenter"
                            >
                              <Plus size={12} />
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-1 text-ink-muted/60 hover:text-destructive transition-colors ml-auto"
                            aria-label="Retirer"
                          >
                            <Trash2 size={14} strokeWidth={1.5} />
                          </button>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>

            {/* Pied */}
            {items.length > 0 && (
              <div className="border-t border-cream-300 px-6 py-5 space-y-4 bg-cream-200/50">
                {/* Livraison offerte */}
                {getTotalPrice() < 2000 && (
                  <div className="text-xs text-ink-muted text-center">
                    Plus que{" "}
                    <span className="text-leather-100 font-medium">
                      {formatPrice(2000 - getTotalPrice())}
                    </span>{" "}
                    pour la livraison offerte
                  </div>
                )}
                {getTotalPrice() >= 2000 && (
                  <p className="text-xs text-center text-leather-100 font-medium">
                    ✓ Livraison offerte
                  </p>
                )}

                <div className="flex justify-between items-center">
                  <span className="text-sm text-ink-muted uppercase tracking-wider text-xs">
                    Sous-total
                  </span>
                  <span className="font-serif text-lg text-ink">
                    {formatPrice(getTotalPrice())}
                  </span>
                </div>

                <Link
                  href="/paiement"
                  onClick={closeCart}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  Commander <ArrowRight size={14} />
                </Link>

                <Link
                  href="/panier"
                  onClick={closeCart}
                  className="block text-center text-xs uppercase tracking-widest text-ink-muted hover:text-ink transition-colors"
                >
                  Voir le panier complet
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
