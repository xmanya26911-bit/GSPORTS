"use client";
import { motion } from "framer-motion";
import { STATS } from "@/lib/constants";

function AnimatedCounter({ end, suffix }: { end: number; suffix: string }) {
  return (
    <span className="text-4xl md:text-5xl font-black text-accent-gradient font-display">
      {end}{suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section className="section-padding bg-bg">
      <div className="container-main">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
          {STATS.map((stat) => (
            <div key={stat.label} className="glass-card p-8 text-center">
              <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              <p className="text-text-muted text-sm mt-2">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
