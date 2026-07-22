"use client";

import { motion } from "framer-motion";

const items = [
  { img: "cat-bats.jpg", label: "Premium Bats", desc: "English & Kashmir willow" },
  { img: "cat-gloves.jpg", label: "Batting Gloves", desc: "Pro-grade protection" },
  { img: "cat-kitbags.jpg", label: "Kitbags", desc: "Durable cricket gear bags" },
  { img: "cat-pads.jpg", label: "Pads & Guards", desc: "Complete protection" },
  { img: "cat-keeping.jpg", label: "Wicket-keeping", desc: "Gloves & protective gear" },
  { img: "cat-helmets.jpg", label: "Helmets", desc: "Safety first" },
  { img: "cricket.jpg", label: "Cricket Balls", desc: "Match quality" },
  { img: "cat-bats.jpg", label: "Cricket Accessories", desc: "Everything you need" },
];

export default function GalleryPage() {
  return (
    <div className="pt-28">
      <section className="relative py-20 overflow-hidden bg-premium-dark">
        <div className="absolute inset-0"><img src="/images/cricket.jpg" alt="" className="w-full h-full object-cover opacity-20" /><div className="absolute inset-0 bg-gradient-to-r from-bg-dark via-bg-dark/90 to-bg-dark" /></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="section-label justify-center mb-5" />
            <h1 className="text-4xl md:text-6xl font-black text-text mb-4" style={{ fontFamily: "var(--font-playfair)" }}>Gallery</h1>
            <p className="text-text-muted text-sm max-w-xl mx-auto">Golden Willowe — premium cricket equipment handcrafted in Kashmir.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                className="glass-card rounded-2xl overflow-hidden group">
                <div className="h-52 overflow-hidden"><img src={`/images/${item.img}`} alt={item.label}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" /></div>
                <div className="p-5"><h3 className="font-bold text-text text-sm">{item.label}</h3><p className="text-text-muted text-xs mt-1">{item.desc}</p></div>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="mt-10 glass rounded-3xl p-10 md:p-14 text-center">
            <h3 className="text-2xl font-bold text-text mb-3" style={{ fontFamily: "var(--font-playfair)" }}>See It in Person</h3>
            <p className="text-text-muted text-sm max-w-lg mx-auto mb-6">Visit our workshop in Srinagar to see, touch, and try our complete range of cricket bats and equipment.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="https://maps.google.com/?q=Golden+Willowe+Sports+Srinagar" target="_blank" rel="noopener noreferrer" className="bg-accent text-bg-dark px-6 py-3 rounded-xl text-sm font-semibold hover:bg-accent-light transition-all">Visit Workshop →</a>
              <a href="tel:917889342459" className="glass px-6 py-3 rounded-xl text-sm font-medium text-text-muted hover:text-accent transition-all">Call 7889342459</a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
