import Image from "next/image";
import { resolveProductImage } from "@/lib/products";

interface ProductImageProps {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
}

/**
 * Product images come from the catalog as either local `/images/*.png`
 * references (mapped to the optimized `.webp` files shipped in the repo) or
 * remote Vercel Blob URLs (optimized at the edge by next/image).
 */
export function ProductImage({ src, alt, sizes, className, priority }: ProductImageProps) {
  return (
    <Image
      src={resolveProductImage(src)}
      alt={alt}
      fill
      sizes={sizes}
      className={className}
      priority={priority}
      draggable={false}
    />
  );
}