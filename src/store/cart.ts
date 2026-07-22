"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: string;
  slug: string;
  name: string;
  image: string;
  price: string;
  quantity: number;
};

type CartStore = {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (slug: string) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
};

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      addItem: (item) => {
        const existing = get().items.find((i) => i.slug === item.slug);
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.slug === item.slug ? { ...i, quantity: i.quantity + 1 } : i
            ),
            isOpen: true,
          });
        } else {
          set({ items: [...get().items, { ...item, quantity: 1 }], isOpen: true });
        }
      },
      removeItem: (slug) =>
        set({ items: get().items.filter((i) => i.slug !== slug) }),
      updateQuantity: (slug, quantity) => {
        if (quantity <= 0) {
          get().removeItem(slug);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.slug === slug ? { ...i, quantity } : i
          ),
        });
      },
      clearCart: () => set({ items: [] }),
      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      totalPrice: () =>
        get().items.reduce((sum, i) => {
          const price = parseInt(i.price.replace(/[^0-9]/g, ""));
          return sum + (isNaN(price) ? 0 : price * i.quantity);
        }, 0),
    }),
    {
      name: "gw-cart",
      partialize: (state) => ({ items: state.items }),
    }
  )
);
