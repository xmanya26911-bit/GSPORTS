import type { Metadata } from "next";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getCachedProducts } from "@/lib/products";
import { SITE_URL, SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Premium Cricket Bats — Shop",
  description:
    "Browse handcrafted premium English & Kashmir willow cricket bats from Golden Willowe Sports, Srinagar. Factory-direct pricing with pan-India delivery.",
  alternates: { canonical: "/products" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: SITE_NAME,
    title: "Premium Cricket Bats — Golden Willowe Sports",
    description: "Handcrafted premium English & Kashmir willow cricket bats. Factory-direct pricing.",
    url: `${SITE_URL}/products`,
  },
};

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const products = await getCachedProducts();

  return (
    <div className="container-main py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-black text-text font-display mb-2">Our Collection</h1>
        <p className="text-text-muted">Handcrafted premium cricket bats</p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-text-muted text-lg mb-2">No products yet</p>
          <p className="text-text-muted text-sm">New bats are added regularly — check back soon.</p>
        </div>
      ) : (
        <ProductGrid products={products} />
      )}
    </div>
  );
}