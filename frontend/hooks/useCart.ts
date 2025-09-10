"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartStore {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  totalQuantity: () => number;
  totalPrice: () => number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      cartItems: [],
      addToCart: (item) =>
        set((state) => {
          const idx = state.cartItems.findIndex((x) => x.id === item.id);
          if (idx >= 0) {
            const next = [...state.cartItems];
            next[idx] = { ...next[idx], quantity: next[idx].quantity + 1 };
            return { cartItems: next };
          }
          return { cartItems: [...state.cartItems, { ...item, quantity: 1 }] };
        }),
      increment: (id) =>
        set((state) => ({
          cartItems: state.cartItems.map((x) =>
            x.id === id ? { ...x, quantity: x.quantity + 1 } : x
          ),
        })),
      decrement: (id) =>
        set((state) => ({
          cartItems: state.cartItems
            .map((x) => (x.id === id ? { ...x, quantity: x.quantity - 1 } : x))
            .filter((x) => x.quantity > 0),
        })),
      removeFromCart: (id) =>
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== id),
        })),
      clearCart: () => set({ cartItems: [] }),
      totalQuantity: () =>
        get().cartItems.reduce((sum, i) => sum + i.quantity, 0),
      totalPrice: () =>
        get().cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    { name: "cart-storage" }
  )
);
