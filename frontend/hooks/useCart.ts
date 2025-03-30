"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Phone {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  description: string;
  specifications: {
    [key: string]: string;
  };
}

interface CartStore {
  cartItems: Phone[];
  addToCart: (phone: Phone) => void;
  removeFromCart: (phoneId: string) => void;
  clearCart: () => void;
}

export const useCart = create<CartStore>()(
  persist(
    (set) => ({
      cartItems: [],
      addToCart: (phone) =>
        set((state) => ({
          cartItems: [...state.cartItems, phone],
        })),
      removeFromCart: (phoneId) =>
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== phoneId),
        })),
      clearCart: () => set({ cartItems: [] }),
    }),
    {
      name: "cart-storage",
    }
  )
);
