"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { OWNER_NAME, WHATSAPP_URL, SITE_NAME } from "@/lib/constants";

const timeline = [
  { year: "2010", event: "Golden Willowe founded in Srinagar, Kashmir" },
  { year: "2013", event: "Expanded to English willow bats" },
  { year: "2016", event: "Became India's premier bat maker" },
  { year: "2020", event: "Worldwide recognition for quality" },
];

const values = [
  { title: "Premium Willow", desc: "Hand-selected English and Kashmir willow from the finest groves." },
  { title: "Factory Direct", desc: "No middlemen. We manufacture and sell directly at competitive prices." },
  { title: "Expert Craftsmanship", desc: "15+ years of bat-making experience. Every bat personally overseen." },
  { title: "100% Quality", desc: "Every bat meets strict quality standards. Balanced and performance-tested." },
];

export default function AboutPage() {
  return (
    <div className="container-main pt-10 pb-24 lg:pb-10">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl md:text-4xl font-black text-text font-display mb-4">About {SITE_NAME}</h1>
          <p className="text-text-muted text-lg mb-8">India&apos;s premier cricket bat manufacturer — handcrafting excellence since 2010.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 mb-12">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-xl font-bold text-text font-display mb-4">Our Story</h2>
            <div className="space-y-4 text-text-muted text-sm leading-relaxed">
              <p>{SITE_NAME} Sports was born in the heart of Srinagar, Kashmir — a region with a rich heritage of craftsmanship. Founded by {OWNER_NAME}, our mission has always been simple: create the finest cricket bats in the world.</p>
              <p>From humble beginnings in a small workshop, we have grown into a brand trusted by cricketers across India and beyond. Every bat is handcrafted using premium English and Kashmir willow, selected for its grain structure and performance potential.</p>
              <p>We believe in factory-direct pricing — no middlemen, no markups. Just pure quality at the most competitive prices.</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="glass-card p-6">
              <h3 className="font-bold text-text font-display mb-4">Our Journey</h3>
              <div className="space-y-4">
                {timeline.map((item) => (
                  <div key={item.year} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-accent">{item.year.slice(2)}</span>
                    </div>
                    <div className="pt-1.5">
                      <p className="text-sm font-bold text-text">{item.year}</p>
                      <p className="text-xs text-text-muted">{item.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* CEO Photo */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div className="rounded-2xl overflow-hidden border border-border relative h-[400px]">
              <Image src="/images/ceo-imran-ali.webp" alt={OWNER_NAME} fill sizes="(min-width: 768px) 50vw, 90vw" className="object-cover object-center" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-text font-display mb-2">Meet the Craftsman</h2>
              <p className="text-text-muted text-sm leading-relaxed mb-3">{OWNER_NAME} — 15+ years of bat-making mastery. Every bat from {SITE_NAME} carries his personal touch and commitment to perfection.</p>
              <p className="italic text-text-muted text-sm border-l-2 border-accent pl-3">&ldquo;Crafting dreams, one bat at a time.&rdquo;</p>
            </div>
          </div>
        </motion.div>

        {/* Values */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-2xl font-bold text-text font-display text-center mb-6">Why Choose Us</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {values.map((v) => (
              <div key={v.title} className="glass-card p-5">
                <h3 className="font-bold text-text text-sm mb-1">{v.title}</h3>
                <p className="text-text-muted text-xs leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <div className="text-center mt-12 p-8 bg-bg-alt rounded-2xl border border-border">
          <h2 className="text-2xl font-bold text-text font-display mb-3">Your Next Match-Winner Awaits</h2>
          <p className="text-text-muted text-sm mb-6">Handcrafted, tested, and truly premium.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/products"><Button variant="primary" size="lg">Shop Now</Button></Link>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"><Button variant="outline" size="lg">Order on WhatsApp</Button></a>
          </div>
        </div>
      </div>
    </div>
  );
}
