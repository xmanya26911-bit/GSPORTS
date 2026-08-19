import { NextResponse } from "next/server";
import { getCachedProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const products = await getCachedProducts();
    return NextResponse.json(
      { products, total: products.length },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        },
      }
    );
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return NextResponse.json({ products: [], total: 0 }, { status: 500 });
  }
}