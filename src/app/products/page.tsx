
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Search, Package } from "lucide-react";
import { useState, useEffect } from "react";

const categoryImages: Record<string, string> = {
  Cricket: "cricket.jpg", Football: "football.jpg", Badminton: "badminton.jpg",
  Activewear: "activewear.jpg", Shoes: "shoes.jpg", Accessories: "accessories.jpg",
};

const categories = ["All", "Cricket", "Football", "Badminton", "Activewear", "Shoes", "Accessories"];

interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  price: string;
  images: string[];
  slug: string;
  createdAt: string;
}

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products || []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = products.filter(
    (p) =>
      (activeCategory === "All" || p.category === activeCategory) &&
      (searchQuery === "" || p.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="pt-28">
      {/* Header */}
      <section className="relative py-20 overflow-hidden bg-premium-dark">
        <div className="absolute inset-0"><img src="/images/hero-bg.jpg" alt="" className="w-full h-full object-cover opacity-20" /><div className="absolute inset-0 bg-gradient-to-r from-bg-dark via-bg-dark/90 to-bg-dark" /></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="section-label justify-center mb-5" />
            <h1 className="text-4xl md:text-6xl font-black text-text mb-4" style={{ fontFamily: "var(--font-playfair)" }}>Our Collection</h1>
            <p className="text-text-muted text-sm max-w-xl mx-auto">Premium sports gear for every athlete.</p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        {/* Search & Filters */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-5 mb-10">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input type="text" placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent pl-11 pr-4 py-3 rounded-xl border border-border focus:border-accent/30 focus:ring-1 focus:ring-accent/20 outline-none transition-all text-sm text-text placeholder-text-muted/30" />
            </div>
            <div className="flex flex-wrap gap-2 shrink-0">
              {categories.map((cat) => (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-xs font-medium tracking-wide transition-all ${activeCategory === cat ? "bg-accent text-bg-dark" : "glass text-text-muted hover:text-text"}`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="glass-card rounded-xl overflow-hidden">
                <div className="h-40 skeleton" />
                <div className="p-4 space-y-2">
                  <div className="h-4 skeleton w-3/4" />
                  <div className="h-3 skeleton w-1/2" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Products Grid */}
        {!loading && filtered.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((product, index) => (
              <motion.div key={product.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.02 }}
                className="glass-card rounded-xl overflow-hidden group">
                <div className="h-40 overflow-hidden">
                  <img src={product.images?.[0] ? product.images[0] : `/images/${categoryImages[product.category] || "hero-bg.jpg"}`} alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-text text-sm mb-1">{product.name}</h3>
                  <p className="text-text-muted text-xs mb-1">{product.brand}</p>
                  <p className="text-text-muted/50 text-[11px] line-clamp-2 mb-3">{product.description}</p>
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <span className="text-accent font-semibold text-sm">{product.price}</span>
                    <span className="text-text-muted/40 text-[11px] uppercase tracking-wider">{product.category}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-bg-hover flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-text-muted/30" />
            </div>
            <p className="text-sm text-text-muted/50 mb-1">No products yet</p>
            <p className="text-xs text-text-muted/30">Products will appear here once added through the admin panel</p>
          </div>
        )}

        {/* CTA */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center mt-12 glass rounded-2xl p-8 md:p-12">
          <h3 className="text-xl font-bold text-text mb-3" style={{ fontFamily: "var(--font-playfair)" }}>Didn&apos;t Find What You&apos;re Looking For?</h3>
          <p className="text-text-muted text-sm mb-6">We stock much more than listed. Visit our store or call us!</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className="bg-accent text-bg-dark px-6 py-3 rounded-xl text-sm font-semibold hover:bg-accent-light transition-all">Visit Store →</Link>
            <a href="tel:07405208523" className="glass px-6 py-3 rounded-xl text-sm font-medium text-text-muted hover:text-accent transition-all">Call 074052 08523</a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
