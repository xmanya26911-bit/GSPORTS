"use client";
import { motion } from "framer-motion";
import { ChevronDown, Star, Phone } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const headlineWords = ["Crafting", "Excellence", "in Every Bat"];

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-primary">
      {/* Stadium Background */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-stadium.jpg"
          alt="Cricket stadium at night"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/70 via-primary/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
      </div>

      <div className="container-main relative z-10">
        <div className="flex items-center min-h-[85vh] py-20">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex items-center gap-2 mb-8">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (<Star key={i} className="w-3.5 h-3.5 text-accent fill-accent" />))}
              </div>
              <span className="text-white/60 text-xs tracking-wider">100% · Quality Assured</span>
            </motion.div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[1.0] tracking-[-0.02em] mb-6">
              {headlineWords.map((word, i) => (
                <span key={word} className="block">
                  <motion.span initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className={i === 1 ? "text-accent-gradient" : ""}>
                    {word}
                  </motion.span>
                </span>
              ))}
              <span className="block mt-2">
                <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.6 }} className="text-base md:text-lg font-body font-normal text-white/50 tracking-normal">
                  in Srinagar, Kashmir
                </motion.span>
              </span>
            </h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }} className="text-white/60 text-base md:text-lg max-w-lg leading-relaxed mb-10">
              Premium English &amp; Kashmir willow bats, handcrafted with precision. Factory-direct pricing — no middlemen, just pure quality.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6 }} className="flex flex-col sm:flex-row items-center gap-4">
              <Link href="/products">
                <Button variant="primary" size="lg" className="bg-accent text-white hover:bg-accent-dark">
                  Explore Collection
                </Button>
              </Link>
              <a href="tel:917889342459" className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 text-sm font-medium text-white/70 hover:text-white hover:border-white/40 transition-all">
                <Phone className="w-4 h-4" /> 7889342459
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="flex items-center gap-6 mt-16">
              <span className="text-white/30 text-xs">Srinagar, Kashmir</span>
              <span className="w-px h-3 bg-white/20" />
              <span className="text-white/30 text-xs">10k+ Happy Customers</span>
              <span className="w-px h-3 bg-white/20" />
              <span className="text-white/30 text-xs">Family Owned Since 2010</span>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-white/20 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4 text-accent/40 animate-bounce" />
      </motion.div>
    </section>
  );
}
