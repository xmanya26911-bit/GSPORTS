
const AI_BASE_URL = "https://opencode.ai/zen/v1";
const AI_MODEL = "mimo-v2.5-free";

interface AIRequest {
  productName: string;
  brand: string;
  category: string;
  specifications: string;
  customPrompt?: string;
  language?: "english" | "hindi" | "gujarati";
}

export async function generateProductContent(
  data: AIRequest,
  onChunk?: (text: string) => void
): Promise<string> {
  const prompt = `You are a professional sports product copywriter and e-commerce SEO expert.

Generate comprehensive product content for the following sports product:

Product Name: ${data.productName}
Brand: ${data.brand}
Category: ${data.category}
Specifications: ${data.specifications || "Not provided"}
${data.language ? `Language: ${data.language}` : ""}
${data.customPrompt ? `Additional Instructions: ${data.customPrompt}` : ""}

Generate the following sections with clear headers:

## Professional Title
Create an optimized, search-friendly product title.

## Marketing Description
Luxury, emotional, persuasive product description (2-3 paragraphs).

## Key Features
- Feature 1
- Feature 2
- Feature 3
(at least 6 bullet points)

## Technical Specifications
List technical specs in a structured format.

## Product Highlights
3-5 standout highlights.

## SEO Meta Title
Optimized title tag (50-60 characters).

## SEO Meta Description
Compelling meta description (150-160 characters).

## Search Keywords
10-15 comma-separated keywords.

## Product Tags
8-10 relevant tags.

## Product Slug
URL-friendly slug

## FAQs
3-5 frequently asked questions with answers.

## Shipping Information
Standard shipping details and timeline.

## Warranty
Warranty information.

## Care Instructions
Product care and maintenance.

## Marketing Captions
- Instagram: ...
- Facebook: ...
- X (Twitter): ...
- Google Shopping: ...`;

  try {
    const response = await fetch(`${AI_BASE_URL}/chat/completions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: AI_MODEL,
        messages: [{ role: "user", content: prompt }],
        stream: true,
      }),
    });

    if (!response.ok) {
      throw new Error(`AI request failed: ${response.status}`);
    }

    const reader = response.body?.getReader();
    if (!reader) throw new Error("No response stream");

    let fullText = "";
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split("\n").filter((l) => l.startsWith("data: "));

      for (const line of lines) {
        try {
          const json = JSON.parse(line.replace("data: ", ""));
          const content = json.choices?.[0]?.delta?.content || "";
          if (content) {
            fullText += content;
            onChunk?.(content);
          }
        } catch {}
      }
    }

    return fullText;
  } catch (error) {
    console.error("AI generation error:", error);
    throw error;
  }
}

export async function regenerateSection(
  productData: AIRequest,
  section: string
): Promise<string> {
  const prompt = `Regenerate only the "${section}" section for the following product:
Product: ${productData.productName}
Brand: ${productData.brand}
Category: ${productData.category}
Specifications: ${productData.specifications}

Provide only the regenerated content for "${section}" without any additional commentary.`;

  const response = await fetch(`${AI_BASE_URL}/chat/completions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: AI_MODEL,
      messages: [{ role: "user", content: prompt }],
      stream: false,
    }),
  });

  if (!response.ok) throw new Error(`Regeneration failed: ${response.status}`);

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "";
}
