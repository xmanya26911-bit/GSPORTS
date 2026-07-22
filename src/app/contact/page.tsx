
"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Send } from "lucide-react";

const hours = [
  { day: "Mon – Sat", time: "9:00 AM – 9:00 PM" },
  { day: "Sunday", time: "10:00 AM – 5:00 PM" },
];

export default function ContactPage() {
  return (
    <div className="pt-28">
      <section className="relative py-20 overflow-hidden bg-premium-dark">
        <div className="absolute inset-0"><img src="/images/hero-bg.jpg" alt="" className="w-full h-full object-cover opacity-20" /><div className="absolute inset-0 bg-gradient-to-r from-bg-dark via-bg-dark/90 to-bg-dark" /></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="section-label justify-center mb-5" />
            <h1 className="text-4xl md:text-6xl font-black text-text mb-4" style={{ fontFamily: "var(--font-playfair)" }}>Get in Touch</h1>
            <p className="text-text-muted text-sm max-w-xl mx-auto">Visit us, call us, or send a message — we&apos;re always happy to help.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Map */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass-card rounded-2xl overflow-hidden h-[450px]">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.887!2d73.126!3d23.599!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sG%20SPORTS!5e0!3m2!1sen!2sin!4v1"
                width="100%" height="100%" style={{ border: 0, filter: "invert(0.9) hue-rotate(180deg) saturate(0.5)" }} allowFullScreen loading="lazy" title="Golden Willowe Sports Location" />
            </motion.div>

            {/* Info */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
              <div className="glass-card rounded-2xl p-8">
                <div className="flex items-start gap-4"><div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 border border-accent/20"><MapPin className="w-5 h-5 text-accent" /></div>
                  <div><h4 className="font-bold text-text text-sm mb-1">Address</h4><p className="text-text-muted text-sm leading-relaxed">1/2, Keshavam Crest, FF, behind Pratham Square, opp. Swaminar Mandir, Anant Vihar Society, Himatnagar, Gujarat 383001</p>
                    <a href="https://maps.google.com/?q=Golden+Willowe+Sports+Himatnagar" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-accent text-xs font-medium mt-2 hover:text-accent-light">Get Directions →</a></div></div>
              </div>
              <div className="glass-card rounded-2xl p-8">
                <div className="flex items-start gap-4"><div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 border border-accent/20"><Phone className="w-5 h-5 text-accent" /></div>
                  <div><h4 className="font-bold text-text text-sm mb-1">Phone</h4><a href="tel:07405208523" className="text-accent text-sm font-medium hover:text-accent-light">788934 2459</a>
                    <p className="text-text-muted text-xs mt-1">Call or WhatsApp</p></div></div>
              </div>
              <div className="glass-card rounded-2xl p-8">
                <div className="flex items-start gap-4"><div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 border border-accent/20"><Clock className="w-5 h-5 text-accent" /></div>
                  <div><h4 className="font-bold text-text text-sm mb-1">Hours</h4><div className="space-y-1">{[...hours, { day: "Friday", time: "9:00 AM – 9:00 PM" }].map((h) => (<div key={h.day} className="flex justify-between gap-8 text-sm"><span className="text-text-muted">{h.day}</span><span className="text-text font-medium">{h.time}</span></div>))}</div></div></div>
              </div>

              {/* WhatsApp CTA */}
              <a href="https://wa.me/917889342459" target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-accent text-bg-dark px-6 py-4 rounded-xl font-semibold text-sm hover:bg-accent-light transition-all w-full">
                <Send className="w-4 h-4" /> Message us on WhatsApp
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
