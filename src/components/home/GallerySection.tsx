"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const gallery = [
  { img: "/images/powerpro.png", title: "PowerPro" },
  { img: "/images/signatureedition.png", title: "Signature Edition" },
  { img: "/images/goldseries.png", title: "Gold Series" },
  { img: "/images/premiumcollection.png", title: "Premium Collection" },
];

export function GallerySection() {
  return (
    <section className="section-padding bg-bg">
      <div className="container-main">
        <div className="text-center mb-10">
          <p className="section-label">Our Collection</p>
          <h2 className="text-3xl md:text-4xl font-black text-primary font-display mt-3">Featured Bats</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {gallery.map((item, i) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Link href="/products" className="group block relative aspect-[3/4] rounded-2xl overflow-hidden bg-bg-dark">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform">
                  <h3 className="text-white font-bold font-display text-lg">{item.title}</h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/products" className="inline-flex items-center gap-2 text-accent font-medium hover:text-accent-dark transition-colors focus-ring rounded-sm">
            View All Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
