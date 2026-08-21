"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { OWNER_NAME } from "@/lib/constants";

export function OwnerSection() {
  return (
    <section className="section-padding bg-bg-alt">
      <div className="container-main">
        <div className="grid md:grid-cols-2 gap-10 items-center max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p className="section-label justify-start">Meet the Maker</p>
            <h2 className="text-3xl md:text-4xl font-black text-text font-display mt-3 mb-4">{OWNER_NAME}</h2>
            <p className="text-text-muted text-base leading-relaxed mb-6">
              15+ years of bat-making mastery. Every bat from Golden Willowe carries his personal touch and commitment to perfection.
            </p>
            <p className="italic text-text-muted text-sm border-l-2 border-accent pl-4">
              &ldquo;Crafting dreams, one bat at a time.&rdquo;
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-border">
              <Image src="/images/ceo-imran-ali.webp" alt={OWNER_NAME} fill sizes="(min-width: 768px) 50vw, 90vw" className="object-cover object-center" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-accent/10 rounded-2xl border border-accent/20 flex items-center justify-center -z-10">
              <span className="text-accent font-black font-display text-2xl">GW</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
