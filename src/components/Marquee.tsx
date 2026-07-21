
"use client";

import { motion } from "framer-motion";

const brands = [
  "Cricket", "Football", "Badminton", "Activewear",
  "Cricket", "Football", "Badminton", "Activewear",
];

export default function Marquee() {
  return (
    <section className="relative py-14 overflow-hidden bg-premium-dark border-t border-b border-border">
      {/* Gradient edges */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-bg-dark to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-bg-dark to-transparent z-10" />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="marquee-track flex gap-16 whitespace-nowrap"
      >
        {[...brands, ...brands].map((brand, i) => (
          <span key={i} className="inline-flex items-center gap-16 text-text/10 text-7xl md:text-8xl font-black uppercase tracking-tight select-none"
            style={{ fontFamily: "var(--font-playfair)" }}>
            {brand}
            <span className="w-2 h-2 rounded-full bg-accent/20 inline-block" />
          </span>
        ))}
      </motion.div>
    </section>
  );
}
