
"use client";

import { motion } from "framer-motion";
import { Heart, Shield, Star, Users, Award } from "lucide-react";
import Link from "next/link";

const values = [
  { icon: Heart, title: "Customer First", desc: "Every customer is family. We listen, advise honestly, and never push unnecessary purchases." },
  { icon: Shield, title: "Quality Guaranteed", desc: "Only genuine, branded products. We personally verify every item before it hits our shelves." },
  { icon: Star, title: "Best Prices", desc: "Fair pricing with no hidden costs. Sports gear should be accessible to everyone." },
  { icon: Users, title: "Expert Guidance", desc: "Ganpatbhai and team know sports inside out. Let us help you find the perfect gear." },
];

const timeline = [
  { year: "2014", event: "G SPORTS founded in Himatnagar" },
  { year: "2016", event: "Expanded to cricket equipment & activewear" },
  { year: "2018", event: "Became go-to sports store in Sabarkantha" },
  { year: "2020", event: "Served 5000+ customers, 4.7★ rating" },
  { year: "2024", event: "10+ years of serving Himatnagar with pride" },
];

export default function AboutPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/hero-bg.jpg" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-bg-dark/95 via-bg-dark/90 to-bg-dark/80" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="w-8 h-px bg-accent/50 mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-black text-text mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
              About G SPORTS
            </h1>
            <p className="text-text-muted text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
              Himatnagar&apos;s most trusted sports destination — built on passion, 
              powered by kindness, and driven by a love for the game.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-bg-alt">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="w-8 h-px bg-accent/50 mb-6" />
              <span className="text-accent text-xs font-medium uppercase tracking-[0.25em]">Our Story</span>
              <h2 className="text-3xl md:text-4xl font-black text-primary-dark mt-4 mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
                A Decade of Serving
                <br /><span className="text-gold-gradient">Himatnagar&apos;s Athletes</span>
              </h2>
              <div className="space-y-4 text-text-body text-sm leading-relaxed">
                <p>What started as a small sports equipment shop has grown into Himatnagar&apos;s premier sports destination. G SPORTS was founded by <strong className="text-primary-dark">Ganpatbhai Prajapati</strong> with a simple mission: make quality sports gear accessible to every athlete in the region.</p>
                <p>Over the years, we&apos;ve served thousands of customers — from school children buying their first cricket bat to professional athletes. Our shelves now hold over 300 products across cricket, football, badminton, activewear, and accessories.</p>
                <p>What truly sets us apart isn&apos;t the range — it&apos;s the warmth. Ganpatbhai&apos;s philosophy: treat every customer like family, give honest advice, and never compromise on quality.</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="glass rounded-2xl p-8">
                <h3 className="font-bold text-text text-lg mb-6" style={{ fontFamily: "var(--font-playfair)" }}>Our Journey</h3>
                <div className="space-y-5">
                  {timeline.map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-9 h-9 rounded-full bg-accent/20 text-accent flex items-center justify-center font-bold text-xs shrink-0 border border-accent/30">{item.year.slice(2)}</div>
                        {i < timeline.length - 1 && <div className="w-px h-8 bg-border-light" />}
                      </div>
                      <div className="pt-2">
                        <span className="text-accent font-semibold text-xs">{item.year}</span>
                        <p className="text-text-muted text-sm">{item.event}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Image */}
              <div className="mt-6 rounded-2xl overflow-hidden border border-border">
                <img src="/images/cricket.jpg" alt="Cricket equipment at G SPORTS" className="w-full h-48 object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-bg">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <div className="w-8 h-px bg-accent/50 mx-auto mb-6" />
            <span className="text-accent text-xs font-medium uppercase tracking-[0.25em]">Our Values</span>
            <h2 className="text-3xl md:text-4xl font-black text-text mt-4" style={{ fontFamily: "var(--font-playfair)" }}>What Drives Us</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {values.map((val, i) => (
              <motion.div key={val.title} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="glass-card rounded-2xl p-6 md:p-7 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 border border-accent/20"><val.icon className="w-5 h-5 text-accent" /></div>
                <div><h3 className="font-bold text-text text-sm mb-1">{val.title}</h3><p className="text-text-muted text-xs leading-relaxed">{val.desc}</p></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Owner */}
      <section className="section-padding bg-bg-alt text-center">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6 border border-accent/20"><Heart className="w-5 h-5 text-accent" /></div>
            <h2 className="text-3xl md:text-4xl font-black text-primary-dark mb-5" style={{ fontFamily: "var(--font-playfair)" }}>Meet the Man Behind the Store</h2>
            <p className="text-text-body text-sm max-w-2xl mx-auto leading-relaxed mb-8">Ganpatbhai Prajapati isn&apos;t just a shopkeeper — he&apos;s a mentor, a guide, and a friend to every customer. With over a decade of experience in sports retail, his recommendations come from genuine expertise and care.</p>
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
              <div className="glass-card rounded-xl p-5"><div className="text-2xl font-black text-accent">10+</div><div className="text-text-muted text-xs mt-1">Years</div></div>
              <div className="glass-card rounded-xl p-5"><div className="text-2xl font-black text-accent">10K+</div><div className="text-text-muted text-xs mt-1">Customers</div></div>
              <div className="glass-card rounded-xl p-5"><div className="text-2xl font-black text-accent">4.7★</div><div className="text-text-muted text-xs mt-1">Rating</div></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-bg border-t border-border-light py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl font-bold text-text mb-4" style={{ fontFamily: "var(--font-playfair)" }}>Ready to Gear Up?</h2>
            <p className="text-text-muted text-sm mb-8">Visit us or call — we&apos;d love to help you find the perfect sports gear.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/contact" className="bg-accent text-bg-dark px-8 py-3 rounded-xl text-sm font-semibold hover:bg-accent-light transition-all">Find Us</Link>
              <a href="tel:07405208523" className="border border-accent/30 text-accent px-8 py-3 rounded-xl text-sm font-medium hover:bg-accent/10 transition-all">Call Now</a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
