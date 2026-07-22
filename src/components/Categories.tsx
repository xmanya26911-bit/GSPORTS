
"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useRef } from "react";

const cats = [
  { title: "Premium Bats", img: "cricket.jpg", desc: "English &amp; Kashmir willow bats, handcrafted with precision.", count: "20+" },
  { title: "Batting Gloves", img: "cricket.jpg", desc: "Professional-grade gloves for all levels.", count: "15+" },
  { title: "Kitbags", img: "cricket.jpg", desc: "Durable kitbags for your cricket gear.", count: "10+" },
  { title: "Keeping Gloves", img: "cricket.jpg", desc: "Wicket-keeping gloves, pro series.", count: "12+" },
  { title: "Pads &amp; Guards", img: "cricket.jpg", desc: "Leg guards, thighpads &amp; arm guards.", count: "20+" },
  { title: "Helmets", img: "cricket.jpg", desc: "Premium protective helmets, all sizes.", count: "10+" },
];

function TiltCard({ cat, i }: { cat: typeof cats[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-8, 8]);

  function handleMouse(e: React.MouseEvent) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px);
    y.set(py);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1500 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouse}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="glass-card rounded-2xl overflow-hidden group cursor-pointer"
      >
        {/* Image */}
        <div className="relative h-52 overflow-hidden" style={{ transform: "translateZ(20px)" }}>
          <img
            src={`/images/${cat.img}`}
            alt={cat.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 via-transparent to-transparent" />
          <div className="absolute top-4 left-4">
            <span className="text-[11px] text-accent font-medium bg-bg-dark/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-accent/20">
              {cat.count} items
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-7">
          <h3
            className="text-xl font-bold text-text mb-2 group-hover:text-accent transition-colors duration-300"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {cat.title}
          </h3>
          <p className="text-text-muted text-sm leading-relaxed mb-5">{cat.desc}</p>
          <Link
            href={`/products#${cat.title.toLowerCase()}`}
            className="inline-flex items-center gap-1.5 text-xs font-medium tracking-wide text-text-muted group-hover:text-accent transition-colors duration-300"
          >
            Browse Collection
            <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Categories() {
  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden bg-premium-dark">
      {/* Section BG Accent */}
      <div className="absolute top-0 right-0 w-[40%] h-full bg-gradient-to-l from-accent/[0.02] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="section-label mb-5">Collections</div>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-black text-text mt-3 mb-5"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Everything for
            <br />
            <span className="text-gold-gradient">Your Cricket</span>
          </h2>
          <p className="text-text-muted max-w-xl text-sm leading-relaxed">
            Handcrafted cricket equipment — from premium bats to protective gear. Every product carries our quality promise.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cats.map((cat, i) => (
            <TiltCard key={cat.title} cat={cat} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
