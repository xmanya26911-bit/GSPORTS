"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Minus,
  Plus,
  Truck,
  Shield,
  RotateCcw,
  Check,
  ChevronRight,
  Phone,
  ListChecks,
  Settings2,
  HelpCircle,
  ChevronDown as ChevronDownIcon,
} from "lucide-react";
import Link from "next/link";
import { useCart } from "@/store/cart";
import { ProductImage } from "@/components/ProductImage";
import { formatProductPrice } from "@/lib/utils";
import type { Product } from "@/types";

const FALLBACK_FEATURES = [
  "Handcrafted from premium grade willow",
  "Professional grade with optimal balance",
  "Factory-direct pricing — no middlemen",
  "Made in Kashmir, India",
];

export function ProductDetailClient({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const addItem = useCart((s) => s.addItem);

  const imageList = product.images?.length > 0 ? product.images : ["/images/cricket.jpg"];
  const hasPrice = typeof product.price === "number";
  const isOnSale =
    typeof product.price === "number" &&
    product.compareAtPrice !== undefined &&
    product.compareAtPrice > product.price;
  const features = product.features?.length > 0 ? product.features : FALLBACK_FEATURES;
  const specs = product.specifications || [];
  const highlights = product.highlights || [];
  const faqs = product.faqs || [];
  const isSoldOut =
    product.inventory?.status === "sold_out" || product.inventory?.status === "out_of_stock";

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      image: imageList[0],
      price: typeof product.price === "number" ? product.price : 0,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 3000);
  };

  const handleBuyNow = () => {
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      image: imageList[0],
      price: typeof product.price === "number" ? product.price : 0,
    });
    window.location.href = "/checkout";
  };

  return (
    <>
      {/* Main Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        {/* Left: Image Gallery */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-24">
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="relative aspect-square rounded-2xl overflow-hidden bg-bg-alt border border-border"
            >
              <ProductImage
                src={imageList[selectedImage]}
                alt={product.name}
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover"
                priority
              />
              {product.brand && (
                <div className="absolute top-4 left-4 glass rounded-lg px-3 py-1.5 text-xs font-medium text-text">
                  {product.brand}
                </div>
              )}
            </motion.div>

            {imageList.length > 1 && (
              <div className="flex gap-3 mt-4 overflow-x-auto pb-2" role="tablist" aria-label="Product images">
                {imageList.map((img, i) => (
                  <button
                    key={i}
                    role="tab"
                    aria-selected={selectedImage === i}
                    aria-label={`View image ${i + 1} of ${imageList.length}`}
                    onClick={() => setSelectedImage(i)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      selectedImage === i ? "border-accent ring-2 ring-accent/20" : "border-border hover:border-border-light"
                    }`}
                  >
                    <ProductImage src={img} alt="" sizes="80px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Center: Product Info */}
        <div className="lg:col-span-4 space-y-5">
          <div className="text-xs font-medium text-accent uppercase tracking-wider">{product.brand}</div>

          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-text leading-tight" style={{ fontFamily: "var(--font-display)" }}>
            {product.name}
          </h1>

          <div className="h-px bg-border" />

          {highlights.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {highlights.map((h, i) => (
                <span key={i} className="text-[11px] text-accent bg-accent/10 px-3 py-1.5 rounded-full font-medium">
                  {h}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-baseline gap-3">
            <span className="text-3xl md:text-4xl font-bold text-accent">
              {formatProductPrice(product.price)}
            </span>
            {hasPrice && isOnSale && (
              <span className="text-sm text-text-muted line-through">
                ₹{product.compareAtPrice?.toLocaleString("en-IN")}
              </span>
            )}
          </div>
          {hasPrice && (
            <p className="text-xs text-success flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5" /> Inclusive of all taxes
            </p>
          )}

          <div className="h-px bg-border" />

          <div>
            <h2 className="text-sm font-semibold text-text mb-3 uppercase tracking-wider">Description</h2>
            <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-line">{product.description}</p>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <ListChecks className="w-4 h-4 text-accent" />
              <h2 className="text-sm font-semibold text-text uppercase tracking-wider">Key Features</h2>
            </div>
            <ul className="space-y-2.5">
              {features.map((feat, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-text-secondary">
                  <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  {feat}
                </li>
              ))}
            </ul>
          </div>

          {specs.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Settings2 className="w-4 h-4 text-accent" />
                <h2 className="text-sm font-semibold text-text uppercase tracking-wider">Specifications</h2>
              </div>
              <div className="rounded-xl border border-border overflow-hidden">
                {specs.map((spec, i) => (
                  <div key={i} className={`flex items-center justify-between px-4 py-3 text-xs ${i % 2 === 0 ? "bg-bg-alt/30" : ""}`}>
                    <span className="text-text-muted font-medium">{spec.label}</span>
                    <span className="text-text font-medium text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Buy Box (desktop) */}
        <div className="lg:col-span-3 hidden lg:block">
          <div className="lg:sticky lg:top-24">
            <div className="glass rounded-2xl border border-border p-6 space-y-5">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-accent">
                    {formatProductPrice(product.price)}
                  </span>
                </div>
                <p className="text-xs text-text-muted mt-1">
                  {hasPrice ? "Free shipping on orders above ₹2,000" : "Contact store for pricing"}
                </p>
              </div>

              <div className="space-y-3 pt-3 border-t border-border">
                <div className="flex items-center gap-3 text-xs text-text-secondary">
                  <Truck className="w-4 h-4 text-accent shrink-0" />
                  <div>
                    <div className="font-medium text-text">Free Delivery</div>
                    <div className="text-text-muted">Across India · 3-5 business days</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs text-text-secondary">
                  <Shield className="w-4 h-4 text-accent shrink-0" />
                  <div>
                    <div className="font-medium text-text">Warranty</div>
                    <div className="text-text-muted">6-month manufacturer warranty</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs text-text-secondary">
                  <RotateCcw className="w-4 h-4 text-accent shrink-0" />
                  <div>
                    <div className="font-medium text-text">7-Day Returns</div>
                    <div className="text-text-muted">Easy replacement policy</div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-border">
                <label htmlFor="quantity" className="block text-xs font-medium text-text-secondary mb-2">
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-text hover:border-accent/30 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span id="quantity" className="text-sm font-semibold text-text w-8 text-center" aria-live="polite">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-text hover:border-accent/30 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="pt-3 border-t border-border">
                {isSoldOut ? (
                  <p className="text-xs text-danger font-medium flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-danger" />
                    Currently out of stock
                  </p>
                ) : (
                  <p className="text-xs text-success font-medium flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                    In Stock — Ready to ship
                  </p>
                )}
              </div>

              <div className="space-y-3 pt-3 border-t border-border">
                <button
                  onClick={handleAddToCart}
                  disabled={isSoldOut}
                  className={`w-full py-3.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                    added ? "bg-success text-white" : "bg-accent/10 text-accent hover:bg-accent/20 border border-accent/20"
                  }`}
                >
                  {added ? <><Check className="w-4 h-4" /> Added to Cart!</> : <><ShoppingCart className="w-4 h-4" /> Add to Cart</>}
                </button>
                <button
                  onClick={handleBuyNow}
                  disabled={isSoldOut}
                  className="w-full py-3.5 rounded-xl text-sm font-bold bg-accent text-bg-dark hover:bg-accent-light transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Buy Now <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="pt-3 border-t border-border text-xs space-y-1.5">
                <div className="flex justify-between"><span className="text-text-muted">Seller</span><span className="text-text font-medium">Golden Willowe</span></div>
                <div className="flex justify-between"><span className="text-text-muted">Location</span><span className="text-text font-medium">Srinagar, Kashmir</span></div>
                <div className="flex justify-between"><span className="text-text-muted">Category</span><span className="text-text font-medium">{product.category}</span></div>
              </div>

              <a href="tel:917889342459" className="flex items-center justify-center gap-2 pt-3 border-t border-border text-xs text-text-muted hover:text-accent transition-colors">
                <Phone className="w-3.5 h-3.5" /> Have questions? Call 7889342459
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Buy Bar (mobile) */}
      <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden safe-bottom border-t border-border bg-white/95 backdrop-blur-xl shadow-[0_-4px_24px_rgba(0,0,0,0.08)]">
        <div className="flex items-center gap-2.5 px-4 py-3">
          <div className="flex-1 min-w-0 pr-1">
            <p className="text-[10px] uppercase tracking-wider text-text-muted">Price</p>
            <p className="text-lg font-bold text-accent truncate leading-tight">
              {formatProductPrice(product.price)}
            </p>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={isSoldOut}
            className={`h-12 px-4 rounded-xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed ${
              added ? "bg-success text-white" : "bg-accent/10 text-accent border border-accent/20"
            }`}
          >
            {added ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
            {added ? "Added" : "Add to Cart"}
          </button>
          <button
            onClick={handleBuyNow}
            disabled={isSoldOut}
            className="h-12 px-5 rounded-xl text-sm font-bold bg-accent text-bg-dark flex items-center justify-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Buy Now
          </button>
        </div>
      </div>

      {/* FAQs Section */}
      {faqs.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 pt-12 border-t border-border"
        >
          <div className="flex items-center gap-2 mb-6">
            <HelpCircle className="w-5 h-5 text-accent" />
            <h2 className="text-xl font-bold text-text" style={{ fontFamily: "var(--font-display)" }}>Frequently Asked Questions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group glass rounded-2xl border border-border p-5">
                <summary className="text-sm font-medium text-text cursor-pointer flex items-center justify-between gap-4">
                  {faq.question}
                  <ChevronDownIcon className="w-4 h-4 text-text-tertiary shrink-0 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="text-sm text-text-secondary mt-3 leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </motion.div>
      )}

      {/* Related */}
      <div className="mt-16 pt-12 border-t border-border">
        <h2 className="text-xl font-bold text-text mb-6" style={{ fontFamily: "var(--font-display)" }}>You May Also Like</h2>
        <Link href="/products" className="text-accent hover:text-accent-light transition-colors text-sm">Browse all products →</Link>
      </div>
    </>
  );
}