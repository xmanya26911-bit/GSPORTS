
"use client";

import { motion } from "framer-motion";
import { Heart, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function AnimatedCounter({ end, suffix = "" }: { end: number; suffix?: string }) {
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
    <div ref={ref} className="text-4xl md:text-5xl font-black text-accent" style={{ fontFamily: "var(--font-playfair)" }}>
      {count}{suffix}
    </div>
  );
}

export default function OwnerHighlight() {
  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-premium-section" />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-accent/3 rounded-full blur-[150px] -translate-x-1/2" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6 border border-accent/20">
            <Heart className="w-6 h-6 text-accent" />
          </div>
          <span className="text-accent text-xs font-medium uppercase tracking-[0.25em]">The Face of G SPORTS</span>
          <h2 className="text-3xl md:text-5xl font-black text-text mt-4 mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
            Ganpatbhai Prajapati
          </h2>
          <p className="text-text-muted text-sm md:text-base max-w-2xl mx-auto leading-relaxed mb-12">
            &ldquo;Your work speaks volumes of the kind of man you are — efficient, organized and result-oriented. 
            The owner Ganpatbhai Prajapati, he&apos;s very humble and kind man.&rdquo;
          </p>
          <div className="flex items-center justify-center gap-1 mb-10">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-accent fill-accent" />
            ))}
            <span className="text-text-muted text-xs ml-2">253 reviews</span>
          </div>
        </motion.div>

        {/* Counters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-3 gap-8 max-w-lg mx-auto"
        >
          {[
            { end: 10, suffix: "+", label: "Years of Service" },
            { end: 10000, suffix: "+", label: "Happy Customers" },
            { end: 300, suffix: "+", label: "Products" },
          ].map((stat) => (
            <div key={stat.label} className="glass-card rounded-xl p-6">
              <AnimatedCounter end={stat.end} suffix={stat.suffix} />
              <div className="text-text-muted text-xs mt-2 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
