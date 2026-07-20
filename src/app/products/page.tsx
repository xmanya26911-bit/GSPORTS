
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Search } from "lucide-react";
import { useState } from "react";

const categoryImages: Record<string, string> = {
  Cricket: "cricket.jpg",
  Football: "football.jpg",
  Badminton: "badminton.jpg",
  Activewear: "activewear.jpg",
  Shoes: "shoes.jpg",
  Accessories: "accessories.jpg",
};

const products = [
  { name: "Cricket Bat (English Willow)", category: "Cricket", price: "₹2,500 – ₹15,000", desc: "Premium quality bats for all levels" },
  { name: "Cricket Ball (Leather)", category: "Cricket", price: "₹350 – ₹1,200", desc: "Match-ready leather balls" },
  { name: "Batting Pads", category: "Cricket", price: "₹1,200 – ₹4,500", desc: "Lightweight, high-protection" },
  { name: "Cricket Gloves", category: "Cricket", price: "₹800 – ₹3,000", desc: "Comfort grip batting gloves" },
  { name: "Helmet", category: "Cricket", price: "₹1,500 – ₹5,000", desc: "ISI certified protection" },
  { name: "Cricket Kit Bag", category: "Cricket", price: "₹2,000 – ₹6,000", desc: "Spacious, durable bags" },
  { name: "Football", category: "Football", price: "₹500 – ₹3,000", desc: "Match-quality balls" },
  { name: "Football Shoes", category: "Football", price: "₹1,500 – ₹6,000", desc: "Studded & turf" },
  { name: "Goalkeeper Gloves", category: "Football", price: "₹600 – ₹2,500", desc: "Premium grip" },
  { name: "Shin Guards", category: "Football", price: "₹300 – ₹1,200", desc: "Lightweight protection" },
  { name: "Football Jersey", category: "Football", price: "₹500 – ₹2,000", desc: "Club & team jerseys" },
  { name: "Badminton Racket", category: "Badminton", price: "₹800 – ₹5,000", desc: "Carbon-fibre" },
  { name: "Shuttlecocks (Pack)", category: "Badminton", price: "₹150 – ₹800", desc: "Feather & nylon" },
  { name: "Badminton Net", category: "Badminton", price: "₹1,000 – ₹3,000", desc: "Portable court nets" },
  { name: "Court Shoes", category: "Badminton", price: "₹1,200 – ₹4,000", desc: "Non-marking sole" },
  { name: "Gym T-Shirts", category: "Activewear", price: "₹299 – ₹999", desc: "Breathable, quick-dry" },
  { name: "Shorts", category: "Activewear", price: "₹399 – ₹1,200", desc: "Training shorts" },
  { name: "Tracksuits", category: "Activewear", price: "₹1,000 – ₹3,500", desc: "Full-zip sets" },
  { name: "Compression Wear", category: "Activewear", price: "₹500 – ₹1,500", desc: "Support & recovery" },
  { name: "Running Shoes", category: "Shoes", price: "₹1,500 – ₹7,000", desc: "Cushioned running" },
  { name: "Training Shoes", category: "Shoes", price: "₹1,200 – ₹5,000", desc: "Gym & training" },
  { name: "Walking Shoes", category: "Shoes", price: "₹1,000 – ₹4,000", desc: "Lightweight casual" },
  { name: "Sports Socks", category: "Accessories", price: "₹150 – ₹500", desc: "Cushioned packs" },
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
    <div className="pt-24 pb-16">
      <section className="bg-bg border-b border-border-light py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="w-8 h-px bg-accent/50 mx-auto mb-6" />
            <h1 className="text-3xl md:text-5xl font-black text-text mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
              Our Collection
            </h1>
            <p className="text-text-muted text-sm max-w-xl mx-auto">
              300+ products — from cricket to activewear. Every item selected for quality and value.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-7 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-5 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent pl-11 pr-4 py-3 rounded-xl border border-border-light focus:border-accent/30 focus:ring-1 focus:ring-accent/20 outline-none transition-all text-sm text-text placeholder-text-muted/50"
              />
            </div>
            <div className="flex flex-wrap gap-2 shrink-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-xs font-medium tracking-wide transition-all ${
                    activeCategory === cat
                      ? "bg-accent text-bg-dark"
                      : "bg-white/5 text-text-muted hover:bg-white/10 border border-border-light"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.02 }}
              className="glass-card rounded-xl overflow-hidden"
            >
              <div className="h-40 overflow-hidden">
                <img
                  src={`/images/${categoryImages[product.category]}`}
                  alt={product.category}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-text text-sm mb-1">{product.name}</h3>
                <p className="text-text-muted text-xs mb-3 leading-relaxed">{product.desc}</p>
                <div className="flex items-center justify-between pt-2 border-t border-border-light">
                  <span className="text-accent font-semibold text-sm">{product.price}</span>
                  <span className="text-text-muted/50 text-[11px] uppercase tracking-wider">{product.category}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-text-muted/50">
            <p className="text-sm">No products found.</p>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mt-12 glass rounded-2xl p-8 md:p-12"
        >
          <h3 className="text-xl font-bold text-text mb-3" style={{ fontFamily: "var(--font-playfair)" }}>
            Didn&apos;t Find What You&apos;re Looking For?
          </h3>
          <p className="text-text-muted text-sm mb-6">
            We stock much more than listed. Visit our store or call us!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-accent text-bg-dark px-6 py-3 rounded-xl text-sm font-semibold hover:bg-accent-light transition-all"
            >
              Visit Store
              <ChevronRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:07405208523"
              className="inline-flex items-center gap-2 border border-accent/30 text-accent px-6 py-3 rounded-xl text-sm font-medium hover:bg-accent/10 transition-all"
            >
              Call 074052 08523
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
