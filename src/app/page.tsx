import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { StatsSection } from "@/components/home/StatsSection";
import { ProductSlider } from "@/components/home/ProductSlider";
import { OwnerSection } from "@/components/home/OwnerSection";
import { ReelsSection } from "@/components/home/ReelsSection"
import { GallerySection } from "@/components/home/GallerySection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <ProductSlider title="Premium Cricket Bats" />
      <OwnerSection />
      <GallerySection />
      <ReelsSection />
    </>
  );
}
