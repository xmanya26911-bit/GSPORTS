
"use client";

import { motion } from "framer-motion";
import { Store } from "lucide-react";

const galleryItems = [
  { img: "cricket.jpg", label: "Cricket Collection", desc: "Bats, pads, gloves & more" },
  { img: "football.jpg", label: "Football Gear", desc: "Balls, boots & jerseys" },
  { img: "badminton.jpg", label: "Badminton", desc: "Rackets & shuttlecocks" },
  { img: "activewear.jpg", label: "Activewear", desc: "T-shirts, shorts & tracksuits" },
  { img: "shoes.jpg", label: "Shoe Collection", desc: "Sports shoes for every game" },
  { img: "accessories.jpg", label: "Accessories", desc: "Bags, bottles & caps" },
  { img: "hero-bg.jpg", label: "Premium Brands", desc: "Quality you can trust" },
  { img: "hero-action.jpg", label: "Sports Action", desc: "Gear up for your game" },
  { img: "cricket.jpg", label: "Cricket Specialists", desc: "Serving since 2014" },
];

export default function GalleryPage() {
  return (
    <div className="pt-24">
      <section className="bg-bg border-b border-border-light py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="w-8 h-px bg-accent/50 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-black text-text mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
              Gallery
            </h1>
            <p className="text-text-muted text-sm max-w-xl mx-auto">
              A glimpse into the world of G SPORTS — premium sports gear for every athlete.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-bg">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {galleryItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="glass-card rounded-2xl overflow-hidden group"
              >
                <div className="h-52 overflow-hidden">
                  <img
                    src={`/images/${item.img}`}
                    alt={item.label}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-text text-sm">{item.label}</h3>
                  <p className="text-text-muted text-xs mt-1">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10 bg-bg-dark border border-border rounded-3xl p-8 md:p-12 text-center"
          >
            <Store className="w-8 h-8 text-accent mx-auto mb-4" />
            <h3 className="text-xl font-bold text-text mb-3" style={{ fontFamily: "var(--font-playfair)" }}>
              Experience the Full Collection
            </h3>
            <p className="text-text-muted text-sm max-w-lg mx-auto mb-6">
              Photos can only show so much. Visit G SPORTS in Himatnagar to see, touch, and try our complete range.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="https://maps.google.com/?q=G+SPORTS+Himatnagar" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-accent text-bg-dark px-6 py-3 rounded-xl text-sm font-semibold hover:bg-accent-light transition-all">
                <Store className="w-4 h-4" /> Visit Store
              </a>
              <a href="tel:07405208523" className="inline-flex items-center justify-center gap-2 border border-accent/30 text-accent px-6 py-3 rounded-xl text-sm font-medium hover:bg-accent/10 transition-all">
                Call 074052 08523
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
