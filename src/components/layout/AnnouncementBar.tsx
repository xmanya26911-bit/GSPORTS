"use client";
import { X } from "lucide-react";
import { useState } from "react";
import { ANNOUNCEMENT_TEXT } from "@/lib/constants";

export function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
    <div className="relative bg-primary text-white text-center text-xs sm:text-sm py-2.5 px-4">
      <p className="font-medium tracking-wide">{ANNOUNCEMENT_TEXT}</p>
      <button onClick={() => setVisible(false)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors focus-ring rounded-sm" aria-label="Dismiss">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
