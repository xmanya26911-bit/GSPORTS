
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useState, useEffect } from "react";

const reviews = [
  { text: "Excellent range and the best expertise in Gujarat. All the way from Australia, highly recommend coming to this cricket shop!", name: "Huntah Young", stars: 5, from: "Australia" },
  { text: "G SPORTS is well known and one of the best sports showroom in Himatnagar. Everything you need in sports you will get here.", name: "Ashutosh Limbachiya", stars: 5, from: "Local Guide" },
  { text: "Very good service... and behaviours also good... plz visit this store!", name: "Naitik Barot", stars: 5, from: "Recent Review" },
  { text: "Best sports accessory store in Himatnagar!", name: "Keshav Garba Classes", stars: 5, from: "Local Guide" },
  { text: "I have seen best service of Gsports from any other shops. I recommend to everyone please visit the Shop for best equipments.", name: "Umang Suthar", stars: 5, from: "Verified Customer" },
  { text: "The owner Ganpatbhai Prajapati — he's very humble and kind man. Your work speaks volumes!", name: "Mayank Prajapati", stars: 5, from: "Local Guide" },
  { text: "Best sports shop I found in this town for cricket and other games accessories or sport equipments.", name: "23_Mahesh", stars: 5, from: "Verified" },
  { text: "Reasonable price and good quality items are available.", name: "Bhavesh", stars: 5, from: "Recent" },
  { text: "One of the best shop in Sabarkantha... All sports item available in G Sports.", name: "Sandip Prajapati", stars: 5, from: "Himatnagar" },
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
            4.7 stars across 253 reviews — here&apos;s what people love about G SPORTS.
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
