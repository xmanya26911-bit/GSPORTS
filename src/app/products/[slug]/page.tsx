import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { ProductDetailClient } from "@/components/product/ProductDetailClient";
import { getProductBySlug } from "@/lib/products";
import { SITE_URL, SITE_NAME } from "@/lib/constants";
import type { Product } from "@/types";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };

  const image = product.images?.[0] ? `${SITE_URL}${product.images[0].replace(/\.png$/i, ".webp")}` : undefined;

  return {
    title: product.name,
    description: product.description?.slice(0, 160) ?? `Buy ${product.name} — premium ${product.brand} cricket bat from ${SITE_NAME}.`,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: SITE_NAME,
      title: `${product.name} — ${SITE_NAME}`,
      description: product.description?.slice(0, 200),
      images: image ? [{ url: image, width: 1200, height: 1600 }] : undefined,
    },
  };
}

function productJsonLd(product: Product) {
  const availability =
    product.inventory?.status === "out_of_stock" || product.inventory?.status === "sold_out"
      ? "https://schema.org/OutOfStock"
      : "https://schema.org/InStock";
  const price =
    typeof product.price === "number"
      ? {
          "@type": "Offer" as const,
          price: String(product.price),
          priceCurrency: "INR",
          availability,
          url: `${SITE_URL}/products/${product.slug}`,
        }
      : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    brand: { "@type": "Brand", name: product.brand },
    sku: product.id,
    image: product.images?.map((i) => `${SITE_URL}${i.replace(/\.png$/i, ".webp")}`),
    offers: price
      ? price
      : {
          "@type": "Offer",
          priceCurrency: "INR",
          availability,
          url: `${SITE_URL}/products/${product.slug}`,
          description: "Contact store for pricing",
        },
  };
}

function breadcrumbJsonLd(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Products", item: `${SITE_URL}/products` },
      { "@type": "ListItem", position: 3, name: product.name, item: `${SITE_URL}/products/${product.slug}` },
    ],
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd(product)) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(product)) }}
        />

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-text-muted/50 mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-accent transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" aria-hidden="true" />
          <Link href="/products" className="hover:text-accent transition-colors">Products</Link>
          <ChevronRight className="w-3 h-3" aria-hidden="true" />
          <span className="text-text-secondary truncate">{product.name}</span>
        </nav>

        <ProductDetailClient product={product} />
      </div>
    </div>
  );
}