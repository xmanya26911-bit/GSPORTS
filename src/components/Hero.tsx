
"use client";

import { motion } from "framer-motion";
import { ChevronDown, Star, Phone } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-premium-dark noise-overlay">
      {/* Ken Burns Background */}
      <div className="absolute inset-0">
        <img src="/images/hero-cricket-bg.jpg" alt="Cricket stadium at golden hour" className="w-full h-full object-cover animate-ken-burns opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-dark/95 via-bg-dark/70 to-bg-dark/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/60 to-transparent" />
      </div>

      {/* Ambient Orbs */}
      <div className="absolute top-1/3 right-1/3 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px] animate-pulse-glow" />
      <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-accent/3 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: "2s" }} />

      {/* Decorative lines */}
      <div className="absolute top-40 left-[12%] w-px h-40 bg-gradient-to-b from-accent/20 to-transparent hidden lg:block" />
      <div className="absolute bottom-40 right-[15%] w-px h-28 bg-gradient-to-t from-accent/15 to-transparent hidden lg:block" />
      <div className="absolute top-1/2 right-[10%] w-3 h-3 border border-accent/30 rounded-full animate-float-slow hidden lg:block" />
      <div className="absolute bottom-1/3 left-[8%] w-2 h-2 bg-accent/20 rounded-full animate-float hidden lg:block" style={{ animationDelay: "2.5s" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center min-h-screen py-36">
          <div className="max-w-3xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-3 glass rounded-full px-5 py-2 mb-10"
            >
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 text-accent fill-accent" />
                ))}
              </div>
              <span className="text-text-muted text-xs tracking-wider">100% · Quality Assured</span>
            </motion.div>

            {/* Split Text Headline */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-text leading-[1.0] tracking-[-0.01em] mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
              {/* Crafting alone on line 1 */}
              <span className="reveal-text block">
                <motion.span
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  Crafting
                </motion.span>
              </span>
              {/* Excellence in Every Bat on line 2 */}
              <span className="reveal-text block">
                <motion.span
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="text-gold-gradient">Excellence</span>
                  {" "}in Every Bat
                </motion.span>
              </span>
              <span className="block mt-2">
                <span className="reveal-text">
                  <motion.span
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.65, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-base md:text-lg font-sans font-normal text-text-muted tracking-normal"
                  >
                    in Srinagar, Kashmir
                  </motion.span>
                </span>
              </span>
            </h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-text-muted text-base md:text-lg max-w-lg leading-relaxed mb-10"
            >
              Premium English & Kashmir willow bats, handcrafted with precision. 
                            Factory-direct pricing — no middlemen, just pure quality.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              <Link
                href="/products"
                className="group relative inline-flex items-center gap-2 bg-accent text-bg-dark px-8 py-4 rounded-xl text-sm font-bold tracking-wide overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-accent/20 interactive"
              >
                <span className="relative z-10">Explore Collection</span>
                <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">→</span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent-light to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>
              <a
                href="tel:917889342459"
                className="group inline-flex items-center gap-2 glass rounded-xl px-8 py-4 text-sm font-medium text-text-muted hover:text-accent hover:border-accent/30 transition-all duration-300 interactive"
              >
                <Phone className="w-4 h-4" />
                7889342459</a>
            </motion.div>

            {/* Bottom info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex items-center gap-6 mt-14"
            >
              <span className="text-text-muted/40 text-xs">Srinagar, Kashmir</span>
                            <span className="w-px h-3 bg-border" />
                            <span className="text-text-muted/40 text-xs">10k+ Happy Customers</span>
                            <span className="w-px h-3 bg-border" />
                            <span className="text-text-muted/40 text-xs">Family Owned Since 2010</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-text-muted/20 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4 text-accent/40 animate-scroll" />
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg via-bg/50 to-transparent" />
    </section>
  );
}
