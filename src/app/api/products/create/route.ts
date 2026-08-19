import { put, list } from "@vercel/blob";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";
import { isAdminRequest } from "@/lib/auth";
import { PRODUCTS_TAG } from "@/lib/products";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

// Admin-only mutation. Rejects everything else with 401/403 without leaking
// whether the requester was authenticated.
const productSchema = z.object({
  name: z.string().trim().min(2, "Name too short").max(200, "Name too long"),
  brand: z.string().trim().min(2, "Brand too short").max(100, "Brand too long"),
  category: z.string().trim().min(1).max(100),
  description: z
    .string()
    .trim()
    .min(50, "Description too short (min 50 characters)")
    .max(20000)
    .refine((d) => !/lorem ipsum|placeholder|sample text/i.test(d), {
      message: "Description may contain placeholder text",
    }),
  price: z.union([z.number().nonnegative().max(100_000_000), z.string().trim().max(30)]).optional(),
  images: z
    .array(
      z.union([
        z.string().url().max(2000),
        z.string().startsWith("data:image/").max(9_000_000),
      ])
    )
    .max(10)
    .optional(),
  features: z.array(z.string().trim().max(500)).max(30).optional(),
  specifications: z
    .array(
      z.object({
        label: z.string().trim().min(1).max(100),
        value: z.string().trim().min(1).max(300),
      })
    )
    .max(40)
    .optional(),
  highlights: z.array(z.string().trim().max(200)).max(20).optional(),
  faqs: z
    .array(
      z.object({
        question: z.string().trim().min(1).max(300),
        answer: z.string().trim().min(1).max(2000),
      })
    )
    .max(20)
    .optional(),
});

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 });
}

export async function POST(request: Request) {
  if (!isAdminRequest(request.headers)) {
    return NextResponse.json({ success: false, errors: ["Unauthorized"] }, { status: 401 });
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ success: false, errors: ["Invalid JSON body"] }, { status: 400 });
  }

  const parsed = productSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        errors: parsed.error.issues.map((i) => i.message),
      },
      { status: 400 }
    );
  }

  const { name, brand, category, description, price, images, features, specifications, highlights, faqs } =
    parsed.data;

  try {
    const existing = await list({ prefix: "products/" });
    const slugs = new Set(
      existing.blobs.map((b) => b.pathname.replace(/^products\//, "").replace(/\.json$/, ""))
    );

    let slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    if (!slug) slug = `product-${Date.now()}`;
    let finalSlug = slug;
    let counter = 2;
    while (slugs.has(finalSlug)) {
      finalSlug = `${slug}-${counter++}`;
    }

    const productId = `prod_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;

    // Store images (relative paths, http URLs, or base64 uploads)
    const imageUrls: string[] = [];
    if (images && images.length > 0) {
      for (const img of images) {
        if (img.startsWith("data:")) {
          const match = img.match(/^data:(image\/\w+);base64,(.+)$/);
          if (!match) continue;
          try {
            const mimeType = match[1];
            const ext = mimeType.split("/")[1];
            const buffer = Buffer.from(match[2], "base64");
            const blob = await put(
              `products/${productId}_${Date.now()}.${ext}`,
              buffer,
              { contentType: mimeType, access: "public" }
            );
            imageUrls.push(blob.url);
          } catch {
            /* skip corrupt image */
          }
        } else {
          imageUrls.push(img);
        }
      }
    }

    const normalizedPrice =
      typeof price === "string" && price.trim() !== "" && !Number.isNaN(Number(price.replace(/[^0-9.]/g, "")))
        ? Number(price.replace(/[^0-9.]/g, ""))
        : typeof price === "number"
          ? price
          : "Visit store for pricing";

    const productData = {
      id: productId,
      name,
      brand,
      category,
      description,
      images: imageUrls,
      price: normalizedPrice,
      slug: finalSlug,
      features: features ?? [],
      specifications: specifications ?? [],
      highlights: highlights ?? [],
      faqs: faqs ?? [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: "published",
    };

    const blob = await put(`products/${productId}.json`, JSON.stringify(productData, null, 2), {
      contentType: "application/json",
      access: "public",
    });

    revalidateTag(PRODUCTS_TAG, { expire: 0 });

    return NextResponse.json({
      success: true,
      product: productData,
      url: blob.url,
      message: `${name} is now live on Golden Willowe!`,
      storeUrl: `/products/${finalSlug}`,
    });
  } catch (error) {
    console.error("Failed to create product:", error);
    return NextResponse.json(
      { success: false, errors: ["Server error. Please try again."] },
      { status: 500 }
    );
  }
}