"use client";
import React from "react";
import { X, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface CartPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartPopup({ isOpen, onClose }: CartPopupProps) {
  const {
    cartItems,
    removeFromCart,
    clearCart,
    increment,
    decrement,
    totalPrice,
  } = useCart();
  const total = totalPrice();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-hidden"
          >
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 20 }}
              className="absolute right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-900 shadow-xl"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b">
                  <h2 className="text-xl font-semibold">Shopping Cart</h2>
                  <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                  {cartItems.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500 dark:text-gray-400">
                        Your cart is empty
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cartItems.map((item, index) => (
                        <motion.div
                          key={`${item.id}-${index}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                        >
                          <div className="relative h-20 w-20">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover rounded-md"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {item.brand}
                            </p>
                            <div className="mt-1 flex items-center justify-between">
                              <div className="inline-flex items-center gap-2">
                                <button
                                  className="h-6 w-6 rounded border px-1"
                                  onClick={() => decrement(item.id)}
                                  aria-label="Decrease"
                                >
                                  -
                                </button>
                                <span className="text-sm">{item.quantity}</span>
                                <button
                                  className="h-6 w-6 rounded border px-1"
                                  onClick={() => increment(item.id)}
                                  aria-label="Increase"
                                >
                                  +
                                </button>
                              </div>
                              <p className="text-blue-600 dark:text-blue-400 font-semibold">
                                Rs.{" "}
                                {(item.price * item.quantity).toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>

                {cartItems.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border-t p-4"
                  >
                    <div className="flex justify-between mb-4">
                      <span className="font-semibold">Total:</span>
                      <span className="font-semibold text-blue-600 dark:text-blue-400">
                        Rs. {total.toLocaleString()}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <Button
                        onClick={clearCart}
                        variant="outline"
                        className="w-full"
                      >
                        Clear Cart
                      </Button>
                      <Link href="/checkout" className="block">
                        <Button className="w-full bg-blue-600 hover:bg-blue-700">
                          Proceed to Checkout
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
