"use client";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  index: number;
}

function ProductCard({ product, index }: ProductCardProps) {
  const isSoldOut = product.inventory?.status === "sold_out" || product.inventory?.status === "out_of_stock";
  const isOnSale = product.compareAtPrice && product.compareAtPrice > product.price;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.05 }}>
      <Link href={`/products/${product.slug}`} className="group block glass-card overflow-hidden">
        <div className="relative aspect-square overflow-hidden bg-bg-dark">
          {product.images?.[0] && <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />}
          {isOnSale && <span className="sale-badge">Sale</span>}
          {isSoldOut && <span className="sale-badge bg-primary">Sold out</span>}
        </div>
        <div className="p-4">
          <p className="text-xs text-text-muted uppercase tracking-wider mb-1">{product.brand}</p>
          <h3 className="font-medium text-sm text-text leading-tight mb-2 line-clamp-2">{product.name}</h3>
          <div className="flex items-center gap-2">
            <span className="font-bold text-primary text-base">₹{product.price?.toLocaleString("en-IN")}</span>
            {isOnSale && <span className="text-text-muted text-sm line-through">₹{product.compareAtPrice?.toLocaleString("en-IN")}</span>}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

interface ProductSliderProps {
  title: string;
  collection?: string;
  link?: string;
}

export function ProductSlider({ title, collection, link }: ProductSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => {
        let list = data.products || [];
        if (collection) list = list.filter((p: Product) => p.category === collection);
        setProducts(list.slice(0, 8));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [collection]);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "left" ? -scrollRef.current.clientWidth * 0.8 : scrollRef.current.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section className="section-padding bg-bg">
      <div className="container-main">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-black text-primary font-display">{title}</h2>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1">
              <button onClick={() => scroll("left")} disabled={!canScrollLeft} className="p-2 rounded-full border border-border text-text-muted hover:text-text hover:border-accent transition-colors disabled:opacity-30 focus-ring" aria-label="Scroll left"><ChevronLeft className="w-4 h-4" /></button>
              <button onClick={() => scroll("right")} disabled={!canScrollRight} className="p-2 rounded-full border border-border text-text-muted hover:text-text hover:border-accent transition-colors disabled:opacity-30 focus-ring" aria-label="Scroll right"><ChevronRight className="w-4 h-4" /></button>
            </div>
            <Link href={link || "/products"} className="flex items-center gap-1 text-sm font-medium text-accent hover:text-accent-dark transition-colors focus-ring rounded-sm">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div ref={scrollRef} onScroll={checkScroll} className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-4 px-4 pb-2" style={{ scrollbarWidth: "none" }}>
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="snap-start shrink-0 w-[260px]">
                <div className="glass-card overflow-hidden animate-pulse">
                  <div className="aspect-square bg-bg-dark" />
                  <div className="p-4 space-y-3"><div className="h-3 bg-bg-dark rounded w-1/3" /><div className="h-4 bg-bg-dark rounded w-3/4" /><div className="h-5 bg-bg-dark rounded w-1/2" /></div>
                </div>
              </div>
            ))
          ) : products.length === 0 ? (
            <div className="w-full py-12 text-center">
              <p className="text-text-muted">No products yet</p>
              <Link href="/admin/products/new" className="text-accent text-sm mt-2 inline-block hover:underline">Add your first product</Link>
            </div>
          ) : (
            products.map((product, i) => (
              <div key={product.id} className="snap-start shrink-0 w-[260px]">
                <ProductCard product={product} index={i} />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
