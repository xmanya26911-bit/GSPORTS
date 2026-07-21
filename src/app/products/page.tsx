
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Search } from "lucide-react";
import { useState } from "react";

const categoryImages: Record<string, string> = {
  Cricket: "cricket.jpg", Football: "football.jpg", Badminton: "badminton.jpg",
  Activewear: "activewear.jpg", Shoes: "shoes.jpg", Accessories: "accessories.jpg",
};

const products = [
  { name: "Cricket Bat (English Willow)", category: "Cricket", price: "₹2,500 – ₹15,000", desc: "Premium quality" },
  { name: "Cricket Ball (Leather)", category: "Cricket", price: "₹350 – ₹1,200", desc: "Match-ready" },
  { name: "Batting Pads", category: "Cricket", price: "₹1,200 – ₹4,500", desc: "Lightweight" },
  { name: "Cricket Gloves", category: "Cricket", price: "₹800 – ₹3,000", desc: "Comfort grip" },
  { name: "Helmet", category: "Cricket", price: "₹1,500 – ₹5,000", desc: "ISI certified" },
  { name: "Cricket Kit Bag", category: "Cricket", price: "₹2,000 – ₹6,000", desc: "Durable" },
  { name: "Football", category: "Football", price: "₹500 – ₹3,000", desc: "Match-quality" },
  { name: "Football Shoes", category: "Football", price: "₹1,500 – ₹6,000", desc: "Studded & turf" },
  { name: "Goalkeeper Gloves", category: "Football", price: "₹600 – ₹2,500", desc: "Premium grip" },
  { name: "Shin Guards", category: "Football", price: "₹300 – ₹1,200", desc: "Lightweight" },
  { name: "Football Jersey", category: "Football", price: "₹500 – ₹2,000", desc: "Club jerseys" },
  { name: "Badminton Racket", category: "Badminton", price: "₹800 – ₹5,000", desc: "Carbon-fibre" },
  { name: "Shuttlecocks (Pack)", category: "Badminton", price: "₹150 – ₹800", desc: "Feather & nylon" },
  { name: "Badminton Net", category: "Badminton", price: "₹1,000 – ₹3,000", desc: "Portable" },
  { name: "Court Shoes", category: "Badminton", price: "₹1,200 – ₹4,000", desc: "Non-marking" },
  { name: "Gym T-Shirts", category: "Activewear", price: "₹299 – ₹999", desc: "Quick-dry" },
  { name: "Shorts", category: "Activewear", price: "₹399 – ₹1,200", desc: "Training" },
  { name: "Tracksuits", category: "Activewear", price: "₹1,000 – ₹3,500", desc: "Full-zip" },
  { name: "Compression Wear", category: "Activewear", price: "₹500 – ₹1,500", desc: "Support" },
  { name: "Running Shoes", category: "Shoes", price: "₹1,500 – ₹7,000", desc: "Cushioned" },
  { name: "Training Shoes", category: "Shoes", price: "₹1,200 – ₹5,000", desc: "Versatile" },
  { name: "Walking Shoes", category: "Shoes", price: "₹1,000 – ₹4,000", desc: "Lightweight" },
  { name: "Sports Socks", category: "Accessories", price: "₹150 – ₹500", desc: "Cushioned pack" },
  { name: "Water Bottles", category: "Accessories", price: "₹200 – ₹800", desc: "Insulated" },
  { name: "Sports Bags", category: "Accessories", price: "₹800 – ₹3,000", desc: "Duffle & backpack" },
  { name: "Caps & Headbands", category: "Accessories", price: "₹150 – ₹500", desc: "Sports caps" },
];

const categories = ["All", "Cricket", "Football", "Badminton", "Activewear", "Shoes", "Accessories"];

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

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
            <p className="text-text-muted text-sm max-w-xl mx-auto">300+ products curated for quality and value.</p>
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

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((product, index) => (
            <motion.div key={product.name} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.02 }}
              className="glass-card rounded-xl overflow-hidden group">
              <div className="h-40 overflow-hidden">
                <img src={`/images/${categoryImages[product.category]}`} alt={product.category}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-text text-sm mb-1">{product.name}</h3>
                <p className="text-text-muted text-xs mb-3">{product.desc}</p>
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <span className="text-accent font-semibold text-sm">{product.price}</span>
                  <span className="text-text-muted/40 text-[11px] uppercase tracking-wider">{product.category}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-text-muted/50"><p className="text-sm">No products found.</p></div>
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
