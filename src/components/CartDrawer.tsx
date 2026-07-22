"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/store/cart";
import Link from "next/link";

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, totalPrice, totalItems } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[440px] bg-bg-dark z-[70] flex flex-col shadow-2xl border-l border-accent/10"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-accent/10">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} className="text-accent" />
                <span className="text-xl font-bold text-text" style={{ fontFamily: "var(--font-playfair)" }}>Your Cart</span>
                {totalItems() > 0 && <span className="text-xs text-text-muted">({totalItems()})</span>}
              </div>
              <button
                onClick={closeCart}
                className="p-2 text-text-muted hover:text-text transition-colors"
                aria-label="Close cart"
              >
                <X size={22} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mb-6"
                  >
                    <ShoppingBag size={32} className="text-accent" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-text mb-2" style={{ fontFamily: "var(--font-playfair)" }}>Your cart is empty</h3>
                  <p className="text-sm text-text-muted mb-8">Explore our cricket collection</p>
                  <Link
                    href="/products"
                    onClick={closeCart}
                    className="px-6 py-3 bg-accent text-bg-dark text-xs font-medium tracking-wider uppercase hover:bg-accent-light transition-all rounded-xl"
                  >
                    Browse Products
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.slug}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex gap-4 p-4 bg-white/[0.03] rounded-2xl border border-accent/10"
                    >
                      <div className="relative w-16 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-bg-hover">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-text text-sm truncate">{item.name}</h4>
                        <p className="text-accent font-mono text-sm mt-1">{item.price}</p>
                        <div className="flex items-center gap-3 mt-3">
                          <button
                            onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                            className="w-7 h-7 rounded-full border border-accent/30 flex items-center justify-center text-text-muted hover:border-accent hover:text-text transition-colors"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-sm font-mono text-text w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                            className="w-7 h-7 rounded-full border border-accent/30 flex items-center justify-center text-text-muted hover:border-accent hover:text-text transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                          <button
                            onClick={() => removeItem(item.slug)}
                            className="ml-auto p-1 text-text-muted/50 hover:text-red-400 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-accent/10 p-6 space-y-4 bg-premium-dark">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-text-muted tracking-wider uppercase">Total</span>
                  <span className="text-2xl font-bold text-text" style={{ fontFamily: "var(--font-playfair)" }}>
                    ₹{totalPrice()}
                  </span>
                </div>
                <p className="text-[11px] text-text-muted/50">Shipping calculated at checkout · UPI / COD available</p>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="block w-full text-center py-4 bg-accent text-bg-dark text-sm font-bold tracking-wider uppercase hover:bg-accent-light transition-all rounded-xl"
                >
                  Checkout
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
