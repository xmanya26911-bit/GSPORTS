import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { StatsSection } from "@/components/home/StatsSection";
import { ProductSlider } from "@/components/home/ProductSlider";
import { OwnerSection } from "@/components/home/OwnerSection";
import { ReelsSection } from "@/components/home/ReelsSection";
import { GallerySection } from "@/components/home/GallerySection";
import { getCachedProducts } from "@/lib/products";
import { getCachedReels } from "@/lib/reels";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [products, reels] = await Promise.all([getCachedProducts(), getCachedReels()]);

  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <ProductSlider title="Premium Cricket Bats" products={products} />
      <OwnerSection />
      <GallerySection />
      <ReelsSection reels={reels} />
    </>
  );
}