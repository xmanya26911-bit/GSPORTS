
"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Navigation, MessageCircle } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="pt-24">
      <section className="bg-bg border-b border-border-light py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="w-8 h-px bg-accent/50 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-black text-text mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
              Contact Us
            </h1>
            <p className="text-text-muted text-sm max-w-xl mx-auto">
              We&apos;re always happy to help. Visit, call, or message us.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-bg">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-6">
            {/* Info */}
            <div className="lg:col-span-2 space-y-4">
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <MapPin className="w-5 h-5 text-accent" />
                  <h3 className="font-bold text-text text-sm">Address</h3>
                </div>
                <p className="text-text-muted text-sm leading-relaxed">
                  1/2, KESHAVAM CREST, F F, behind PRATHAM SQUARE,
                  opp. SWAMINAR MANDIR, Anant Vihar Society,
                  Himatnagar, Gujarat 383001
                </p>
                <a href="https://maps.google.com/?q=G+SPORTS+Himatnagar" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-accent text-xs font-medium mt-3 hover:text-accent-light transition-colors">
                  <Navigation className="w-3 h-3" /> Get Directions
                </a>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Phone className="w-5 h-5 text-accent" />
                  <h3 className="font-bold text-text text-sm">Phone</h3>
                </div>
                <a href="tel:07405208523" className="text-accent font-semibold text-base hover:text-accent-light transition-colors block">074052 08523</a>
                <p className="text-text-muted/50 text-xs mt-0.5">Call or WhatsApp</p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-5 h-5 text-accent" />
                  <h3 className="font-bold text-text text-sm">Hours</h3>
                </div>
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between text-text-muted">
                    <span>Mon – Sat</span>
                    <span className="text-text font-medium">9:00 AM – 9:00 PM</span>
                  </div>
                  <div className="flex justify-between text-text-muted">
                    <span>Sunday</span>
                    <span className="text-text font-medium">10:00 AM – 8:00 PM</span>
                  </div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex gap-3">
                <a href="https://wa.me/9107405208523?text=Hi%20G%20SPORTS!" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-3 rounded-xl text-sm font-medium hover:bg-green-700 transition-all">
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </a>
                <a href="tel:07405208523" className="flex-1 flex items-center justify-center gap-2 bg-accent text-bg-dark px-4 py-3 rounded-xl text-sm font-medium hover:bg-accent-light transition-all">
                  <Phone className="w-4 h-4" /> Call
                </a>
              </motion.div>
            </div>

            {/* Map */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }} className="lg:col-span-3 h-[450px] md:h-[600px] rounded-2xl overflow-hidden border border-border">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.5!2d72.95!3d23.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sG%20SPORTS!5e0!3m2!1sen!2sin!4v1" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Location" />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
