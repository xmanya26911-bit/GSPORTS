"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { Bell, Maximize2, LogOut, User, Settings, ChevronDown, LayoutDashboard, Package, ShoppingCart, Sparkles, Users } from "lucide-react";
import Link from "next/link";

const pageTitles: Record<string, { label: string; icon: typeof LayoutDashboard }> = {
  "/admin": { label: "Dashboard", icon: LayoutDashboard },
  "/admin/products": { label: "Products", icon: Package },
  "/admin/products/new": { label: "AI Product Generator", icon: Sparkles },
  "/admin/orders": { label: "Orders", icon: ShoppingCart },
  "/admin/customers": { label: "Customers", icon: Users },
};

export default function TopNav() {
  const [profileOpen, setProfileOpen] = useState(false);
  const pathname = usePathname();
  const page = pageTitles[pathname] || { label: "Admin", icon: LayoutDashboard };
  const Icon = page.icon;

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-border bg-bg/80 backdrop-blur-xl">
      <div className="flex items-center justify-between h-full px-6">
        {/* Page Title */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
            <Icon className="w-4 h-4 text-accent" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-text">{page.label}</h1>
            <p className="text-[10px] text-text-tertiary capitalize">{pathname === "/admin" ? "Overview" : pathname.replace("/admin/", "").replace("/", " / ")}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Fullscreen */}
          <button
            onClick={() => document.documentElement.requestFullscreen()}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-text-secondary hover:bg-bg-hover transition-colors"
            title="Fullscreen"
          >
            <Maximize2 className="w-4 h-4" />
          </button>

          {/* Notifications */}
          <button className="relative w-9 h-9 rounded-xl flex items-center justify-center text-text-secondary hover:bg-bg-hover transition-colors" title="Notifications">
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-danger" />
          </button>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl hover:bg-bg-hover transition-colors"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center text-[11px] font-bold text-white">
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
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-danger hover:bg-danger/5 transition-colors">
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}
