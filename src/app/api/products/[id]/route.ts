import { del, list } from "@vercel/blob";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/auth";
import { PRODUCTS_TAG, getProductById } from "@/lib/products";

export const dynamic = "force-dynamic";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAdminRequest(request.headers)) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    if (!/^prod_[A-Za-z0-9_]+$/.test(id)) {
      return NextResponse.json({ success: false, message: "Invalid product id" }, { status: 400 });
    }

    // Remove uploaded product images (Blob-hosted, not local /images paths)
    const product = await getProductById(id);
    const remoteImages = (product?.images ?? []).filter((img) => img.startsWith("http"));
    if (remoteImages.length > 0) {
      const { blobs } = await list({ prefix: `products/${id}_` });
      await Promise.all(
        blobs
          .filter((b) => remoteImages.includes(b.url))
          .map((b) => del(b.url).catch(() => {}))
      );
    }

    await del(`products/${id}.json`);
    revalidateTag(PRODUCTS_TAG, { expire: 0 });
    return NextResponse.json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.error("Delete failed:", error);
    return NextResponse.json({ success: false, message: "Delete failed" }, { status: 500 });
  }
}