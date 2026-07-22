import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const AI_BASE_URL = "https://opencode.ai/zen/v1";
const AI_MODEL = "mimo-v2.5-free";

export async function POST(request: Request) {
  let reqBody: { productName?: string; brand?: string; price?: string } = {};
  try {
    reqBody = await request.json();
    const { productName, brand, price } = reqBody;

    if (!productName || !brand) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const prompt = `You are a professional cricket product copywriter for Golden Willowe Sports, a premium cricket bat brand in Srinagar, Kashmir, India. You write extremely detailed, rich, immersive product content.

Product: ${productName}
Brand: ${brand}
${price ? `Price: ₹${price}` : ""}

Generate a complete product page in JSON format. Return ONLY valid JSON, no markdown, no code fences.

The JSON must have this exact structure:
{
  "description": "Write a VERY LONG, extremely detailed product description — minimum 400 words, 5-7 paragraphs. Cover: the product's origin and craftsmanship story, materials used and why they matter, performance characteristics and how they help the player, the manufacturing process and quality control, who this product is ideal for (playing level, position), comparisons to standard market products, the Golden Willowe heritage in Kashmir, and a persuasive closing that makes the customer want to buy. Be specific, vivid, and emotional — not generic. Mention real cricket terminology. This should read like a premium editorial product feature, not a short blurb.",
  "features": ["8-10 key features as bullet points, each one a detailed sentence explaining the benefit, not just the feature name"],
  "specifications": [
    {"label": "Material", "value": "Premium English Willow"},
    {"label": "Grade", "value": "Grade A"},
    {"label": "Weight", "value": "1180-1250g"},
    {"label": "Handle Type", "value": "Cane Handle"},
    {"label": "Edge Profile", "value": "Powerful edges"},
    {"label": "Sweet Spot", "value": "Mid-to-low"},
    {"label": "Grain Count", "value": "8-12 grains"},
    {"label": "Made In", "value": "Kashmir, India"}
  ],
  "highlights": ["5-7 standout selling points that make this product special — each one a short powerful phrase"],
  "faqs": [
    {"question": "Is this suitable for professional play?", "answer": "Write a detailed 3-4 sentence answer."},
    {"question": "What is the warranty period?", "answer": "Write a detailed answer."},
    {"question": "How do I maintain this product?", "answer": "Write a detailed 3-4 sentence answer with specific care tips."},
    {"question": "What makes this different from cheaper alternatives?", "answer": "Write a detailed answer explaining the quality difference."},
    {"question": "How long does delivery take and what areas do you cover?", "answer": "Write a detailed answer about pan-India delivery."}
  ]
}

Rules:
- The description MUST be very long — at least 400 words, 5-7 paragraphs. This is critical.
- All content must be cricket-specific and relevant to ${productName}
- Specifications should be realistic for this type of cricket product
- FAQs should answer common buyer questions with detailed answers (not one-word)
- Write as if for an Indian cricket audience who cares about quality
- Mention Golden Willowe's Kashmir heritage, 15+ years of craftsmanship, 10000+ customers
- Return ONLY the JSON object, nothing else`;

    const response = await fetch(`${AI_BASE_URL}/chat/completions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: AI_MODEL,
        messages: [{ role: "user", content: prompt }],
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`AI API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";

    // Parse the JSON from the AI response
    let cleanText = content.trim();
    cleanText = cleanText.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```\s*$/i, "");
    const jsonStart = cleanText.indexOf("{");
    const jsonEnd = cleanText.lastIndexOf("}");
    if (jsonStart >= 0 && jsonEnd > jsonStart) {
      cleanText = cleanText.substring(jsonStart, jsonEnd + 1);
    }

    try {
      const parsed = JSON.parse(cleanText);
      return NextResponse.json({ success: true, content: parsed });
    } catch {
      // If JSON parse fails, return the raw text as description
      return NextResponse.json({
        success: true,
        content: {
          description: content,
          features: [],
          specifications: [],
          highlights: [],
          faqs: [],
        },
      });
    }
  } catch (error) {
    console.error("AI generation error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "AI generation failed. Using fallback content.",
        content: {
          description: `${reqBody.productName || "Product"} by ${reqBody.brand || "Golden Willowe"} — premium cricket equipment from Golden Willowe Sports. Handcrafted with precision in Kashmir, India. Engineered for performance and designed for cricketers who demand the best. With over 15 years of craftsmanship heritage and 10000+ satisfied customers, Golden Willowe delivers factory-direct quality at unmatched prices.`,
          features: [
            "Handcrafted from premium grade materials for superior performance",
            "Professional grade with optimal balance for powerful shots",
            "Factory-direct pricing — no middlemen, just pure quality",
            "Made in Kashmir, India with 15+ years of craftsmanship",
            "Quality tested for performance and durability",
            "Trusted by 10000+ happy customers across India",
            "6-month manufacturer warranty for peace of mind",
            "Free delivery across India in 3-5 business days",
          ],
          specifications: [
            { label: "Brand", value: reqBody.brand || "Golden Willowe" },
            { label: "Category", value: "Cricket" },
            { label: "Origin", value: "Kashmir, India" },
            { label: "Warranty", value: "6 months" },
          ],
          highlights: [
            "Premium craftsmanship from Golden Willowe",
            "Factory-direct pricing",
            "Trusted by 10000+ happy customers",
            "Made in Kashmir with 15+ years heritage",
          ],
          faqs: [
            { question: "Is this suitable for professional play?", answer: "Yes, this product is designed for both professional and amateur cricketers. The premium materials and craftsmanship ensure it meets the standards required for competitive play." },
            { question: "What is the warranty period?", answer: "All Golden Willowe products come with a 6-month manufacturer warranty covering defects in materials and workmanship." },
            { question: "How do I maintain this product?", answer: "Store in a cool, dry place away from direct sunlight. Clean with a soft cloth after use. For bats, oil the blade periodically and avoid excessive moisture exposure. Use a bat cover when not in use." },
            { question: "How long does delivery take?", answer: "Delivery across India takes 3-5 business days. We ship pan-India with free shipping on orders above ₹2,000." },
          ],
        },
      },
      { status: 200 }
    );
  }
}
