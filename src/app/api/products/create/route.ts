import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// CORS headers for admin panel cross-origin requests
function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function POST(request: Request) {
  try {
    // Handle preflight
    if (request.method === "OPTIONS") {
      return NextResponse.json({}, { headers: corsHeaders() });
    }

    const body = await request.json();
    const { name, brand, category, description, images, price } = body;

    // ===== TRIPLE CHECK VALIDATION =====
    const checks: { check: string; passed: boolean; message: string }[] = [];

    // Check 1: Required fields
    const check1a = name && name.trim().length >= 2;
    const check1b = brand && brand.trim().length >= 2;
    const check1c = !!category;
    const check1d = description && description.trim().length >= 20;
    checks.push({
      check: "Required Fields",
      passed: check1a && check1b && check1c && check1d,
      message: check1a && check1b && check1c && check1d
        ? "All required fields present" 
        : `Missing: ${!check1a ? "name " : ""}${!check1b ? "brand " : ""}${!check1c ? "category " : ""}${!check1d ? "description " : ""}`,
    });

    // Check 2: Content quality
    const check2a = description && description.length >= 50;
    const check2b = name && name.length <= 200;
    checks.push({
      check: "Content Quality",
      passed: check2a && check2b,
      message: check2a && check2b
        ? "Content meets quality standards"
        : `${!check2a ? "Description too short " : ""}${!check2b ? "Name too long " : ""}`,
    });

    // Check 3: Data integrity
    const hasNoPlaceholders = description 
      ? !/lorem ipsum|placeholder|sample text/i.test(description)
      : false;
    checks.push({
      check: "Data Integrity",
      passed: hasNoPlaceholders,
      message: hasNoPlaceholders
        ? "No placeholder content detected"
        : "Description may contain placeholder text",
    });

    const allPassed = checks.every((c) => c.passed);

    if (!allPassed) {
      return NextResponse.json(
        { success: false, checks, errors: checks.filter((c) => !c.passed).map((c) => c.message) },
        { status: 400, headers: corsHeaders() }
      );
    }

    // All checks passed — create product
    const sanitizedName = name.trim();
    const sanitizedBrand = brand.trim();
    const slug = sanitizedName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const productId = `prod_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    
    // Upload any base64 images to Blob
    const imageUrls: string[] = [];
    if (images && Array.isArray(images)) {
      for (const img of images) {
        if (typeof img === "string" && img.startsWith("data:")) {
          try {
            const match = img.match(/^data:(image\/\w+);base64,(.+)$/);
            if (match) {
              const mimeType = match[1];
              const ext = mimeType.split("/")[1];
              const buffer = Buffer.from(match[2], "base64");
              const blob = await put(
                `products/${productId}_${Date.now()}.${ext}`,
                buffer,
                { contentType: mimeType, access: "public" }
              );
              imageUrls.push(blob.url);
            }
          } catch {
            // Skip failed image uploads
          }
        } else if (typeof img === "string" && img.startsWith("http")) {
          imageUrls.push(img);
        }
      }
    }
    
    const productData = {
      id: productId,
      name: sanitizedName,
      brand: sanitizedBrand,
      category,
      description: description.trim(),
      images: imageUrls,
      price: price || "Visit store for pricing",
      slug,
      createdAt: new Date().toISOString(),
      status: "published",
    };

    const blob = await put(`products/${productData.id}.json`, JSON.stringify(productData, null, 2), {
      contentType: "application/json",
      access: "public",
    });

    return NextResponse.json({
      success: true,
      checks: checks.map((c) => ({ ...c, passed: true })),
      product: productData,
      url: blob.url,
      message: `✅ ${sanitizedName} is now live on G SPORTS!`,
      storeUrl: `https://gsports-beta.vercel.app/products`,
    }, { headers: corsHeaders() });

  } catch (error) {
    console.error("Failed to create product:", error);
    return NextResponse.json(
      { success: false, errors: ["Server error. Please try again."] },
      { status: 500, headers: corsHeaders() }
    );
  }
}
