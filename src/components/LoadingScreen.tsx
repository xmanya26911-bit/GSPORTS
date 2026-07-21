
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[10001] bg-bg-dark flex flex-col items-center justify-center"
        >
          {/* Logo */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl font-black tracking-tight text-text"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            G<span className="text-accent">.</span>
          </motion.h1>

          {/* Loader bar */}
          <div className="relative mt-8 w-40 h-[2px] bg-white/5 overflow-hidden rounded-full">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: [0, 1, 1, 0] }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], times: [0, 0.45, 0.55, 1] }}
              className="absolute inset-0 bg-accent origin-left rounded-full"
            />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-text-muted/40 text-[10px] uppercase tracking-[0.3em]"
          >
            Loading
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
