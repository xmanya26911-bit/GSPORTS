
"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  { name: "Huntah Young", text: "Excellent range and the best expertise in Gujarat. All the way from Australia, highly recommend.", rating: 5 },
  { name: "Ashutosh Limbachiya", text: "Well known and one of the best sports showroom in Himatnagar. Everything you need in sports you will get here.", rating: 5 },
  { name: "KHARADI JAYVISHNU", text: "From cricket to football, badminton to accessories — they have everything at reasonable prices.", rating: 5 },
  { name: "mayank prajapati", text: "The owner GANPATBHAI PRAJAPATI is very humble and kind. Your work speaks volumes.", rating: 5 },
  { name: "Umang Suthar", text: "Best service of GSports from any other shop. I recommend everyone to visit for best equipments.", rating: 5 },
  { name: "Bhargav Limbachiya", text: "Good options in everything, products are very good, shopkeeper is very professional and polite.", rating: 5 },
  { name: "Pradip Chavada", text: "Very nice experience. You can buy any sport item from here.", rating: 5 },
  { name: "Keshav Garba classes", text: "Best sports accessory store in Himatnagar.", rating: 5 },
  { name: "nikhil rabari", text: "In the entire Himatnagar district, you will find the best and most famous sports shop.", rating: 5 },
];

export default function Testimonials() {
  return (
    <section className="section-padding bg-bg">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <div className="w-8 h-px bg-accent/50 mx-auto mb-6" />
          <span className="text-accent text-xs font-medium uppercase tracking-[0.25em]">Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-black text-text mt-4 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
            What Customers Say
          </h2>
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < 4 ? "text-accent fill-accent" : "text-accent/30"}`} />
              ))}
            </div>
            <span className="text-text text-sm font-semibold">4.7</span>
            <span className="text-text-muted text-xs">(253 reviews)</span>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.04, duration: 0.4 }}
              className="glass-card rounded-2xl p-6"
            >
              <div className="flex items-center gap-1 mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 text-accent fill-accent" />
                ))}
              </div>
              <p className="text-text-muted text-sm leading-relaxed mb-4">
                &ldquo;{review.text}&rdquo;
              </p>
              <p className="font-medium text-text text-xs">{review.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
