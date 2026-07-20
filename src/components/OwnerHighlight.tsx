
"use client";

import { motion } from "framer-motion";
import { Heart, Award, Users, ThumbsUp } from "lucide-react";

export default function OwnerHighlight() {
  return (
    <section className="section-padding bg-bg-alt relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="w-8 h-px bg-accent/50 mb-6" />
            <span className="text-accent text-xs font-medium uppercase tracking-[0.25em]">The Owner</span>
            <h2 className="text-3xl md:text-4xl font-black text-primary-dark mt-4 mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
              Meet{" "}
              <span className="text-gold-gradient">Ganpatbhai Prajapati</span>
            </h2>
            <p className="text-text-body text-sm md:text-base leading-relaxed mb-6">
              Behind every great store is a great person. Ganpatbhai Prajapati — the heart 
              and soul of G SPORTS — is known across Himatnagar for his humble nature, 
              expert advice, and genuine care for every customer.
            </p>
            <p className="text-text-body/70 text-sm leading-relaxed mb-8 italic">
              &ldquo;Your work speaks volumes of the kind of man you are&rdquo;
              <span className="block text-text-muted/50 text-xs mt-1 not-italic">— mayank prajapati, Google Review</span>
            </p>

            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Heart, label: "Kind & Humble", desc: "Loved by customers" },
                { icon: Award, label: "10+ Years", desc: "Serving Himatnagar" },
                { icon: Users, label: "10K+ Customers", desc: "And counting" },
                { icon: ThumbsUp, label: "Expert Advice", desc: "Always honest" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3 bg-white rounded-xl p-4 border border-accent/5">
                  <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <div className="font-semibold text-primary-dark text-xs">{item.label}</div>
                    <div className="text-text-muted text-[11px]">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right - Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="bg-bg-dark border border-border rounded-3xl p-8 md:p-10">
              <h3 className="text-text text-xl font-bold mb-8" style={{ fontFamily: "var(--font-playfair)" }}>
                Why G SPORTS
              </h3>
              <div className="space-y-6">
                {[
                  { stat: "4.7★", label: "Google Rating", sub: "253+ reviews" },
                  { stat: "300+", label: "Products", sub: "Across all sports" },
                  { stat: "10+ Years", label: "Experience", sub: "Serving Himatnagar" },
                  { stat: "100%", label: "Authentic", sub: "Genuine products only" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between border-b border-border-light pb-5 last:border-0 last:pb-0">
                    <div>
                      <div className="text-text text-2xl font-black">{item.stat}</div>
                      <div className="text-text-muted/60 text-xs mt-0.5">{item.sub}</div>
                    </div>
                    <span className="text-accent text-xs uppercase tracking-widest font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
