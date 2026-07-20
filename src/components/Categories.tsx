
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const categories = [
  { title: "Cricket", img: "cricket.jpg", desc: "Bats, balls, pads, gloves & full kit", items: 50 },
  { title: "Football", img: "football.jpg", desc: "Shoes, jerseys, balls & goalkeeper gear", items: 30 },
  { title: "Badminton", img: "badminton.jpg", desc: "Rackets, shuttlecocks, nets & court shoes", items: 25 },
  { title: "Activewear", img: "activewear.jpg", desc: "T-shirts, shorts, tracksuits, gym wear", items: 100 },
  { title: "Sports Shoes", img: "shoes.jpg", desc: "Running, training, cricket & casual", items: 60 },
  { title: "Accessories", img: "accessories.jpg", desc: "Bags, caps, bottles, protection gear", items: 40 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function Categories() {
  return (
    <section className="section-padding bg-bg" id="categories">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <div className="w-8 h-px bg-accent/50 mx-auto mb-6" />
          <span className="text-accent text-xs font-medium uppercase tracking-[0.25em]">Collections</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-text mt-4 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
            Everything for Your Game
          </h2>
          <p className="text-text-muted max-w-xl mx-auto text-sm leading-relaxed">
            From cricket to football, badminton to gym wear — we stock 300+ products across every major sport.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
        >
          {categories.map((cat) => (
            <motion.div
              key={cat.title}
              variants={itemVariants}
              className="glass-card rounded-2xl overflow-hidden group"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={`/images/${cat.img}`}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-5">
                  <span className="text-xs text-accent font-medium bg-bg-dark/60 backdrop-blur-sm px-3 py-1 rounded-full border border-accent/20">
                    {cat.items}+ items
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 md:p-6">
                <h3 className="text-lg font-bold text-text mb-2">{cat.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed mb-4">{cat.desc}</p>
                <Link
                  href={`/products#${cat.title.toLowerCase()}`}
                  className="inline-flex items-center gap-1.5 text-accent text-xs font-medium tracking-wide hover:text-accent-light transition-colors group/link"
                >
                  Browse Collection
                  <ChevronRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
