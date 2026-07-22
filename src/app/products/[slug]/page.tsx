"use client";

import { use, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Minus, Plus, Star, Truck, Shield, RotateCcw, Check, ChevronRight, Phone, Package, ListChecks, Settings2, HelpCircle, ChevronDown as ChevronDownIcon } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/store/cart";

interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  images: string[];
  price: string;
  slug: string;
  createdAt: string;
  features?: string[];
  specifications?: { label: string; value: string }[];
  highlights?: string[];
  faqs?: { question: string; answer: string }[];
}

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const addItem = useCart((s) => s.addItem);

  useEffect(() => {
    fetch(`/api/products/by-slug/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("not found");
        return res.json();
      })
      .then((data) => {
        setProduct(data.product);
        setLoading(false);
      })
      .catch(() => {
        setNotFound(true);
        setLoading(false);
      });
  }, [slug]);

  const handleAddToCart = () => {
    if (!product) return;
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images?.[0] || "/images/cricket.jpg",
      price: product.price,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 3000);
  };

  const handleBuyNow = () => {
    if (!product) return;
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images?.[0] || "/images/cricket.jpg",
      price: product.price,
    });
    window.location.href = "/checkout";
  };

  if (loading) {
    return (
      <div className="pt-28 min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl bg-bg-alt animate-pulse" />
            <div className="flex gap-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-20 h-20 rounded-xl bg-bg-alt animate-pulse" />
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <div className="h-8 bg-bg-alt rounded animate-pulse w-3/4" />
            <div className="h-4 bg-bg-alt rounded animate-pulse w-1/4" />
            <div className="h-6 bg-bg-alt rounded animate-pulse w-1/3" />
            <div className="h-32 bg-bg-alt rounded animate-pulse" />
            <div className="h-12 bg-bg-alt rounded animate-pulse w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="pt-28 min-h-screen flex items-center justify-center max-w-7xl mx-auto px-4">
        <div className="text-center">
          <div className="w-20 h-20 rounded-2xl bg-bg-hover flex items-center justify-center mx-auto mb-6">
            <Package className="w-10 h-10 text-text-muted/30" />
          </div>
          <h1 className="text-2xl font-bold text-text mb-3" style={{ fontFamily: "var(--font-playfair)" }}>
            Product Not Found
          </h1>
          <p className="text-sm text-text-muted mb-8 max-w-md mx-auto">
            The product you're looking for may have been removed or is no longer available.
          </p>
          <Link href="/products" className="inline-flex items-center gap-2 bg-accent text-bg-dark px-6 py-3 rounded-xl text-sm font-semibold hover:bg-accent-light transition-all">
            Back to Products <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  if (!product) return null;

  const imageList = product.images?.length > 0 ? product.images : ["/images/cricket.jpg"];
  const hasPrice = product.price && product.price !== "Visit store for pricing";
  const features = (product.features && product.features.length > 0) ? product.features : [
    "Handcrafted from premium grade willow",
    "Professional grade with optimal balance",
    "Factory-direct pricing — no middlemen",
    "Made in Kashmir, India",
  ];
  const specs = product.specifications || [];
  const highlights = product.highlights || [];
  const faqs = product.faqs || [];

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-text-muted/50 mb-6">
          <Link href="/" className="hover:text-accent transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/products" className="hover:text-accent transition-colors">Products</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-text-secondary truncate">{product.name}</span>
        </nav>

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
                <img src={imageList[selectedImage]} alt={product.name} className="w-full h-full object-cover" />
                {product.brand && (
                  <div className="absolute top-4 left-4 glass rounded-lg px-3 py-1.5 text-xs font-medium text-text">
                    {product.brand}
                  </div>
                )}
              </motion.div>

              {imageList.length > 1 && (
                <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                  {imageList.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                        selectedImage === i ? "border-accent ring-2 ring-accent/20" : "border-border hover:border-border-light"
                      }`}
                    >
                      <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Center: Product Info */}
          <div className="lg:col-span-4 space-y-5">
            {/* Brand */}
            <div className="text-xs font-medium text-accent uppercase tracking-wider">{product.brand}</div>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-text leading-tight" style={{ fontFamily: "var(--font-playfair)" }}>
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < 4 ? "text-accent fill-accent" : "text-text-muted/20"}`} />
                ))}
              </div>
              <span className="text-xs text-text-muted">4.0 · 124 reviews</span>
            </div>

            <div className="h-px bg-border" />

            {/* Highlights (AI-generated) */}
            {highlights.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {highlights.map((h, i) => (
                  <span key={i} className="text-[11px] text-accent bg-accent/10 px-3 py-1.5 rounded-full font-medium">
                    ⭐ {h}
                  </span>
                ))}
              </div>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl md:text-4xl font-bold text-accent">
                {hasPrice ? `₹${product.price}` : product.price}
              </span>
              {hasPrice && (
                <span className="text-sm text-text-muted line-through">
                  ₹{Math.round(parseInt(product.price.replace(/[^0-9]/g, "")) * 1.15).toLocaleString("en-IN")}
                </span>
              )}
            </div>
            {hasPrice && (
              <p className="text-xs text-success flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" /> Inclusive of all taxes
              </p>
            )}

            <div className="h-px bg-border" />

            {/* Description */}
            <div>
              <h2 className="text-sm font-semibold text-text mb-3 uppercase tracking-wider">Description</h2>
              <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-line">{product.description}</p>
            </div>

            {/* Features (AI-generated) */}
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

            {/* Specifications (AI-generated) */}
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

          {/* Right: Buy Box */}
          <div className="lg:col-span-3">
            <div className="lg:sticky lg:top-24">
              <div className="glass rounded-2xl border border-border p-6 space-y-5">
                {/* Price */}
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-accent">
                      {hasPrice ? `₹${product.price}` : product.price}
                    </span>
                  </div>
                  <p className="text-xs text-text-muted mt-1">
                    {hasPrice ? "Free shipping on orders above ₹2,000" : "Contact store for pricing"}
                  </p>
                </div>

                {/* Delivery / Warranty / Returns */}
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

                {/* Quantity */}
                <div className="pt-3 border-t border-border">
                  <label className="block text-xs font-medium text-text-secondary mb-2">Quantity</label>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-text hover:border-accent/30 transition-colors">
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-sm font-semibold text-text w-8 text-center">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-text hover:border-accent/30 transition-colors">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Stock */}
                <div className="pt-3 border-t border-border">
                  <p className="text-xs text-success font-medium flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                    In Stock — Ready to ship
                  </p>
                </div>

                {/* Buy Buttons */}
                <div className="space-y-3 pt-3 border-t border-border">
                  <button
                    onClick={handleAddToCart}
                    className={`w-full py-3.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                      added ? "bg-success text-white" : "bg-accent/10 text-accent hover:bg-accent/20 border border-accent/20"
                    }`}
                  >
                    {added ? <><Check className="w-4 h-4" /> Added to Cart!</> : <><ShoppingCart className="w-4 h-4" /> Add to Cart</>}
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="w-full py-3.5 rounded-xl text-sm font-bold bg-accent text-bg-dark hover:bg-accent-light transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Buy Now <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Seller Info */}
                <div className="pt-3 border-t border-border text-xs space-y-1.5">
                  <div className="flex justify-between"><span className="text-text-muted">Seller</span><span className="text-text font-medium">Golden Willowe</span></div>
                  <div className="flex justify-between"><span className="text-text-muted">Location</span><span className="text-text font-medium">Srinagar, Kashmir</span></div>
                  <div className="flex justify-between"><span className="text-text-muted">Category</span><span className="text-text font-medium">Cricket</span></div>
                </div>

                <a href="tel:917889342459" className="flex items-center justify-center gap-2 pt-3 border-t border-border text-xs text-text-muted hover:text-accent transition-colors">
                  <Phone className="w-3.5 h-3.5" /> Have questions? Call 7889342459
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs Section (AI-generated) */}
        {faqs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 pt-12 border-t border-border"
          >
            <div className="flex items-center gap-2 mb-6">
              <HelpCircle className="w-5 h-5 text-accent" />
              <h2 className="text-xl font-bold text-text" style={{ fontFamily: "var(--font-playfair)" }}>Frequently Asked Questions</h2>
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
          <h2 className="text-xl font-bold text-text mb-6" style={{ fontFamily: "var(--font-playfair)" }}>You May Also Like</h2>
          <Link href="/products" className="text-accent hover:text-accent-light transition-colors text-sm">Browse all products →</Link>
        </div>
      </div>
    </div>
  );
}
