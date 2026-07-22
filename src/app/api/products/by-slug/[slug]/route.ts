import { list } from "@vercel/blob";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const { blobs } = await list({ prefix: "products/" });

    // Fetch all products and find by slug
    const products = await Promise.all(
      blobs.map(async (blob) => {
        const res = await fetch(blob.url);
        return res.json();
      })
    );

    const product = products.find((p: any) => p.slug === slug);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ product });
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}
