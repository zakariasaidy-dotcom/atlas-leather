"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface WishlistStore {
  productIds: string[];
  toggle: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  count: () => number;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      productIds: [],

      toggle: (productId) => {
        const current = get().productIds;
        const exists = current.includes(productId);
        set({
          productIds: exists
            ? current.filter((id) => id !== productId)
            : [...current, productId],
        });
      },

      isWishlisted: (productId) => get().productIds.includes(productId),

      count: () => get().productIds.length,
    }),
    {
      name: "atlas-leather-wishlist",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
