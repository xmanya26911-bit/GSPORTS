"use client";

import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Categories from "@/components/Categories";
import OwnerHighlight from "@/components/OwnerHighlight";
import Testimonials from "@/components/Testimonials";
import Location from "@/components/Location";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Categories />
      <OwnerHighlight />
      <Testimonials />
      <Location />
    </>
  );
}
