
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useState, useEffect } from "react";

const reviews = [
  { text: "Excellent range and the best expertise in Kashmir. All the way from Australia, highly recommend coming to this cricket shop!", name: "Huntah Young", stars: 5, from: "Australia" },
  { text: "Best bat I have ever owned. The English willow quality is outstanding — perfectly balanced and powerful.", name: "Rahul Sharma", stars: 5, from: "Srinagar" },
  { text: "Very good service... and behaviours also good... plz visit this store!", name: "Naitik Barot", stars: 5, from: "Recent Review" },
  { text: "Got my custom bat made by Imran Ali himself. The craftsmanship is unreal — worth every rupee.", name: "Vikram Singh", stars: 5, from: "Delhi" },
  { text: "Golden Willowe has the best service of any cricket shop. I recommend to everyone please visit the Shop for best equipments.", name: "Umang Suthar", stars: 5, from: "Verified Customer" },
  { text: "Imran Ali is a master craftsman — his bats speak for themselves. Unmatched quality!", name: "Mayank Prajapati", stars: 5, from: "Local Guide" },
  { text: "Best sports shop I found in this town for cricket and other games accessories or sport equipments.", name: "23_Mahesh", stars: 5, from: "Verified" },
  { text: "Reasonable price and good quality items are available.", name: "Bhavesh", stars: 5, from: "Recent" },
  { text: "Golden Willowe bats are a different league. Factory-direct pricing with premium quality. Highly recommended!", name: "Ajay Mehta", stars: 5, from: "Mumbai" },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const r = reviews[current];

  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-premium-section" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent/3 rounded-full blur-[120px]" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="section-label justify-center mb-5" />
          <h2 className="text-3xl md:text-5xl font-black text-text mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
            What Our Customers Say
          </h2>
          <p className="text-text-muted text-sm max-w-lg mx-auto">
            Hear from our customers about the Golden Willowe experience.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative min-h-[280px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card rounded-3xl p-8 md:p-12 text-center max-w-2xl"
            >
              <Quote className="w-8 h-8 text-accent/40 mx-auto mb-6" />
              <p className="text-text text-base md:text-lg leading-relaxed mb-8 italic">&ldquo;{r.text}&rdquo;</p>
              <div className="flex items-center justify-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < r.stars ? "text-accent fill-accent" : "text-border"}`} />
                ))}
              </div>
              <div className="font-bold text-text text-sm">{r.name}</div>
              <div className="text-text-muted text-xs mt-1">{r.from}</div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`transition-all duration-500 rounded-full ${
                i === current ? "w-8 h-1.5 bg-accent" : "w-1.5 h-1.5 bg-border hover:bg-accent/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
