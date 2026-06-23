"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Heart, ChevronDown, Star, Truck, RotateCcw, Shield } from "lucide-react";
import { toast } from "sonner";
import { useCartStore } from "@/store/cart.store";
import { useWishlistStore } from "@/store/wishlist.store";
import { formatPrice, cn } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductDetailProps {
  product: Product;
}

const ACCORDION_ITEMS = [
  {
    key: "description",
    title: "Description",
  },
  {
    key: "characteristics",
    title: "Caractéristiques",
  },
  {
    key: "delivery",
    title: "Livraison et retours",
    content: "Livraison offerte au Maroc dès 2 000 MAD. Livraison internationale disponible (7-14 jours). Retours acceptés sous 14 jours dans leur emballage d'origine.",
  },
  {
    key: "care",
    title: "Entretien",
    content: "Appliquez une crème nourrissante pour cuir tous les 3 mois. Évitez l'humidité prolongée. Rangez dans la housse fournie, à l'abri de la lumière directe.",
  },
];

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [openAccordion, setOpenAccordion] = useState<string | null>("description");
  const [loading, setLoading] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const { isWishlisted, toggle } = useWishlistStore();
  const wishlisted = isWishlisted(product.id);

  async function handleAddToCart() {
    if (product.stock === 0) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 350)); // feedback visuel
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[0]?.url ?? "",
      color: selectedColor.name,
      colorHex: selectedColor.hex,
      quantity: 1,
      stock: product.stock,
    });
    toast.success(`${product.name} ajouté au panier`);
    setLoading(false);
  }

  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;

  return (
    <section className="container-premium py-10 lg:py-16">
      {/* Breadcrumb */}
      <nav className="flex gap-2 text-xs text-ink-muted uppercase tracking-wider mb-10">
        <Link href="/" className="hover:text-ink transition-colors">Accueil</Link>
        <span>/</span>
        <Link href="/boutique" className="hover:text-ink transition-colors">Boutique</Link>
        <span>/</span>
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-10 xl:gap-20">
        {/* Galerie */}
        <div className="flex gap-3">
          {/* Miniatures */}
          {product.images.length > 1 && (
            <div className="flex flex-col gap-2 w-16 shrink-0">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={cn(
                    "aspect-square relative bg-cream-300 border-2 transition-colors",
                    selectedImage === i ? "border-ink" : "border-transparent hover:border-cream-300"
                  )}
                >
                  <Image src={img.url} alt={img.alt} fill className="object-cover" sizes="64px" />
                </button>
              ))}
            </div>
          )}

          {/* Image principale */}
          <div className="flex-1">
            <div className="aspect-[4/5] relative bg-cream-300 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={product.images[selectedImage]?.url ?? ""}
                    alt={product.images[selectedImage]?.alt ?? product.name}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isLimitedEdition && (
                  <span className="bg-gold text-ink text-[9px] uppercase tracking-widest px-2.5 py-1.5">
                    Édition limitée · {product.limitedEditionCount} exemplaires
                  </span>
                )}
                {product.isNewArrival && (
                  <span className="bg-ink text-cream-100 text-[9px] uppercase tracking-widest px-2.5 py-1.5">
                    Nouveau
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Infos produit */}
        <div>
          <h1 className="font-serif text-display-sm text-ink mb-2">{product.name}</h1>

          {/* Note */}
          {product.rating && (
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    className={cn(
                      i < Math.floor(product.rating!) ? "fill-gold text-gold" : "text-cream-300 fill-cream-300"
                    )}
                  />
                ))}
              </div>
              <span className="text-xs text-ink-muted">
                {product.rating} · {product.reviewCount} avis
              </span>
            </div>
          )}

          {/* Prix */}
          <div className="flex items-baseline gap-3 mb-6">
            <span className="font-serif text-2xl text-ink">{formatPrice(product.price)}</span>
            {hasDiscount && (
              <span className="text-sm text-ink-muted line-through">
                {formatPrice(product.compareAtPrice!)}
              </span>
            )}
          </div>

          <p className="text-sm text-ink-muted leading-relaxed mb-8">
            {product.shortDescription}
          </p>

          {/* Sélecteur couleur */}
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-ink mb-3">
              Couleur:{" "}
              <span className="text-leather-100">{selectedColor.name}</span>
            </p>
            <div className="flex gap-2.5">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  title={color.name}
                  className={cn(
                    "w-7 h-7 rounded-full border-2 transition-all duration-200",
                    selectedColor.name === color.name
                      ? "border-ink scale-110"
                      : "border-cream-300 hover:border-ink/40"
                  )}
                  style={{ backgroundColor: color.hex }}
                />
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={handleAddToCart}
              disabled={loading || product.stock === 0}
              className="btn-primary flex-1 relative overflow-hidden"
            >
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.span
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <span className="w-4 h-4 border-2 border-cream-100/30 border-t-cream-100 rounded-full animate-spin" />
                    Ajout…
                  </motion.span>
                ) : (
                  <motion.span
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <ShoppingBag size={15} strokeWidth={1.5} />
                    {product.stock === 0 ? "Épuisé" : "Ajouter au panier"}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <button
              onClick={() => toggle(product.id)}
              className={cn(
                "p-4 border transition-all duration-200",
                wishlisted
                  ? "border-leather-100 bg-leather-100/10 text-leather-100"
                  : "border-cream-300 text-ink-muted hover:border-ink hover:text-ink"
              )}
              aria-label="Wishlist"
            >
              <Heart size={16} strokeWidth={1.5} className={cn(wishlisted && "fill-current")} />
            </button>
          </div>

          {/* Infos livraison */}
          <div className="space-y-2.5 py-5 border-t border-b border-cream-300 mb-8">
            {[
              { icon: Truck, text: "Livraison offerte au Maroc dès 2 000 MAD" },
              { icon: RotateCcw, text: "Retours gratuits sous 14 jours" },
              { icon: Shield, text: "Paiement sécurisé · Stripe, PayPal, COD" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3 text-xs text-ink-muted">
                <Icon size={14} strokeWidth={1.5} className="text-leather-100 shrink-0" />
                {text}
              </div>
            ))}
          </div>

          {/* Accordéon */}
          <div className="space-y-0 border-t border-cream-300">
            {ACCORDION_ITEMS.map((item) => {
              const isOpen = openAccordion === item.key;
              const content =
                item.key === "description"
                  ? product.description
                  : item.key === "characteristics"
                  ? product.features.join("\n")
                  : item.content ?? "";

              return (
                <div key={item.key} className="border-b border-cream-300">
                  <button
                    onClick={() => setOpenAccordion(isOpen ? null : item.key)}
                    className="w-full flex items-center justify-between py-4 text-left"
                  >
                    <span className="text-xs uppercase tracking-widest text-ink font-medium">
                      {item.title}
                    </span>
                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
                      <ChevronDown size={14} strokeWidth={1.5} className="text-ink-muted" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-5">
                          {item.key === "characteristics" ? (
                            <ul className="space-y-2">
                              {product.features.map((f) => (
                                <li key={f} className="flex items-start gap-2 text-sm text-ink-muted">
                                  <span className="w-1 h-1 rounded-full bg-gold mt-2 shrink-0" />
                                  {f}
                                </li>
                              ))}
                              {product.dimensions && (
                                <li className="flex items-start gap-2 text-sm text-ink-muted">
                                  <span className="w-1 h-1 rounded-full bg-gold mt-2 shrink-0" />
                                  Dimensions : {product.dimensions}
                                </li>
                              )}
                            </ul>
                          ) : (
                            <p className="text-sm text-ink-muted leading-relaxed">{content}</p>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
