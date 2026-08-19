"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Play, ExternalLink } from "lucide-react";
import type { Reel } from "@/lib/reels";

interface ReelsSectionProps {
  reels: Reel[];
}

export function ReelsSection({ reels }: ReelsSectionProps) {
  return (
    <section className="py-20 md:py-28 bg-bg-alt overflow-hidden">
      <div className="container-main">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-accent mb-3">Instagram Reels</p>
            <h2 className="text-3xl md:text-5xl font-bold text-text" style={{ fontFamily: "var(--font-display)" }}>
              Bats in Action
            </h2>
            <p className="text-text-muted mt-2 max-w-md">
              Watch our handcrafted bats in action. Follow{" "}
              <a href="https://www.instagram.com/thegoldenwillowe" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                @thegoldenwillowe
              </a>{" "}
              for more.
            </p>
          </div>
          <a
            href="https://www.instagram.com/thegoldenwillowe"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white text-xs font-bold tracking-wider uppercase rounded-xl hover:opacity-90 transition-all"
          >
            <InstagramIcon />
            Follow
          </a>
        </div>

        {/* Reel Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
          {reels.map((reel, i) => (
            <motion.a
              key={reel.id}
              href={reel.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              className="group relative aspect-[9/16] rounded-2xl overflow-hidden bg-bg-dark border border-accent/10 hover:border-accent/30 transition-all cursor-pointer"
            >
              {reel.thumbnail ? (
                <Image
                  src={reel.thumbnail}
                  alt={reel.title}
                  fill
                  sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-premium-dark to-bg-dark">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                    <Play size={20} className="text-accent ml-0.5" aria-hidden="true" />
                  </div>
                </div>
              )}
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-white text-xs font-medium line-clamp-2">{reel.title}</p>
                </div>
              </div>
              {/* Play badge */}
              <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
                <Play size={12} className="text-white ml-0.5" aria-hidden="true" />
              </div>
              {/* Number */}
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-sm text-white text-[10px] font-mono">
                {i + 1}
              </div>
            </motion.a>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="text-center mt-8">
          <a
            href="https://www.instagram.com/thegoldenwillowe"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white text-sm font-bold rounded-xl hover:opacity-90 transition-all"
          >
            <InstagramIcon />
            Follow @thegoldenwillowe on Instagram
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}

function InstagramIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}