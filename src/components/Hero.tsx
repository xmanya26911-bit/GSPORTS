
"use client";

import { motion } from "framer-motion";
import { ChevronDown, Star, MapPin, Phone } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-premium-dark">
      {/* Ken Burns Background */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-action.jpg"
          alt=""
          className="w-full h-full object-cover animate-ken-burns opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-dark/95 via-bg-dark/75 to-bg-dark/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/60 to-transparent" />
      </div>

      {/* Gold Orbs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-accent/3 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />

      {/* Floating Decorative Elements */}
      <div className="absolute top-32 left-[15%] w-px h-32 bg-gradient-to-b from-accent/30 to-transparent hidden lg:block" />
      <div className="absolute bottom-40 right-[20%] w-px h-24 bg-gradient-to-t from-accent/20 to-transparent hidden lg:block" />
      <div className="absolute top-1/3 right-[12%] w-3 h-3 border border-accent/30 rounded-full animate-float-slow hidden lg:block" />
      <div className="absolute bottom-1/3 left-[10%] w-2 h-2 bg-accent/20 rounded-full animate-float hidden lg:block" style={{ animationDelay: "2s" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-20 items-center py-36">
          {/* Left Content */}
          <div>
            {/* Rating Badge */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-3 glass rounded-full px-5 py-2 mb-10"
            >
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${i < 5 ? "text-accent fill-accent" : "text-border"}`}
                  />
                ))}
              </div>
              <span className="text-text-muted text-xs tracking-wider">4.7 &middot; 253 reviews</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-text leading-[0.95] tracking-tight mb-6"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Your
              <br />
              <span className="text-gold-gradient">Premier</span>
              <br />
              Sports Destination
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-text-muted text-base md:text-lg max-w-lg leading-relaxed mb-10"
            >
              From cricket bats to football boots — premium sports equipment, 
              expert guidance, and the warmth of family. Trusted by Himatnagar since 2014.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              <Link
                href="/products"
                className="group relative inline-flex items-center gap-2 bg-accent text-bg-dark px-8 py-4 rounded-xl text-sm font-bold tracking-wide overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-accent/20"
              >
                <span className="relative z-10">Explore Collection</span>
                <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">→</span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent-light to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>
              <a
                href="tel:07405208523"
                className="group inline-flex items-center gap-2 glass rounded-xl px-8 py-4 text-sm font-medium text-text-muted hover:text-accent hover:border-accent/30 transition-all duration-300"
              >
                <Phone className="w-4 h-4 group-hover:text-accent transition-colors" />
                074052 08523
              </a>
            </motion.div>

            {/* Quick Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap items-center gap-6 mt-12"
            >
              <div className="flex items-center gap-2 text-text-muted/50 text-xs">
                <MapPin className="w-3 h-3 text-accent/70" />
                Himatnagar, Gujarat
              </div>
              <div className="w-px h-3 bg-border" />
              <span className="text-text-muted/50 text-xs">300+ Products</span>
              <div className="w-px h-3 bg-border" />
              <span className="text-text-muted/50 text-xs">Family Owned</span>
            </motion.div>
          </div>

          {/* Right - Premium Showcase Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative perspective-[2000px]">
              <div className="absolute -inset-6 bg-gradient-to-br from-accent/10 via-transparent to-accent/5 rounded-[3rem] blur-3xl" />
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative glass rounded-[2.5rem] overflow-hidden"
                style={{ transform: "rotateY(-5deg)" }}
              >
                <div className="relative h-72 overflow-hidden">
                  <img
                    src="/images/hero-bg.jpg"
                    alt="Premium sports equipment"
                    className="w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-[2s]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/60 via-transparent to-transparent" />
                </div>
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-text text-xl font-bold" style={{ fontFamily: "var(--font-playfair)" }}>
                        Premium Quality
                      </h3>
                      <p className="text-text-muted/70 text-sm mt-1">Cricket · Football · Badminton</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center border border-accent/30">
                      <Star className="w-4 h-4 text-accent fill-accent" />
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4 border-t border-border">
                    {["Genuine", "Quality", "Value"].map((t) => (
                      <span key={t} className="text-[11px] text-text-muted/50 uppercase tracking-wider">{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-text-muted/30 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4 text-accent/50 animate-scroll" />
      </motion.div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg via-bg/50 to-transparent" />
    </section>
  );
}
