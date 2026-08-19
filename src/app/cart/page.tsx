"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Plus, Minus, Trash2, ShoppingBag, ArrowLeft, ChevronRight } from "lucide-react";
import { useCart } from "@/store/cart";
import { ProductImage } from "@/components/ProductImage";

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="pt-28 min-h-[60vh] flex items-center">
        <div className="max-w-md mx-auto px-6 text-center">
          <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={32} className="text-accent" />
          </div>
          <h1 className="text-3xl font-bold text-text mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Your cart is empty
          </h1>
          <p className="text-text-muted mb-8">Add some products before checking out</p>
          <Link
            href="/products"
            className="inline-block px-8 py-4 bg-accent text-bg-dark text-sm font-bold tracking-wider uppercase hover:bg-accent-light transition-all rounded-xl"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Back */}
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-accent transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Continue Shopping
        </Link>

        <div className="flex items-center justify-between mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-text" style={{ fontFamily: "var(--font-display)" }}>
            Shopping Cart
          </h1>
          <span className="text-sm text-text-muted">{totalItems()} {totalItems() === 1 ? "item" : "items"}</span>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <motion.div
                key={item.slug}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-4 p-4 bg-premium-dark rounded-2xl border border-accent/10"
              >
                <div className="relative w-20 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-bg-hover">
                  <ProductImage src={item.image} alt={item.name} sizes="80px" className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-text truncate">{item.name}</h3>
                  <p className="font-mono text-sm text-accent mt-1">₹{item.price}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="p-1.5 rounded-lg bg-bg-hover text-text-muted hover:text-text disabled:opacity-40 transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="font-mono text-sm text-text w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                      className="p-1.5 rounded-lg bg-bg-hover text-text-muted hover:text-text transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <span className="font-mono text-sm text-text whitespace-nowrap">
                    ₹{item.price * item.quantity}
                  </span>
                  <button
                    onClick={() => removeItem(item.slug)}
                    className="p-1.5 rounded-lg text-red-400/60 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="p-6 bg-premium-dark rounded-3xl border border-accent/10 sticky top-28">
              <h2 className="text-xl font-bold text-text mb-6" style={{ fontFamily: "var(--font-display)" }}>
                Order Summary
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Subtotal</span>
                  <span className="text-text font-mono">₹{totalPrice()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Shipping</span>
                  <span className="text-accent text-xs">Calculated at checkout</span>
                </div>
                <div className="h-px bg-accent/20 my-3" />
                <div className="flex justify-between font-bold">
                  <span className="text-text">Total</span>
                  <span className="text-2xl text-text font-mono" style={{ fontFamily: "var(--font-display)" }}>
                    ₹{totalPrice()}
                  </span>
                </div>
              </div>
              <Link
                href="/checkout"
                className="mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-accent text-bg-dark text-sm font-bold tracking-wider uppercase hover:bg-accent-light transition-all rounded-xl"
              >
                Proceed to Checkout
                <ChevronRight size={16} />
              </Link>
              <Link
                href="/products"
                className="mt-3 w-full inline-flex items-center justify-center gap-2 px-6 py-3 border border-accent/30 text-text text-sm font-medium hover:bg-accent/5 transition-all rounded-xl"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
