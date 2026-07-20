
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled ? "glass shadow-2xl shadow-black/50" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11">
              <div className="absolute inset-0 bg-accent rounded-lg rotate-3 group-hover:rotate-6 transition-transform duration-500" />
              <div className="absolute inset-0 bg-bg-dark rounded-lg -rotate-3 group-hover:-rotate-6 transition-transform duration-500 flex items-center justify-center border border-accent/30">
                <span className="text-accent font-black text-xl" style={{ fontFamily: "var(--font-playfair)" }}>G</span>
              </div>
            </div>
            <div>
              <span className="text-lg font-bold text-text tracking-tight block leading-tight">
                G<span className="text-accent">SPORTS</span>
              </span>
              <span className="text-xs text-text-muted tracking-widest uppercase hidden sm:block">Since 2014</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-text-muted hover:text-text transition-colors relative group tracking-wide"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-500 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:07405208523"
              className="group inline-flex items-center gap-2 px-5 py-2.5 border border-accent/30 text-accent text-sm font-medium rounded-lg hover:bg-accent hover:text-bg-dark transition-all duration-500"
            >
              <Phone className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
              <span>074052 08523</span>
            </a>
          </div>

          {/* Mobile */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-white/5 transition-colors text-text-muted"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden border-t border-border-light bg-bg-dark/95 backdrop-blur-xl"
          >
            <nav className="max-w-7xl mx-auto px-4 py-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 rounded-lg text-text-muted hover:text-text hover:bg-white/5 font-medium transition-all"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="tel:07405208523"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-4 py-3 mt-4 border border-accent/30 text-accent rounded-lg font-medium hover:bg-accent hover:text-bg-dark transition-all"
              >
                <Phone className="w-4 h-4" />
                Call 074052 08523
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
