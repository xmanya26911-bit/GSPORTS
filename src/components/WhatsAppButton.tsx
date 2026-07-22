
"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <motion.a
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200, damping: 15 }}
      href="https://wa.me/917889342459?text=Hi%20Golden%20Willowe!%20I%27m%20interested%20in%20your%20cricket%20bats."
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
