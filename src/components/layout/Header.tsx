"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingBag, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE_NAME, NAV_LINKS, PHONE, PHONE_URL, WHATSAPP_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <header className={cn("sticky top-0 z-50 transition-all duration-300", scrolled ? "bg-white/95 backdrop-blur-xl shadow-sm border-b border-border" : "bg-white")}>
      <div className="container-main">
        <div className="flex items-center justify-between h-16 md:h-20">
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 -ml-2 text-text hover:text-accent transition-colors focus-ring rounded-sm" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
              <span className="text-primary text-sm font-black">GW</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-lg font-bold text-primary font-display tracking-tight">{SITE_NAME}</span>
              <span className="block text-[10px] text-text-muted tracking-[0.2em] uppercase -mt-1">EST. 2010</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={cn("px-3 py-2 text-sm font-medium rounded-lg transition-colors focus-ring", pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href)) ? "text-accent bg-accent/5" : "text-text-muted hover:text-text hover:bg-bg-dark")}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a href={PHONE_URL} className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent/5 text-accent text-sm font-medium hover:bg-accent/10 transition-colors focus-ring" aria-label="Call us">
              <Phone className="w-3.5 h-3.5" /> {PHONE}
            </a>
            <Link href="/cart" className="p-2 text-text-muted hover:text-text transition-colors focus-ring rounded-sm relative" aria-label="Shopping cart">
              <ShoppingBag className="w-5 h-5" />
            </Link>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hidden sm:inline-flex bg-accent text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-accent-dark transition-colors focus-ring">
              Visit Store
            </a>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="md:hidden border-t border-border bg-white overflow-hidden">
            <nav className="container-main py-4 space-y-1" aria-label="Mobile navigation">
              {NAV_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className={cn("block px-4 py-3 rounded-lg text-sm font-medium transition-colors focus-ring", pathname === link.href ? "text-accent bg-accent/5" : "text-text-muted hover:text-text hover:bg-bg-dark")}>
                  {link.label}
                </Link>
              ))}
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="block px-4 py-3 rounded-lg text-sm font-medium text-accent hover:bg-accent/5 transition-colors">
                Order on WhatsApp
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
