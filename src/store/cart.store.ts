"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CartItem } from "@/types";

interface CartStore {
  items: CartItem[];
  isOpen: boolean;

  // Actions
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  // Computed
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getItemCount: (productId: string) => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (newItem) => {
        const id = `${newItem.productId}-${newItem.color.replace(/\s/g, "-").toLowerCase()}`;
        const existing = get().items.find((i) => i.id === id);

        if (existing) {
          const newQty = Math.min(existing.quantity + 1, existing.stock);
          set((state) => ({
            items: state.items.map((item) =>
              item.id === id ? { ...item, quantity: newQty } : item
            ),
            isOpen: true,
          }));
        } else {
          set((state) => ({
            items: [...state.items, { ...newItem, id, quantity: 1 }],
            isOpen: true,
          }));
        }
      },

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set((state) => ({
          items: state.items.map((item) => {
            if (item.id !== id) return item;
            return { ...item, quantity: Math.min(quantity, item.stock) };
          }),
        }));
      },

      clearCart: () => set({ items: [] }),

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      getTotalItems: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),

      getTotalPrice: () =>
        get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),

      getItemCount: (productId) =>
        get()
          .items.filter((i) => i.productId === productId)
          .reduce((sum, i) => sum + i.quantity, 0),
    }),
    {
      name: "atlas-leather-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    }
  )
);
