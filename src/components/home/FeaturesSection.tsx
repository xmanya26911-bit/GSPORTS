"use client";
import { motion } from "framer-motion";
import { FEATURES } from "@/lib/constants";
import { Trophy, Zap, Hammer, Shield } from "lucide-react";

const icons = [Trophy, Zap, Hammer, Shield];

export function FeaturesSection() {
  return (
    <section className="section-padding bg-bg-alt">
      <div className="container-main">
        <div className="text-center mb-12">
          <p className="section-label">Why Golden Willowe</p>
          <h2 className="text-3xl md:text-4xl font-black text-text font-display mt-3">Crafted for Champions</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature, i) => {
            const Icon = icons[i];
            return (
              <motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-card p-6 md:p-8 text-center">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-bold text-text text-lg mb-2">{feature.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
