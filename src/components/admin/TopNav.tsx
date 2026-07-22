"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Bell, Maximize2, LogOut, User, Settings, ChevronDown } from "lucide-react";
import Link from "next/link";

export default function TopNav() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-border bg-bg/80 backdrop-blur-xl">
      <div className="flex items-center justify-between h-full px-6">
        {/* Search */}
        <button
          onClick={() => setSearchOpen(true)}
          className="flex items-center gap-3 px-4 py-2 rounded-xl bg-bg-input border border-border text-text-tertiary text-sm w-full max-w-md hover:border-border-light transition-colors"
        >
          <Search className="w-4 h-4" />
          <span>Search products, orders, customers...</span>
          <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-border text-text-tertiary">⌘K</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Fullscreen */}
          <button
            onClick={() => document.documentElement.requestFullscreen()}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-text-secondary hover:bg-bg-hover transition-colors"
          >
            <Maximize2 className="w-4 h-4" />
          </button>

          {/* Notifications */}
          <button className="relative w-9 h-9 rounded-xl flex items-center justify-center text-text-secondary hover:bg-bg-hover transition-colors">
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-danger" />
          </button>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl hover:bg-bg-hover transition-colors"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent to-purple flex items-center justify-center text-[11px] font-bold text-white">
                IA
              </div>
              <div className="text-left hidden sm:block">
                <div className="text-xs font-medium text-text">Imran Ali</div>
                <div className="text-[10px] text-text-tertiary">Admin</div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-text-tertiary" />
            </button>

            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.96 }}
                  className="absolute right-0 top-full mt-2 w-56 glass rounded-2xl border border-border p-2 shadow-2xl"
                  onClick={() => setProfileOpen(false)}
                >
                  <div className="px-3 py-2 border-b border-border mb-1">
                    <div className="text-sm font-medium text-text">Imran Ali</div>
                    <div className="text-xs text-text-tertiary">idreesrasool91@gmail.com</div>
                  </div>
                  <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-text-secondary hover:bg-bg-hover transition-colors">
                    <Settings className="w-4 h-4" /> Settings
                  </Link>
                  <Link href="/auth/login" className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-danger hover:bg-danger/5 transition-colors">
                    <LogOut className="w-4 h-4" /> Sign Out
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ y: -20, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -20, opacity: 0, scale: 0.98 }}
              className="max-w-xl mx-auto mt-24"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="glass rounded-2xl border border-border p-2 shadow-2xl">
                <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
                  <Search className="w-5 h-5 text-text-tertiary" />
                  <input
                    autoFocus
                    placeholder="Search products, orders, customers..."
                    className="flex-1 bg-transparent text-text text-sm outline-none placeholder:text-text-tertiary"
                  />
                  <span className="text-[10px] px-2 py-1 rounded bg-border text-text-tertiary">ESC</span>
                </div>
                <div className="p-2 text-text-tertiary text-xs text-center py-8">
                  Start typing to search...
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
