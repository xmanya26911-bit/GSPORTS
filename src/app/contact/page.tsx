"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Mail, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WHATSAPP_URL, WHATSAPP_NUMBER, EMAIL, ADDRESS } from "@/lib/constants";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `Hello Golden Willowe!%0A%0AName: ${name}%0AEmail: ${email}%0A%0AMessage: ${message}`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank", "noopener,noreferrer");
  };

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
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div><label htmlFor="contact-name" className="block text-sm font-medium text-text mb-1">Name</label><input id="contact-name" required value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-border bg-white text-sm focus-ring" /></div>
                  <div><label htmlFor="contact-email" className="block text-sm font-medium text-text mb-1">Email</label><input id="contact-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-border bg-white text-sm focus-ring" /></div>
                  <div><label htmlFor="contact-message" className="block text-sm font-medium text-text mb-1">Message</label><textarea id="contact-message" rows={4} required value={message} onChange={(e) => setMessage(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-border bg-white text-sm focus-ring resize-none" /></div>
                  <Button type="submit" variant="primary" size="lg" className="w-full">
                    <Send className="w-4 h-4" /> Send via WhatsApp
                  </Button>
                  <p className="text-xs text-text-muted text-center">Your message opens in WhatsApp so we can reply directly.</p>
                </form>
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
