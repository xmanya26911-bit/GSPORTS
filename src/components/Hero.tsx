
"use client";

import { motion } from "framer-motion";
import { ChevronRight, Star } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-action.jpg"
          alt="Sports equipment background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-dark/95 via-bg-dark/85 to-bg-dark/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/50 to-transparent" />
      </div>

      {/* Subtle gold overlay */}
      <div className="absolute inset-0 bg-accent/5 mix-blend-overlay" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center py-32">
          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 border border-accent/20 rounded-full px-4 py-1.5 mb-8"
            >
              <Star className="w-3.5 h-3.5 text-accent fill-accent" />
              <span className="text-text-muted text-xs tracking-widest uppercase font-medium">4.7★ &middot; 253 Reviews</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-text leading-[1.05] tracking-tight mb-6"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Your Premier
              <br />
              <span className="text-gold-gradient">Sports Destination</span>
              <br />
              in Himatnagar
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-text-muted text-base md:text-lg max-w-lg leading-relaxed mb-10"
            >
              From cricket bats to football boots, badminton rackets to premium activewear — 
              everything for the athlete. Family-owned, trusted by thousands.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              <Link
                href="/products"
                className="group inline-flex items-center gap-2 bg-accent text-bg-dark px-8 py-3.5 rounded-xl text-sm font-bold tracking-wide hover:bg-accent-light transition-all duration-500 hover:shadow-xl hover:shadow-accent/20"
              >
                Explore Collection
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="tel:07405208523"
                className="inline-flex items-center gap-2 border border-accent/30 text-accent px-8 py-3.5 rounded-xl text-sm font-medium hover:bg-accent/10 transition-all duration-500"
              >
                Call Us
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center gap-6 mt-12"
            >
              {["Genuine Products", "Fair Prices", "Expert Advice"].map((text) => (
                <div key={text} className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-accent" />
                  <span className="text-text-muted/60 text-xs tracking-wide">{text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right - Product Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-accent/5 rounded-[3rem] blur-3xl" />
              <div className="relative glass rounded-[2rem] p-2 w-80">
                <img
                  src="/images/hero-bg.jpg"
                  alt="Sports equipment"
                  className="w-full h-64 object-cover rounded-[1.75rem]"
                />
                <div className="p-6 text-center">
                  <h3 className="text-text text-xl font-bold mb-1" style={{ fontFamily: "var(--font-playfair)" }}>
                    Premium Quality
                  </h3>
                  <p className="text-text-muted text-sm">Cricket • Football • Badminton</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-bg to-transparent" />
    </section>
  );
}
