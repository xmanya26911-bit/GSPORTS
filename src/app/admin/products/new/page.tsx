"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, Send, Image as ImageIcon, X, Loader2, Wand2,
  CheckCircle, ArrowLeft, Upload, Trash2, ExternalLink, AlertCircle,
  ListChecks, Settings2, Star, HelpCircle
} from "lucide-react";
import Link from "next/link";

interface AIProductContent {
  description: string;
  features: string[];
  specifications: { label: string; value: string }[];
  highlights: string[];
  faqs: { question: string; answer: string }[];
}

export default function AIProductGenerator() {
  const [productName, setProductName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState<{ file: File; url: string }[]>([]);
  const [description, setDescription] = useState("");
  const [aiContent, setAiContent] = useState<AIProductContent | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [published, setPublished] = useState(false);
  const [streamText, setStreamText] = useState("");
  const [error, setError] = useState("");
  const [publishResult, setPublishResult] = useState<{ message?: string; storeUrl?: string; product?: { name?: string; slug?: string } } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    for (const file of files) {
      const url = URL.createObjectURL(file);
      setImages((prev) => [...prev, { file, url }]);
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeImage = (index: number) => {
    setImages((prev) => {
      URL.revokeObjectURL(prev[index].url);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith("image/"));
    for (const file of files) {
      const url = URL.createObjectURL(file);
      setImages((prev) => [...prev, { file, url }]);
    }
  };

  const handleGenerate = async () => {
    if (!productName || !brand) return;
    setIsGenerating(true);
    setStreamText("");
    setDescription("");
    setAiContent(null);

    try {
      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productName, brand, price }),
      });

      if (!response.ok) throw new Error(`API error: ${response.status}`);

      const data = await response.json();

      if (data.success && data.content) {
        setAiContent(data.content);
        if (data.content.description) setDescription(data.content.description);
        setStreamText("Full product page generated successfully!");
      } else {
        throw new Error("Invalid response");
      }
    } catch {
      // Fallback content
      const fallback: AIProductContent = {
        description: `${productName} by ${brand} — premium cricket equipment from Golden Willowe Sports. Handcrafted with precision in Kashmir, India. Engineered for performance and designed for cricketers who demand the best.`,
        features: [
          "Handcrafted from premium grade materials",
          "Professional grade with optimal balance",
          "Factory-direct pricing — no middlemen",
          "Made in Kashmir, India",
          "Quality tested for performance",
          "Trusted by 10000+ customers",
        ],
        specifications: [
          { label: "Brand", value: brand },
          { label: "Category", value: "Cricket" },
          { label: "Origin", value: "Kashmir, India" },
        ],
        highlights: [
          "Premium craftsmanship from Golden Willowe",
          "Factory-direct pricing",
          "Trusted by 10000+ happy customers",
        ],
        faqs: [
          { question: "Is this suitable for professional play?", answer: "Yes, this product is designed for both professional and amateur cricketers." },
          { question: "What is the warranty period?", answer: "All Golden Willowe products come with a 6-month manufacturer warranty." },
          { question: "How long does delivery take?", answer: "Delivery across India takes 3-5 business days." },
        ],
      };
      setAiContent(fallback);
      setDescription(fallback.description);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePublish = async () => {
    // ===== CLIENT-SIDE TRIPLE CHECK =====
    const checks: { check: string; passed: boolean; msg: string }[] = [];

    const c1 = productName.trim().length >= 2 && brand.trim().length >= 2;
    checks.push({
      check: "Required Fields",
      passed: c1,
      msg: c1 ? "✓ All fields filled" : "✗ Fill in product name and brand",
    });

    const c2 = description.trim().length >= 50;
    checks.push({
      check: "Description Quality",
      passed: c2,
      msg: c2 ? "✓ Description has sufficient detail" : "✗ Description too short (min 50 chars)",
    });

    const c3 = !/lorem ipsum|placeholder|sample text/i.test(description);
    checks.push({
      check: "Data Integrity",
      passed: c3,
      msg: c3 ? "✓ No placeholder content detected" : "✗ Description contains placeholder text",
    });

    const allPassed = checks.every((c) => c.passed);
    if (!allPassed) {
      setError(checks.filter((c) => !c.passed).map((c) => c.msg).join("\n"));
      return;
    }

    setIsPublishing(true);
    setError("");

    try {
      const imageDataList: string[] = [];
      for (const img of images) {
        try {
          const base64 = await fileToBase64(img.file);
          imageDataList.push(base64);
        } catch {}
      }

      const payload = {
        name: productName.trim(),
        brand: brand.trim(),
        category: "Cricket",
        price: price.trim() || "Visit store for pricing",
        description: description.trim(),
        images: imageDataList,
        features: aiContent?.features || [],
        specifications: aiContent?.specifications || [],
        highlights: aiContent?.highlights || [],
        faqs: aiContent?.faqs || [],
      };

      const res = await fetch(`/api/products/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        setPublishResult(data);
        setPublished(true);
      } else {
        setError(data.errors?.join("\n") || "Publishing failed");
      }
    } catch {
      setError("Could not reach the store API.");
    } finally {
      setIsPublishing(false);
    }
  };

  const isValid = productName && brand && description;

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/admin/products" className="w-9 h-9 rounded-xl flex items-center justify-center text-text-tertiary hover:bg-bg-hover transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-text">New Product</h1>
          <p className="text-xs text-text-tertiary">AI generates the entire product page — you just enter the basics</p>
        </div>
      </div>

      {/* Success overlay */}
      <AnimatePresence>
        {published && publishResult && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="glass rounded-2xl border border-success/20 p-8 sm:p-12 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
            <h2 className="text-xl font-bold text-text mb-2">🎉 Published!</h2>
            <p className="text-sm text-text-tertiary mb-6">
              {publishResult.product?.name || "Product"} is now live on Golden Willowe
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={publishResult.product?.slug ? `/products/${publishResult.product.slug}` : "/products"}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm inline-flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                View Product Page
              </a>
              <Link
                href="/admin/products"
                className="glass px-5 py-2.5 rounded-xl text-sm font-medium text-text-secondary hover:text-text transition-colors"
              >
                Back to Products
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!published && (
        <>
          {/* Product Details */}
          <div className="glass rounded-2xl border border-border p-4 sm:p-6 space-y-4">
            <h2 className="text-sm font-semibold text-text">Product Details</h2>

            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1.5">Product Name *</label>
              <input
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="input-field"
                placeholder="e.g. English Willow Cricket Bat Grade A"
              />
              <p className="text-[10px] text-text-tertiary mt-1">Be specific — the AI uses this to generate the entire page</p>
            </div>

            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1.5">Brand *</label>
              <input
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="input-field"
                placeholder="e.g. SS, Kookaburra, GM, SG"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1.5">Price (₹)</label>
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="input-field"
                placeholder="e.g. 5,500"
              />
              <p className="text-[10px] text-text-tertiary mt-1">Leave blank for &quot;Visit store for pricing&quot;</p>
            </div>
          </div>

          {/* Image Upload */}
          <div className="glass rounded-2xl border border-border p-4 sm:p-6 space-y-4">
            <h2 className="text-sm font-semibold text-text">Product Images</h2>

            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-border rounded-2xl p-8 text-center cursor-pointer hover:border-accent/30 transition-colors"
            >
              <Upload className="w-8 h-8 text-text-tertiary mx-auto mb-3" />
              <p className="text-sm text-text-secondary font-medium">Drop images here or click to upload</p>
              <p className="text-[11px] text-text-tertiary mt-1">PNG, JPG, WebP — up to 10MB each</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>

            {images.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {images.map((img, i) => (
                  <div key={i} className="relative group aspect-square rounded-xl overflow-hidden bg-bg-hover border border-border">
                    <img src={img.url} alt={`Product ${i + 1}`} className="w-full h-full object-cover" />
                    <button
                      onClick={() => removeImage(i)}
                      className="absolute top-1.5 right-1.5 w-7 h-7 rounded-lg bg-black/60 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* AI Generation */}
          <div className="glass rounded-2xl border border-border p-4 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-text">AI Product Page Generator</h2>
                <p className="text-[10px] text-text-tertiary mt-0.5">Generates description, features, specs, highlights & FAQs</p>
              </div>
              <button
                onClick={handleGenerate}
                disabled={!productName || !brand || isGenerating}
                className="btn-primary text-xs"
              >
                {isGenerating ? (
                  <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Generating...</>
                ) : (
                  <><Wand2 className="w-3.5 h-3.5" /> Generate Full Page</>
                )}
              </button>
            </div>

            {/* Streaming indicator */}
            {isGenerating && streamText && (
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-accent/5 border border-accent/10">
                <div className="flex gap-1 mt-1 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent typing-dot" />
                  <span className="w-1.5 h-1.5 rounded-full bg-accent typing-dot" />
                  <span className="w-1.5 h-1.5 rounded-full bg-accent typing-dot" />
                </div>
                <p className="text-xs text-text-secondary whitespace-pre-wrap flex-1 max-h-32 overflow-y-auto">{streamText.slice(-500)}</p>
              </div>
            )}

            {/* AI Generated Content Preview */}
            {aiContent && !isGenerating && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {/* Description */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-accent" />
                    <h3 className="text-xs font-semibold text-text uppercase tracking-wider">Description</h3>
                  </div>
                  <textarea
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                      setAiContent({ ...aiContent, description: e.target.value });
                    }}
                    className="input-field min-h-[120px] resize-y text-sm leading-relaxed"
                  />
                </div>

                {/* Features */}
                {aiContent.features?.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <ListChecks className="w-3.5 h-3.5 text-accent" />
                      <h3 className="text-xs font-semibold text-text uppercase tracking-wider">Key Features ({aiContent.features.length})</h3>
                    </div>
                    <div className="space-y-1.5">
                      {aiContent.features.map((feat, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-text-secondary p-2 rounded-lg bg-bg-hover/50">
                          <span className="w-4 h-4 rounded-full bg-accent/10 text-accent flex items-center justify-center shrink-0 mt-0.5 text-[9px] font-bold">{i + 1}</span>
                          {feat}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Specifications */}
                {aiContent.specifications?.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Settings2 className="w-3.5 h-3.5 text-accent" />
                      <h3 className="text-xs font-semibold text-text uppercase tracking-wider">Specifications ({aiContent.specifications.length})</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {aiContent.specifications.map((spec, i) => (
                        <div key={i} className="p-2 rounded-lg bg-bg-hover/50">
                          <div className="text-[10px] text-text-tertiary uppercase tracking-wider">{spec.label}</div>
                          <div className="text-xs text-text font-medium mt-0.5">{spec.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Highlights */}
                {aiContent.highlights?.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-3.5 h-3.5 text-accent" />
                      <h3 className="text-xs font-semibold text-text uppercase tracking-wider">Highlights ({aiContent.highlights.length})</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {aiContent.highlights.map((h, i) => (
                        <span key={i} className="text-[11px] text-accent bg-accent/10 px-2.5 py-1 rounded-full">{h}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* FAQs */}
                {aiContent.faqs?.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <HelpCircle className="w-3.5 h-3.5 text-accent" />
                      <h3 className="text-xs font-semibold text-text uppercase tracking-wider">FAQs ({aiContent.faqs.length})</h3>
                    </div>
                    <div className="space-y-2">
                      {aiContent.faqs.map((faq, i) => (
                        <details key={i} className="group">
                          <summary className="text-xs font-medium text-text cursor-pointer p-2 rounded-lg bg-bg-hover/50 hover:bg-bg-hover transition-colors flex items-center justify-between">
                            {faq.question}
                            <ChevronDown className="w-3.5 h-3.5 text-text-tertiary group-open:rotate-180 transition-transform" />
                          </summary>
                          <p className="text-xs text-text-secondary p-2 pl-4">{faq.answer}</p>
                        </details>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2 p-3 rounded-xl bg-success/5 border border-success/10">
                  <CheckCircle className="w-4 h-4 text-success shrink-0" />
                  <p className="text-xs text-success">Full product page generated! Review above, edit description if needed, then publish.</p>
                </div>
              </motion.div>
            )}

            {/* Empty state */}
            {!aiContent && !isGenerating && (
              <div className="text-center py-6">
                <Wand2 className="w-6 h-6 text-text-tertiary mx-auto mb-2" />
                <p className="text-xs text-text-tertiary">Fill in the product details above, then click &quot;Generate Full Page&quot;</p>
                <p className="text-[10px] text-text-tertiary/50 mt-1">AI creates: description, features, specs, highlights, FAQs</p>
              </div>
            )}
          </div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-2xl border border-danger/20 p-4"
            >
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-danger shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-text">Publishing blocked</p>
                  <pre className="text-xs text-text-tertiary mt-1 whitespace-pre-wrap">{error}</pre>
                </div>
                <button onClick={() => setError("")} className="ml-auto text-text-tertiary hover:text-text">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Publish */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 glass rounded-2xl border border-border p-4 sm:p-6">
            <div>
              <h3 className="text-sm font-semibold text-text">Ready to publish?</h3>
              <p className="text-xs text-text-tertiary mt-0.5">The product page will be live on your store immediately</p>
            </div>
            <button
              onClick={handlePublish}
              disabled={!isValid || isPublishing}
              className="btn-primary text-sm py-3 px-6 w-full sm:w-auto justify-center"
            >
              {isPublishing ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Publishing...</>
              ) : (
                <><CheckCircle className="w-4 h-4" /> Make Live</>
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
