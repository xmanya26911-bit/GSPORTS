"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, Send, Image as ImageIcon, X, Loader2, Wand2,
  CheckCircle, ArrowLeft, Upload, Trash2, ExternalLink, AlertCircle
} from "lucide-react";
import Link from "next/link";

export default function AIProductGenerator() {
  const [productName, setProductName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState<{ file: File; url: string }[]>([]);
  const [description, setDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [published, setPublished] = useState(false);
  const [streamText, setStreamText] = useState("");
  const [error, setError] = useState("");
  const [publishResult, setPublishResult] = useState<{ message?: string; storeUrl?: string; product?: { name?: string } } | null>(null);
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
    if (!productName || !brand || !category) return;
    setIsGenerating(true);
    setStreamText("");

    const prompt = `You are a professional sports product copywriter for Golden Willowe Sports.

Product: ${productName}
Brand: ${brand}
Category: ${category}

Generate ONLY a product description. Make it persuasive, professional, and suitable for an e-commerce product page. 2-3 paragraphs. Focus on quality, performance, and why the customer should buy this.`;

    try {
      const response = await fetch("https://opencode.ai/zen/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "mimo-v2.5-free",
          messages: [{ role: "user", content: prompt }],
          stream: true,
        }),
      });

      if (!response.ok) throw new Error(`API error: ${response.status}`);

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No stream");

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
            const delta = json.choices?.[0]?.delta?.content || "";
            if (delta) {
              fullText += delta;
              setStreamText(fullText);
              setDescription(fullText);
            }
          } catch {}
        }
      }
    } catch (err) {
      setDescription(`${productName} by ${brand} — premium ${category.toLowerCase()} equipment from Golden Willowe Sports. Engineered for performance and designed for athletes who demand the best. Visit our store in Himatnagar or shop online.`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePublish = async () => {
    // ===== CLIENT-SIDE TRIPLE CHECK =====
    const checks: { check: string; passed: boolean; msg: string }[] = [];

    // Check 1: Required fields
    const c1 = productName.trim().length >= 2 && brand.trim().length >= 2 && !!category;
    checks.push({
      check: "Required Fields",
      passed: c1,
      msg: c1 ? "✓ All fields filled" : "✗ Fill in product name, brand, and category",
    });

    // Check 2: Description quality
    const c2 = description.trim().length >= 50;
    checks.push({
      check: "Description Quality",
      passed: c2,
      msg: c2 ? "✓ Description has sufficient detail" : "✗ Description too short (min 50 chars)",
    });

    // Check 3: Data integrity
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
      // Convert uploaded images to base64
      const imageDataList: string[] = [];
      for (const img of images) {
        try {
          const base64 = await fileToBase64(img.file);
          imageDataList.push(base64);
        } catch {
          // Skip failed conversions
        }
      }

      const payload = {
        name: productName.trim(),
        brand: brand.trim(),
        category,
        price: price.trim() || "Visit store for pricing",
        description: description.trim(),
        images: imageDataList,
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
    } catch (err) {
      setError("Could not reach the store API.");
    } finally {
      setIsPublishing(false);
    }
  };

  const isValid = productName && brand && category && description;

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/admin/products" className="w-9 h-9 rounded-xl flex items-center justify-center text-text-tertiary hover:bg-bg-hover transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-accent to-purple flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-text">New Product</h1>
          <p className="text-xs text-text-tertiary">AI generates descriptions — you control the details</p>
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
                href={publishResult.storeUrl || "/products"}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm inline-flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                View on Store
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
                placeholder="e.g. English Willow Cricket Bat"
              />
              <p className="text-[10px] text-text-tertiary mt-1">You can edit this if the AI gets it wrong</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1.5">Brand *</label>
                <input
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="input-field"
                  placeholder="e.g. SS, Nike, Yonex"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1.5">Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="input-field"
                >
                  <option value="">Select</option>
                  {["Cricket", "Football", "Badminton", "Activewear", "Shoes", "Accessories"].map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1.5">Price (₹)</label>
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="input-field"
                placeholder="e.g. 2,500 – 15,000"
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

          {/* AI Description */}
          <div className="glass rounded-2xl border border-border p-4 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-text">Product Description</h2>
              <button
                onClick={handleGenerate}
                disabled={!productName || !brand || !category || isGenerating}
                className="btn-primary text-xs"
              >
                {isGenerating ? (
                  <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Generating...</>
                ) : (
                  <><Wand2 className="w-3.5 h-3.5" /> Generate Description</>
                )}
              </button>
            </div>

            {/* Streaming */}
            {isGenerating && streamText && (
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-accent/5 border border-accent/10">
                <div className="flex gap-1 mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent typing-dot" />
                  <span className="w-1.5 h-1.5 rounded-full bg-accent typing-dot" />
                  <span className="w-1.5 h-1.5 rounded-full bg-accent typing-dot" />
                </div>
                <p className="text-xs text-text-secondary whitespace-pre-wrap flex-1">{streamText}</p>
              </div>
            )}

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={isGenerating ? "AI is writing..." : "AI-generated description will appear here. You can edit it freely."}
              className="input-field min-h-[180px] resize-y text-sm leading-relaxed"
              readOnly={isGenerating}
            />

            {!description && !isGenerating && (
              <div className="text-center py-6">
                <Wand2 className="w-6 h-6 text-text-tertiary mx-auto mb-2" />
                <p className="text-xs text-text-tertiary">Fill in the product details above, then click &quot;Generate Description&quot;</p>
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
              <p className="text-xs text-text-tertiary mt-0.5">The product will be live on your store immediately</p>
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
