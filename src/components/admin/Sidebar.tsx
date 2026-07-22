"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Package, ShoppingCart, Users,
  ChevronLeft, Sparkles, Store, Menu, X
} from "lucide-react";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/customers", label: "Customers", icon: Users },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-3 left-3 z-[60] lg:hidden w-10 h-10 rounded-xl bg-bg-card border border-border flex items-center justify-center text-text"
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-screen z-50 transition-all duration-500 ease-out ${
        collapsed ? "w-[72px]" : "w-[260px]"
      } ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="h-full glass border-r border-border flex flex-col bg-bg/95 backdrop-blur-xl">
          {/* Logo */}
          <div className="flex items-center h-16 px-4 border-b border-border shrink-0">
            <Link href="/admin" className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center shrink-0">
                <Store className="w-4 h-4 text-white" />
              </div>
              <AnimatePresence mode="wait">
                {!collapsed && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    className="overflow-hidden whitespace-nowrap"
                  >
                    <span className="text-sm font-bold text-text">Golden Willowe</span>
                    <span className="block text-[10px] text-text-tertiary tracking-wider uppercase -mt-0.5">Admin</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
            {links.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href));
              return (
                <Link key={link.href} href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`sidebar-link ${isActive ? "active" : ""}`}
                >
                  <link.icon className="w-[18px] h-[18px] shrink-0" />
                  {!collapsed && <span className="text-sm whitespace-nowrap">{link.label}</span>}
                </Link>
              );
            })}

            {/* AI Generator - Special */}
            <div className="pt-2">
              <Link href="/admin/products/new"
                onClick={() => setMobileOpen(false)}
                className={`sidebar-link ${pathname === "/admin/products/new" ? "active" : ""} bg-accent/5 border border-accent/10`}
              >
                <Sparkles className="w-[18px] h-[18px] shrink-0 text-accent" />
                {!collapsed && <span className="text-sm whitespace-nowrap text-accent">AI Product Generator</span>}
              </Link>
            </div>
          </nav>

          {/* Collapse */}
          <div className="p-3 border-t border-border hidden lg:block">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="sidebar-link w-full"
            >
              <ChevronLeft className={`w-[18px] h-[18px] transition-transform ${collapsed ? "rotate-180" : ""}`} />
              {!collapsed && <span className="text-sm">Collapse</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
