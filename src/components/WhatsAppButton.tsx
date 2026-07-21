
"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <motion.a
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200, damping: 15 }}
      href="https://wa.me/917405208523?text=Hi%20G%20SPORTS!%20I%20have%20a%20question%20about%20your%20products."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#25D366] text-white px-5 py-3.5 rounded-full shadow-xl hover:shadow-2xl hover:bg-[#22c35e] transition-all duration-300 group"
    >
      <MessageCircle className="w-5 h-5" />
      <span className="text-sm font-medium max-w-0 overflow-hidden group-hover:max-w-[120px] transition-all duration-500 whitespace-nowrap">
        Chat with us
      </span>
    </motion.a>
  );
}
