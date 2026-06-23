"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import { useWishlistStore } from "@/store/wishlist.store";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { isWishlisted, toggle } = useWishlistStore();
  const wishlisted = isWishlisted(product.id);

  const hasDiscount =
    product.compareAtPrice && product.compareAtPrice > product.price;
  const discountPct = hasDiscount
    ? Math.round((1 - product.price / product.compareAtPrice!) * 100)
    : 0;

  return (
    <article className={cn("group relative", className)}>
      {/* Badge */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {product.isNewArrival && (
          <span className="bg-ink text-cream-100 text-[9px] uppercase tracking-widest px-2 py-1">
            Nouveau
          </span>
        )}
        {product.isLimitedEdition && (
          <span className="bg-gold text-ink text-[9px] uppercase tracking-widest px-2 py-1">
            Édition limitée
          </span>
        )}
        {hasDiscount && (
          <span className="bg-leather-200 text-cream-100 text-[9px] uppercase tracking-widest px-2 py-1">
            -{discountPct}%
          </span>
        )}
      </div>

      {/* Wishlist */}
      <button
        onClick={(e) => {
          e.preventDefault();
          toggle(product.id);
        }}
        className={cn(
          "absolute top-3 right-3 z-10 p-2 bg-cream-100/80 backdrop-blur-sm transition-all duration-300",
          "opacity-0 group-hover:opacity-100",
          "hover:bg-cream-100"
        )}
        aria-label={wishlisted ? "Retirer des favoris" : "Ajouter aux favoris"}
      >
        <Heart
          size={14}
          strokeWidth={1.5}
          className={cn(
            "transition-colors",
            wishlisted ? "fill-leather-100 text-leather-100" : "text-ink"
          )}
        />
      </button>

      {/* Image */}
      <Link href={`/produit/${product.slug}`}>
        <div className="img-zoom-wrap aspect-[3/4] relative bg-cream-300 mb-3">
          <Image
            src={product.images[0]?.url ?? "/images/placeholder.jpg"}
            alt={product.images[0]?.alt ?? product.name}
            fill
            className="img-zoom object-cover"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </div>

        {/* Infos produit */}
        <div className="space-y-1">
          <h3 className="font-serif text-sm lg:text-base text-ink group-hover:text-leather-100 transition-colors">
            {product.name}
          </h3>
          <p className="text-[11px] uppercase tracking-wider text-ink-muted">
            {product.material}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-ink">
              {formatPrice(product.price)}
            </span>
            {hasDiscount && (
              <span className="text-xs text-ink-muted line-through">
                {formatPrice(product.compareAtPrice!)}
              </span>
            )}
          </div>

          {/* Pastilles couleurs */}
          {product.colors.length > 1 && (
            <div className="flex gap-1.5 pt-1">
              {product.colors.slice(0, 5).map((c) => (
                <span
                  key={c.name}
                  className="w-3 h-3 rounded-full border border-cream-300 transition-transform hover:scale-125"
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
              {product.colors.length > 5 && (
                <span className="text-[10px] text-ink-muted">
                  +{product.colors.length - 5}
                </span>
              )}
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}
