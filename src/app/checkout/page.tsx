"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Check,
  MessageCircle,
  ShoppingBag,
  Shield,
} from "lucide-react";
import { useCart } from "@/store/cart";
import { useCustomer } from "@/store/customer";
import DynamicUPICheckout from "@/components/DynamicUPICheckout";
import { ProductImage } from "@/components/ProductImage";
import { MERCHANT } from "@/lib/upi";
import type { OrderItem } from "@/types";

const WHATSAPP_NUMBER = MERCHANT.whatsapp;

export default function CheckoutPage() {
  const { items, totalPrice, totalItems, clearCart } = useCart();
  const customer = useCustomer((s) => s.customer);
  const [orderId, setOrderId] = useState("");
  const [step, setStep] = useState<"checkout" | "success">("checkout");

  const handlePaid = () => {
    if (!orderId) return;
    const orderItems: OrderItem[] = items.map((i) => ({
      name: i.name,
      slug: i.slug,
      price: i.price,
      quantity: i.quantity,
    }));
    const address = customer?.addresses.find((a) => a.isDefault) ?? customer?.addresses[0];
    void fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: orderId,
        customerPhone: customer?.phone,
        items: orderItems,
        total: totalPrice(),
        address,
      }),
    }).catch(() => {});
    const itemsList = items
      .map((i) => `• ${i.name} × ${i.quantity} = ${i.price}`)
      .join("%0A");
    const text = `Hello Golden Willowe!%0A%0AI've placed an order.%0AOrder ID: ${orderId}%0A%0AItems:%0A${itemsList}%0A%0ATotal: ₹${totalPrice()}%0A%0AI've paid via UPI to ${MERCHANT.upiId}. Please confirm my order.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank");
    setStep("success");
    clearCart();
  };

  // When DynamicUPICheckout generates the orderId, we capture it
  const handleOrderGenerated = (id: string) => {
    setOrderId(id);
  };

  if (items.length === 0 && step === "checkout") {
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

  if (step === "success") {
    return (
      <div className="pt-28 min-h-[80vh] flex items-center">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="w-24 h-24 rounded-full bg-accent flex items-center justify-center mx-auto mb-8"
          >
            <Check size={48} className="text-bg-dark" />
          </motion.div>
          <h1 className="text-4xl lg:text-5xl font-bold text-text mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Order Placed!
          </h1>
          <p className="text-text-muted text-lg mb-8">
            We&apos;ve opened WhatsApp for you to confirm your payment. Once we verify your UTR, your order will be processed.
          </p>
          <div className="p-6 bg-premium-dark rounded-3xl border border-accent/10 mb-8">
            <p className="text-xs tracking-[0.3em] uppercase text-accent mb-1">Your Order ID</p>
            <p className="font-mono text-2xl text-accent">{orderId}</p>
            <p className="mt-3 text-sm text-text-muted">Save this for your records</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-bg-dark text-sm font-bold tracking-wider uppercase hover:bg-accent-light transition-all rounded-xl"
            >
              <MessageCircle size={18} />
              Open WhatsApp Again
            </a>
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-8 py-4 border border-accent/30 text-text text-sm font-bold tracking-wider uppercase hover:bg-accent hover:text-bg-dark transition-all rounded-xl"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Back */}
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-accent transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Continue Shopping
        </Link>

        <h1 className="text-4xl lg:text-5xl font-bold text-text mb-12" style={{ fontFamily: "var(--font-display)" }}>
          Checkout
        </h1>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left Column — Order Summary + Shipping */}
          <div className="lg:col-span-3 space-y-8">
            {/* Order Summary */}
            <div>
              <h2 className="text-2xl font-bold text-text mb-6" style={{ fontFamily: "var(--font-display)" }}>
                Order Summary
              </h2>
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.slug}
                    className="flex gap-4 p-4 bg-premium-dark rounded-2xl border border-accent/10"
                  >
                    <div className="relative w-16 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-bg-hover">
                      <ProductImage src={item.image} alt={item.name} sizes="64px" className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-text">{item.name}</h3>
                      <p className="text-xs text-text-muted mt-0.5">× {item.quantity}</p>
                      <p className="font-mono text-sm text-accent mt-1">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-6 bg-premium-dark rounded-3xl border border-accent/10">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-text-muted">Subtotal ({totalItems()} items)</span>
                  <span className="font-mono text-text">₹{totalPrice()}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-text-muted">Shipping</span>
                  <span className="text-sm text-accent">Calculated after confirmation</span>
                </div>
                <div className="h-px bg-accent/20 my-4" />
                <div className="flex justify-between items-center">
                  <span className="text-sm tracking-wider uppercase text-text">Total</span>
                  <span className="text-2xl font-bold text-text" style={{ fontFamily: "var(--font-display)" }}>
                    ₹{totalPrice()}
                  </span>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div>
              <h2 className="text-2xl font-bold text-text mb-6" style={{ fontFamily: "var(--font-display)" }}>
                Shipping Address
              </h2>
              <div className="p-6 bg-premium-dark rounded-3xl border border-accent/10">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs tracking-wider uppercase text-text-muted mb-2">Full Name</label>
                    <input type="text" placeholder="Enter your full name" className="w-full px-4 py-3 bg-bg-hover border border-accent/10 rounded-xl text-text text-sm focus:outline-none focus:border-accent transition-colors" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs tracking-wider uppercase text-text-muted mb-2">Phone Number</label>
                    <input type="tel" placeholder="Enter your phone number" className="w-full px-4 py-3 bg-bg-hover border border-accent/10 rounded-xl text-text text-sm focus:outline-none focus:border-accent transition-colors" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs tracking-wider uppercase text-text-muted mb-2">Address</label>
                    <input type="text" placeholder="House/Flat No., Street, Area" className="w-full px-4 py-3 bg-bg-hover border border-accent/10 rounded-xl text-text text-sm focus:outline-none focus:border-accent transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs tracking-wider uppercase text-text-muted mb-2">City</label>
                    <input type="text" placeholder="City" className="w-full px-4 py-3 bg-bg-hover border border-accent/10 rounded-xl text-text text-sm focus:outline-none focus:border-accent transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs tracking-wider uppercase text-text-muted mb-2">State</label>
                    <input type="text" placeholder="State" className="w-full px-4 py-3 bg-bg-hover border border-accent/10 rounded-xl text-text text-sm focus:outline-none focus:border-accent transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs tracking-wider uppercase text-text-muted mb-2">Pincode</label>
                    <input type="text" placeholder="Pincode" className="w-full px-4 py-3 bg-bg-hover border border-accent/10 rounded-xl text-text text-sm focus:outline-none focus:border-accent transition-colors" />
                  </div>
                  <div className="flex items-end">
                    <div className="flex items-center gap-2 px-4 py-3 bg-premium-dark rounded-xl border border-accent/10 w-full">
                      <input type="checkbox" id="saveAddress" defaultChecked className="rounded border-accent/30 text-accent focus:ring-accent" />
                      <label htmlFor="saveAddress" className="text-xs text-text-muted">Save for future</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column — Payment */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-text mb-6" style={{ fontFamily: "var(--font-display)" }}>
              Payment
            </h2>

            <DynamicUPICheckout
              amount={totalPrice()}
              showDetails={true}
              onOrderGenerated={handleOrderGenerated}
            />

            {/* Confirm Button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePaid}
              disabled={!orderId}
              className="w-full mt-4 inline-flex items-center justify-center gap-3 px-6 py-4 bg-accent text-bg-dark text-sm font-bold tracking-wider uppercase hover:bg-accent-light transition-all rounded-xl disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <MessageCircle size={18} />
              I&apos;ve Paid — Confirm on WhatsApp
            </motion.button>

            {/* Trust */}
            <div className="mt-4 flex items-center gap-3 p-4 bg-premium-dark rounded-2xl border border-accent/10">
              <Shield size={18} className="text-accent flex-shrink-0" />
              <p className="text-xs text-text-muted">
                Secure UPI payment · Instant confirmation via WhatsApp
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
