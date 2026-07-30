"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import Link from "next/link";
import type { Product } from "@/types";

function ProductCard({ product, index }: { product: Product; index: number }) {
  const isOnSale = product.compareAtPrice && product.compareAtPrice > product.price;
  const slug = product.slug;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.02 }}>
      <Link href={`/products/${slug}`} className="group block glass-card overflow-hidden">
        <div className="relative aspect-[4/5] overflow-hidden bg-bg-dark">
          {product.images?.[0] && <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />}
          {isOnSale && <span className="sale-badge">Sale</span>}
        </div>
        <div className="p-4">
          <p className="text-xs text-text-muted uppercase tracking-wider mb-1">{product.brand}</p>
          <h3 className="font-medium text-sm text-text leading-tight mb-2 line-clamp-2">{product.name}</h3>
          <div className="flex items-center gap-2">
            <span className="font-bold text-primary">₹{product.price?.toLocaleString("en-IN")}</span>
            {isOnSale && <span className="text-text-muted text-sm line-through">₹{product.compareAtPrice?.toLocaleString("en-IN")}</span>}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => { setProducts(data.products || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  let filtered = products;
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter((p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
  }

  filtered = [...filtered].sort((a, b) => {
    switch (sort) {
      case "price-asc": return a.price - b.price;
      case "price-desc": return b.price - a.price;
      case "name-asc": return a.name.localeCompare(b.name);
      default: return 0;
    }
  });

  return (
    <div className="container-main py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-black text-primary font-display mb-2">Our Collection</h1>
        <p className="text-text-muted">Handcrafted premium cricket bats</p>
      </div>

      {/* Search + Sort */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search bats..." className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-white text-sm focus-ring" />
          {search && <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text"><X className="w-4 h-4" /></button>}
        </div>
        <div className="flex items-center gap-2">
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="px-3 py-2.5 rounded-xl border border-border bg-white text-sm text-text focus-ring">
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A-Z</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="glass-card overflow-hidden animate-pulse">
              <div className="aspect-[4/5] bg-bg-dark" />
              <div className="p-4 space-y-3"><div className="h-3 bg-bg-dark rounded w-1/3" /><div className="h-4 bg-bg-dark rounded w-3/4" /><div className="h-5 bg-bg-dark rounded w-1/2" /></div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-text-muted text-lg mb-2">No products found</p>
          <p className="text-text-muted text-sm">Try adjusting your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filtered.map((product, i) => (<ProductCard key={product.id} product={product} index={i} />))}
        </div>
      )}
    </div>
  );
}
