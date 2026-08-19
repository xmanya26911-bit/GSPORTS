import { list } from "@vercel/blob";
import { unstable_cache } from "next/cache";
import type { Product } from "@/types";

export const PRODUCTS_TAG = "products";
const PRODUCTS_PREFIX = "products/";
// How long the product catalog is cached between revalidations.
const CACHE_SECONDS = 300;

/**
 * Fetches every product JSON from Vercel Blob once, then serves the result
 * from the Next.js data cache. Revalidated on-demand after create/delete.
 */
async function fetchAllProducts(): Promise<Product[]> {
  const { blobs } = await list({ prefix: PRODUCTS_PREFIX });
  const products = await Promise.all(
    blobs.map(async (blob) => {
      try {
        const res = await fetch(blob.url, { cache: "no-store" });
        if (!res.ok) return null;
        return (await res.json()) as Product;
      } catch {
        return null;
      }
    })
  );
  return products.filter((p): p is Product => p !== null);
}

export const getCachedProducts = unstable_cache(fetchAllProducts, ["products"], {
  tags: [PRODUCTS_TAG],
  revalidate: CACHE_SECONDS,
});

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await getCachedProducts();
  return products.find((p) => p.slug === slug) ?? null;
}

export async function getProductById(id: string): Promise<Product | null> {
  const products = await getCachedProducts();
  return products.find((p) => p.id === id) ?? null;
}

/**
 * Product images are stored in the catalog as either local `/images/*.png`
 * paths (legacy products) or Vercel Blob URLs (new products). The repo now
 * ships WebP files, so local `.png` references are mapped to `.webp`.
 * Remote (Blob) URLs are passed through unchanged.
 */
export function resolveProductImage(src: string): string {
  if (!src) return "/images/cricket.jpg";
  if (src.startsWith("http")) return src;
  return src.replace(/\.png$/i, ".webp");
}