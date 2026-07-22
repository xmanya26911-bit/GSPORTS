"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Check,
  Copy,
  Smartphone,
  MessageCircle,
  ShoppingBag,
} from "lucide-react";
import { useCart } from "@/store/cart";

const UPI_ID = "7889342459@paytm";
const WHATSAPP_NUMBER = "917889342459";

export default function CheckoutPage() {
  const { items, totalPrice, totalItems, clearCart } = useCart();
  const [orderId] = useState(() => `GW${Date.now().toString().slice(-8)}`);
  const [copied, setCopied] = useState(false);
  const [step, setStep] = useState<"checkout" | "success">("checkout");

  const copyUpiId = () => {
    navigator.clipboard.writeText(UPI_ID);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOrderPlaced = () => {
    const itemsList = items
      .map((i) => `• ${i.name} × ${i.quantity} = ${i.price}`)
      .join("%0A");
    const text = `Hello Golden Willowe!%0A%0AI've placed an order.%0AOrder ID: ${orderId}%0A%0AItems:%0A${itemsList}%0A%0ATotal: ₹${totalPrice()}%0A%0AI've paid via UPI to ${UPI_ID}. Please confirm my order.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank");
    setStep("success");
    clearCart();
  };

  if (items.length === 0 && step === "checkout") {
    return (
      <div className="pt-28 min-h-[60vh] flex items-center">
        <div className="max-w-md mx-auto px-6 text-center">
          <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={32} className="text-accent" />
          </div>
          <h1 className="text-3xl font-bold text-text mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
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
          <h1 className="text-4xl lg:text-5xl font-bold text-text mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
            Order Placed!
          </h1>
          <p className="text-text-muted text-lg mb-8">
            We've opened WhatsApp for you to confirm your payment. Once we verify your UTR, your order will be processed.
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
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        {/* Back */}
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-accent transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Continue Shopping
        </Link>

        <h1 className="text-4xl lg:text-5xl font-bold text-text mb-12" style={{ fontFamily: "var(--font-playfair)" }}>
          Checkout
        </h1>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Order summary */}
          <div>
            <h2 className="text-2xl font-bold text-text mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
              Order Summary
            </h2>
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.slug}
                  className="flex gap-4 p-4 bg-premium-dark rounded-2xl border border-accent/10"
                >
                  <div className="relative w-16 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-bg-hover">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-text">{item.name}</h3>
                    <p className="text-xs text-text-muted mt-0.5">× {item.quantity}</p>
                    <p className="font-mono text-sm text-accent mt-1">
                      ₹{parseInt(item.price.replace(/[^0-9]/g, "")) * item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-6 bg-premium-dark rounded-3xl border border-accent/10">
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
                <span className="text-2xl font-bold text-text" style={{ fontFamily: "var(--font-playfair)" }}>
                  ₹{totalPrice()}
                </span>
              </div>
            </div>

            <div className="mt-4 p-4 bg-premium-dark rounded-2xl border border-accent/10">
              <p className="text-xs tracking-[0.2em] uppercase text-accent mb-1">Order ID</p>
              <p className="font-mono text-lg text-text">{orderId}</p>
            </div>
          </div>

          {/* Payment */}
          <div>
            <h2 className="text-2xl font-bold text-text mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
              Payment
            </h2>

            <div className="p-8 bg-premium-dark rounded-3xl border border-accent/10">
              <p className="text-xs tracking-[0.3em] uppercase text-accent mb-4">
                Step 1 — Scan & Pay
              </p>
              <p className="text-sm text-text-muted mb-6">
                Scan the QR code below with any UPI app (GPay, PhonePe, Paytm) and pay{" "}
                <span className="font-bold text-text">₹{totalPrice()}</span>.
              </p>

              {/* QR */}
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-white rounded-2xl shadow-sm">
                  <img
                    src="/images/payment-qr.jpg"
                    alt="UPI QR Code"
                    className="w-56 h-56 object-contain"
                  />
                </div>
              </div>

              {/* UPI ID */}
              <div className="flex items-center justify-between p-4 bg-bg-hover rounded-2xl mb-6">
                <div>
                  <p className="text-xs tracking-wider uppercase text-text-muted">UPI ID</p>
                  <p className="font-mono text-text">{UPI_ID}</p>
                </div>
                <button
                  onClick={copyUpiId}
                  className="p-3 rounded-full bg-accent text-bg-dark hover:bg-accent-light transition-colors"
                  aria-label="Copy UPI ID"
                >
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                </button>
              </div>

              <p className="text-xs tracking-[0.3em] uppercase text-accent mb-3">
                Step 2 — Confirm Order
              </p>
              <p className="text-sm text-text-muted mb-6">
                After payment, click below to send your order details and UTR to us on WhatsApp. We'll confirm within a few hours.
              </p>

              <button
                onClick={handleOrderPlaced}
                className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-accent text-bg-dark text-sm font-bold tracking-wider uppercase hover:bg-accent-light transition-all rounded-xl"
              >
                <MessageCircle size={18} />
                I've Paid — Confirm on WhatsApp
              </button>
            </div>

            {/* Trust */}
            <div className="mt-6 flex items-center gap-3 p-4 bg-premium-dark rounded-2xl border border-accent/10">
              <Smartphone size={20} className="text-accent flex-shrink-0" />
              <p className="text-xs text-text-muted">
                Secure UPI payment · No card required · Instant confirmation via WhatsApp
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
