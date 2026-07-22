"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Package, Sparkles, Trash2, ExternalLink, RefreshCw, AlertCircle } from "lucide-react";
import Link from "next/link";

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
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data.products || []);
    } catch {
      setError("Could not fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"? This will remove it from the live store.`)) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
      } else {
        setError("Delete failed");
      }
    } catch {
      setError("Could not reach the store");
    } finally {
      setDeleting(null);
    }
  };

  const filtered = products.filter((p) =>
    search ? p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase()) : true
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">Products</h1>
          <p className="text-sm text-text-tertiary mt-0.5">{products.length} product{products.length !== 1 ? "s" : ""} on live store</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={fetchProducts} className="btn-ghost text-xs" disabled={loading}>
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} /> Refresh
          </button>
          <Link href="/admin/products/new" className="btn-primary text-xs">
            <Sparkles className="w-4 h-4" /> New Product
          </Link>
        </div>
      </div>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="glass rounded-xl border border-danger/20 p-3 flex items-center gap-3"
          >
            <AlertCircle className="w-4 h-4 text-danger shrink-0" />
            <p className="text-xs text-text-secondary flex-1">{error}</p>
            <button onClick={() => setError("")} className="text-text-tertiary hover:text-text text-xs">Dismiss</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search */}
      {products.length > 0 && (
        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="input-field pl-10"
          />
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="glass rounded-2xl border border-border p-16 text-center">
          <RefreshCw className="w-8 h-8 text-text-tertiary mx-auto mb-3 animate-spin" />
          <p className="text-sm text-text-tertiary">Loading products...</p>
        </div>
      )}

      {/* Empty */}
      {!loading && products.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-2xl border border-border p-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-bg-hover flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-text-tertiary" />
          </div>
          <h3 className="text-lg font-semibold text-text mb-2">No products yet</h3>
          <p className="text-sm text-text-tertiary mb-6 max-w-sm mx-auto">Your live store is empty. Create your first product using the AI Product Generator.</p>
          <Link href="/admin/products/new" className="btn-primary">
            <Sparkles className="w-4 h-4" /> Create Your First Product
          </Link>
        </motion.div>
      )}

      {/* Product List */}
      {!loading && filtered.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-2xl border border-border overflow-hidden">
          <div className="divide-y divide-border/50">
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="flex items-center gap-4 px-4 py-3.5 hover:bg-bg-hover/50 transition-colors group"
              >
                {/* Thumb */}
                <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 bg-bg-hover">
                  {product.images?.[0] ? (
                    <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs font-bold text-accent">
                      {product.name.charAt(0)}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-text truncate">{product.name}</span>
                    <span className="text-[10px] text-text-tertiary bg-bg-hover px-1.5 py-0.5 rounded">{product.category}</span>
                  </div>
                  <div className="text-[11px] text-text-tertiary">{product.brand}</div>
                </div>

                {/* Price */}
                <div className="text-sm font-semibold text-accent shrink-0">{product.price || "—"}</div>

                {/* Actions */}
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                  <a
                    href="/products"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-text-tertiary hover:bg-bg-hover transition-colors"
                    title="View on store"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => handleDelete(product.id, product.name)}
                    disabled={deleting === product.id}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-danger/60 hover:text-danger hover:bg-danger/5 transition-colors"
                    title="Delete product"
                  >
                    {deleting === product.id ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
