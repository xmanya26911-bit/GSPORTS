import { list } from "@vercel/blob";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { blobs } = await list({ prefix: "products/" });
    const products = await Promise.all(
      blobs.map(async (blob) => {
        const res = await fetch(blob.url);
        return res.json();
      })
    );
    return NextResponse.json({ products, total: products.length });
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return NextResponse.json({ products: [], total: 0 });
  }
}
