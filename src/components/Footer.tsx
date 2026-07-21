
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative bg-premium-dark border-t border-border overflow-hidden">
      {/* Decorative top line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block">
              <span className="text-2xl font-black tracking-tight text-text" style={{ fontFamily: "var(--font-playfair)" }}>
                G<span className="text-accent">.</span>SPORTS
              </span>
              <span className="block text-[10px] text-text-muted tracking-[0.3em] uppercase mt-[-2px]">Since 2014</span>
            </Link>
            <p className="text-text-muted text-sm leading-relaxed mt-5 max-w-sm">
              Himatnagar&apos;s most trusted sports destination. Family-owned, quality-focused, 
              and driven by a love for the game.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-text text-sm mb-5 uppercase tracking-wider">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              {[
                { href: "/", label: "Home" },
                { href: "/products", label: "Products" },
                { href: "/about", label: "About Us" },
                { href: "/gallery", label: "Gallery" },
                { href: "/contact", label: "Contact" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-text-muted text-sm hover:text-accent transition-colors duration-300 py-1"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-text text-sm mb-5 uppercase tracking-wider">Contact</h4>
            <div className="space-y-3 text-sm">
              <p className="text-text-muted leading-relaxed">
                1/2, Keshavam Crest,<br />
                behind Pratham Square,<br />
                Himatnagar, Gujarat 383001
              </p>
              <a href="tel:07405208523" className="block text-accent hover:text-accent-light transition-colors">
                074052 08523
              </a>
              <div className="flex items-center gap-2 text-text-muted text-xs">
                <span className="text-accent">Mon – Sat</span> 9:00 AM – 9:00 PM
              </div>
              <div className="flex items-center gap-2 text-text-muted text-xs">
                <span className="text-accent">Sunday</span> 10:00 AM – 8:00 PM
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-text-muted/50">
          <p>© {new Date().getFullYear()} G SPORTS. All rights reserved.</p>
          <p>Built with passion for the game.</p>
        </div>
      </div>
    </footer>
  );
}
