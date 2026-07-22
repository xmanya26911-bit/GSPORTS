
"use client";

import { motion } from "framer-motion";
import { Heart, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function AnimatedCounter({ end, suffix = "", label = "" }: { end: number; suffix?: string; label?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = end / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [end]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-black text-gold-gradient" style={{ fontFamily: "var(--font-playfair)" }}>
        {count}{suffix}
      </div>
      {label && <div className="text-text-muted text-xs mt-2 uppercase tracking-wider">{label}</div>}
    </div>
  );
}

export default function OwnerHighlight() {
  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden bg-premium-dark">
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-accent/3 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/3 rounded-full blur-[120px]" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6 border border-accent/20">
            <Heart className="w-6 h-6 text-accent" />
          </div>
          <span className="text-accent text-xs font-medium uppercase tracking-[0.3em]">Message from Our CEO</span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-text mt-4 mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
            Mr. Imran Ali
          </h2>
          <p className="text-text-muted text-sm md:text-base max-w-2xl mx-auto leading-relaxed mb-8">
            &ldquo;Crafting dreams, one bat at a time. Every piece of willow that leaves our workshop carries the passion of Srinagar&apos;s finest craftsmen.&rdquo;
          </p>
          <div className="text-text-muted text-sm mb-12">
                      Crafting Excellence Since 2010
                    </div>
        </motion.div>

        {/* Counters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-3 gap-6 max-w-2xl mx-auto"
        >
          <div className="glass-card rounded-2xl p-8 py-10">
            <AnimatedCounter end={15} suffix="+" label="Years of Experience" />
          </div>
          <div className="glass-card rounded-2xl p-8 py-10">
            <AnimatedCounter end={10000} suffix="+" label="Happy Customers" />
          </div>
          <div className="glass-card rounded-2xl p-8 py-10">
            <AnimatedCounter end={100} suffix="%" label="Quality Assured" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
