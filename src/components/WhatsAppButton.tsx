
"use client";

import { MessageCircle } from "lucide-react";
import { useState } from "react";

export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);
  const phone = "9107405208523";

  return (
    <a
      href={`https://wa.me/${phone}?text=Hi%20G%20SPORTS!`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Chat on WhatsApp"
    >
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-green-500/30 animate-ping opacity-30" />
        <div className={`relative w-12 h-12 md:w-14 md:h-14 rounded-full bg-green-600 flex items-center justify-center shadow-lg transition-all duration-500 ${hovered ? "scale-110 shadow-xl shadow-green-500/20" : "shadow-green-500/10"}`}>
          <MessageCircle className="w-6 h-6 md:w-7 md:h-7 text-white" />
        </div>
        <div className={`absolute right-16 top-1/2 -translate-y-1/2 bg-bg-dark text-text text-xs px-3 py-1.5 rounded-lg whitespace-nowrap border border-border-light transition-all duration-300 ${hovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2 pointer-events-none"}`}>
          Chat with us
        </div>
      </div>
    </a>
  );
}
