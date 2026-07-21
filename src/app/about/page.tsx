
"use client";

import { motion } from "framer-motion";
import { Heart, Shield, Star, Users, Award, ChevronRight } from "lucide-react";
import Link from "next/link";

const values = [
  { icon: Heart, title: "Customer First", desc: "Every customer is family. We advise honestly, never push unnecessary purchases." },
  { icon: Shield, title: "Quality Guaranteed", desc: "Only genuine, branded products verified before they hit our shelves." },
  { icon: Star, title: "Best Prices", desc: "Fair pricing with no hidden costs. Sports gear for everyone." },
  { icon: Users, title: "Expert Guidance", desc: "Ganpatbhai knows sports inside out. Let us help you find the perfect gear." },
];

const timeline = [
  { year: "2014", event: "G SPORTS founded in Himatnagar" },
  { year: "2016", event: "Expanded cricket & activewear" },
  { year: "2018", event: "Became Sabarkantha's go-to sports store" },
  { year: "2020", event: "5000+ customers — 4.7★ rating" },
  { year: "2024", event: "10+ years of serving with pride" },
];

export default function AboutPage() {
  return (
    <div className="pt-28">
      {/* Hero Image Section */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <div className="absolute inset-0"><img src="/images/hero-bg.jpg" alt="" className="w-full h-full object-cover" /><div className="absolute inset-0 bg-gradient-to-r from-bg-dark/90 via-bg-dark/80 to-bg-dark/60" /></div>
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-transparent" />
        <div className="relative z-10 h-full flex items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="section-label mb-5" />
            <h1 className="text-4xl md:text-7xl font-black text-text" style={{ fontFamily: "var(--font-playfair)" }}>
              About G SPORTS
            </h1>
            <p className="text-text-muted text-sm md:text-base max-w-xl mt-4 leading-relaxed">
              Himatnagar&apos;s most trusted sports destination — built on passion, powered by kindness.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-28 px-4 sm:px-6 lg:px-8 bg-premium-section">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="section-label mb-5">Our Story</div>
              <h2 className="text-3xl md:text-5xl font-black text-text mt-3 mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
                A Decade of Serving<br /><span className="text-gold-gradient">Himatnagar&apos;s Athletes</span>
              </h2>
              <div className="space-y-4 text-text-muted text-sm leading-relaxed">
                <p>Founded by <strong className="text-text">Ganpatbhai Prajapati</strong> with a simple mission: make quality sports gear accessible to every athlete in the region.</p>
                <p>From school children buying their first cricket bat to professional athletes — over 10,000 customers served, 300+ products, and still growing.</p>
                <p>What sets us apart isn&apos;t the range — it&apos;s the warmth. Treat every customer like family, give honest advice, never compromise on quality.</p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="glass rounded-2xl p-8 mb-6">
                <h3 className="font-bold text-text text-lg mb-6" style={{ fontFamily: "var(--font-playfair)" }}>Our Journey</h3>
                <div className="space-y-5">
                  {timeline.map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center font-bold text-xs shrink-0 border border-accent/30 text-accent">{item.year.slice(2)}</div>
                        {i < timeline.length - 1 && <div className="w-px h-8 bg-border" />}
                      </div>
                      <div className="pt-2"><span className="text-accent font-semibold text-xs">{item.year}</span><p className="text-text-muted text-sm">{item.event}</p></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden border border-border"><img src="/images/cricket.jpg" alt="Cricket equipment" className="w-full h-48 object-cover" /></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-28 px-4 sm:px-6 lg:px-8 bg-premium-dark">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <div className="section-label justify-center mb-5" />
            <h2 className="text-3xl md:text-5xl font-black text-text" style={{ fontFamily: "var(--font-playfair)" }}>What Drives Us</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {values.map((val, i) => (
              <motion.div key={val.title} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="glass-card rounded-2xl p-6 md:p-7 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 border border-accent/20"><val.icon className="w-5 h-5 text-accent" /></div>
                <div><h3 className="font-bold text-text text-sm mb-1">{val.title}</h3><p className="text-text-muted text-xs leading-relaxed">{val.desc}</p></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Owner */}
      <section className="py-28 px-4 sm:px-6 lg:px-8 text-center bg-premium-section">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6 border border-accent/20"><Heart className="w-6 h-6 text-accent" /></div>
            <h2 className="text-3xl md:text-5xl font-black text-text mb-5" style={{ fontFamily: "var(--font-playfair)" }}>Meet the Man Behind the Store</h2>
            <p className="text-text-muted text-sm max-w-2xl mx-auto leading-relaxed mb-8">Ganpatbhai Prajapati isn&apos;t just a shopkeeper — he&apos;s a mentor, a guide, and a friend to every customer. His recommendations come from genuine expertise and care.</p>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-accent text-bg-dark px-6 py-3 rounded-xl text-sm font-semibold hover:bg-accent-light transition-all">Visit the Store <ChevronRight className="w-4 h-4" /></Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
