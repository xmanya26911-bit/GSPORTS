
"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, Phone } from "lucide-react";

const hours = [
  { day: "Mon – Sat", time: "9:00 AM – 9:00 PM" },
  { day: "Sunday", time: "10:00 AM – 8:00 PM" },
];

export default function Location() {
  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 bg-premium-dark overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <div className="section-label mb-5">Visit Us</div>
          <h2 className="text-3xl md:text-5xl font-black text-text mt-3" style={{ fontFamily: "var(--font-playfair)" }}>
            Find G SPORTS
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl overflow-hidden h-[400px]"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.887!2d73.126!3d23.599!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sG%20SPORTS!5e0!3m2!1sen!2sin!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "invert(0.9) hue-rotate(180deg) saturate(0.5)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="G SPORTS Location"
            />
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-8 md:p-10 flex flex-col justify-center"
          >
            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 border border-accent/20">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-bold text-text text-sm mb-1">Address</h4>
                  <p className="text-text-muted text-sm leading-relaxed">
                    1/2, Keshavam Crest, FF, behind Pratham Square,<br />
                    opp. Swaminar Mandir, Anant Vihar Society,<br />
                    Himatnagar, Gujarat 383001
                  </p>
                  <a
                    href="https://maps.google.com/?q=G+SPORTS+Himatnagar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-accent text-xs font-medium mt-2 hover:text-accent-light transition-colors"
                  >
                    Get Directions →
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 border border-accent/20">
                  <Clock className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-bold text-text text-sm mb-2">Hours</h4>
                  <div className="space-y-1.5">
                    {hours.map((h) => (
                      <div key={h.day} className="flex items-center justify-between gap-8 text-sm">
                        <span className="text-text-muted">{h.day}</span>
                        <span className="text-text font-medium">{h.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 border border-accent/20">
                  <Phone className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-bold text-text text-sm mb-1">Phone</h4>
                  <a href="tel:07405208523" className="text-accent text-sm font-medium hover:text-accent-light transition-colors">
                    074052 08523
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
