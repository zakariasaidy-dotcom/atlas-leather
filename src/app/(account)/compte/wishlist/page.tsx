"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useWishlistStore } from "@/store/wishlist.store";
import { DEMO_PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/shared/ProductCard";

export default function WishlistPage() {
  const { productIds } = useWishlistStore();
  const products = DEMO_PRODUCTS.filter((p) => productIds.includes(p.id));

  return (
    <div className="container-premium py-12 lg:py-16 max-w-5xl mx-auto">
      <div className="mb-10">
        <p className="overline mb-2">Espace client</p>
        <h1 className="font-serif text-display-sm text-ink flex items-center gap-3">
          Ma wishlist
          {products.length > 0 && (
            <span className="text-base text-ink-muted font-sans">({products.length})</span>
          )}
        </h1>
      </div>

      {products.length === 0 ? (
        <div className="bg-cream-200/50 py-16 text-center">
          <Heart size={48} strokeWidth={1} className="text-ink-muted/20 mx-auto mb-5" />
          <h2 className="font-serif text-xl text-ink mb-3">Votre wishlist est vide</h2>
          <p className="text-sm text-ink-muted mb-6">
            Ajoutez des pièces à votre liste en cliquant sur le ♡ sur les fiches produits.
          </p>
          <Link href="/boutique" className="btn-primary">
            Explorer la boutique
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
