"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Mail, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WHATSAPP_URL, WHATSAPP_NUMBER, EMAIL, ADDRESS } from "@/lib/constants";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  return (
    <div className="container-main py-10">
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl md:text-4xl font-black text-primary font-display mb-2">Contact</h1>
          <p className="text-text-muted mb-8">Get in touch with us. We&apos;d love to hear from you.</p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="bg-bg-alt rounded-2xl p-6 border border-border">
              <h2 className="text-lg font-bold text-primary font-display mb-6">Send a Message</h2>
              {submitted ? (
                <div className="text-center py-8"><Send className="w-12 h-12 text-accent mx-auto mb-4" /><p className="font-medium text-text">Message sent!</p><p className="text-sm text-text-muted mt-1">We&apos;ll get back to you shortly.</p></div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div><label className="block text-sm font-medium text-text mb-1">Name</label><input className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-sm focus-ring" /></div>
                  <div><label className="block text-sm font-medium text-text mb-1">Email</label><input type="email" required className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-sm focus-ring" /></div>
                  <div><label className="block text-sm font-medium text-text mb-1">Message</label><textarea rows={4} className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-sm focus-ring resize-none" /></div>
                  <Button type="submit" variant="primary" size="lg" className="w-full">Send</Button>
                </form>
              )}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <div className="bg-bg-alt rounded-2xl p-6 border border-border">
              <h3 className="font-bold text-text font-display mb-4">Contact Information</h3>
              <div className="space-y-4">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-text-muted hover:text-accent transition-colors"><MessageCircle className="w-5 h-5 text-accent" /> {WHATSAPP_NUMBER}</a>
                <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 text-sm text-text-muted hover:text-accent transition-colors"><Mail className="w-5 h-5 text-accent" /> {EMAIL}</a>
                <div className="flex items-start gap-3 text-sm text-text-muted"><MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" /><span>{ADDRESS}</span></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
