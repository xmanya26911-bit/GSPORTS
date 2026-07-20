
"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Navigation } from "lucide-react";

export default function Location() {
  return (
    <section className="section-padding bg-bg-alt">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="w-8 h-px bg-accent/50 mb-6" />
            <span className="text-accent text-xs font-medium uppercase tracking-[0.25em]">Visit Us</span>
            <h2 className="text-3xl md:text-4xl font-black text-primary-dark mt-4 mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
              Come Experience
              <br />
              <span className="text-gold-gradient">the Best Sports Gear</span>
            </h2>
            <p className="text-text-body text-sm leading-relaxed mb-8">
              Located in the heart of Himatnagar, just minutes away. 
              Drop by to explore our full range — our team will help you find exactly what you need.
            </p>

            <div className="space-y-4">
              <div className="glass-card-light rounded-xl p-4 flex items-start gap-4">
                <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-primary-dark text-xs tracking-wide uppercase">Address</h4>
                  <p className="text-text-body text-sm mt-1 leading-relaxed">
                    1/2, KESHAVAM CREST, F F, behind PRATHAM SQUARE,<br />
                    opp. SWAMINAR MANDIR, Anant Vihar Society,<br />
                    Himatnagar, Gujarat 383001
                  </p>
                </div>
              </div>

              <div className="glass-card-light rounded-xl p-4 flex items-start gap-4">
                <Clock className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-primary-dark text-xs tracking-wide uppercase">Hours</h4>
                  <div className="text-text-body text-sm mt-1 space-y-1">
                    <div className="flex justify-between gap-8">
                      <span>Mon – Sat</span>
                      <span className="font-medium text-primary-dark">9:00 AM – 9:00 PM</span>
                    </div>
                    <div className="flex justify-between gap-8">
                      <span>Sunday</span>
                      <span className="font-medium text-primary-dark">10:00 AM – 8:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card-light rounded-xl p-4 flex items-start gap-4">
                <Phone className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-primary-dark text-xs tracking-wide uppercase">Phone</h4>
                  <a href="tel:07405208523" className="text-accent text-sm font-medium mt-1 block hover:text-bg-dark transition-colors">
                    074052 08523
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href="https://maps.google.com/?q=G+SPORTS+Himatnagar+KESHAVAM+CREST"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-bg-dark text-text px-6 py-3 rounded-xl text-sm font-medium hover:bg-primary/80 transition-all duration-500 border border-border"
              >
                <Navigation className="w-4 h-4" />
                Directions
              </a>
              <a
                href="tel:07405208523"
                className="inline-flex items-center justify-center gap-2 border border-accent/30 text-accent px-6 py-3 rounded-xl text-sm font-medium hover:bg-accent hover:text-bg-dark transition-all duration-500"
              >
                <Phone className="w-4 h-4" />
                Call Store
              </a>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="h-[400px] md:h-[500px] rounded-2xl overflow-hidden border border-border"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.5!2d72.95!3d23.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sG%20SPORTS!5e0!3m2!1sen!2sin!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="G SPORTS Location"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
