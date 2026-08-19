"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { ProductImage } from "@/components/ProductImage";
import { formatProductPrice } from "@/lib/utils";
import type { Product } from "@/types";

function ProductCard({ product, index }: { product: Product; index: number }) {
  const isOnSale =
    typeof product.price === "number" &&
    product.compareAtPrice !== undefined &&
    product.compareAtPrice > product.price;
  const isSoldOut =
    product.inventory?.status === "sold_out" || product.inventory?.status === "out_of_stock";

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.02 }}>
      <Link href={`/products/${product.slug}`} className="group block glass-card overflow-hidden">
        <div className="relative aspect-[4/5] overflow-hidden bg-bg-dark">
          {product.images?.[0] && (
            <ProductImage
              src={product.images[0]}
              alt={product.name}
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          )}
          {isOnSale && <span className="sale-badge">Sale</span>}
          {isSoldOut && <span className="sale-badge bg-primary">Sold out</span>}
        </div>
        <div className="p-4">
          <p className="text-xs text-text-muted uppercase tracking-wider mb-1">{product.brand}</p>
          <h3 className="font-medium text-sm text-text leading-tight mb-2 line-clamp-2">{product.name}</h3>
          <div className="flex items-center gap-2">
            <span className="font-bold text-primary">{formatProductPrice(product.price)}</span>
            {isOnSale && (
              <span className="text-text-muted text-sm line-through">
                ₹{product.compareAtPrice?.toLocaleString("en-IN")}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

type SortKey = "featured" | "price-asc" | "price-desc" | "name-asc";

export function ProductGrid({ products }: { products: Product[] }) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortKey>("featured");

  const filtered = useMemo(() => {
    let list = products;
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
      );
    }
    return [...list].sort((a, b) => {
      switch (sort) {
        case "price-asc":
          return (typeof a.price === "number" ? a.price : Infinity) - (typeof b.price === "number" ? b.price : Infinity);
        case "price-desc":
          return (typeof b.price === "number" ? b.price : -Infinity) - (typeof a.price === "number" ? a.price : -Infinity);
        case "name-asc":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
  }, [products, search, sort]);

  return (
    <>
      {/* Search + Sort */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" aria-hidden="true" />
          <label htmlFor="product-search" className="sr-only">
            Search products
          </label>
          <input
            id="product-search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search bats..."
            className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-border bg-white text-sm focus-ring"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text" aria-label="Clear search">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="product-sort" className="sr-only">
            Sort products
          </label>
          <select
            id="product-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="px-3 py-2.5 rounded-xl border border-border bg-white text-sm text-text focus-ring"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A-Z</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-text-muted text-lg mb-2">No products found</p>
          <p className="text-text-muted text-sm">Try adjusting your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      )}
    </>
  );
}