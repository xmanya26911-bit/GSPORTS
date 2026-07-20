
import Link from "next/link";
import { MapPin, Phone, Clock, Star } from "lucide-react";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About Us" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

const categories = [
  { href: "/products#cricket", label: "Cricket Equipment" },
  { href: "/products#football", label: "Football" },
  { href: "/products#badminton", label: "Badminton" },
  { href: "/products#activewear", label: "Activewear" },
  { href: "/products#shoes", label: "Sports Shoes" },
];

const hours = [
  { day: "Mon – Sat", time: "9:00 AM – 9:00 PM" },
  { day: "Sunday", time: "10:00 AM – 8:00 PM" },
];

export default function Footer() {
  return (
    <footer className="bg-primary-dark border-t border-border-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-bg-dark font-black text-xl" style={{ fontFamily: "var(--font-playfair)" }}>G</span>
              </div>
              <div>
                <span className="text-lg font-bold text-text">
                  G<span className="text-accent">SPORTS</span>
                </span>
              </div>
            </div>
            <p className="text-text-muted text-sm leading-relaxed mb-5">
              Himatnagar&apos;s most trusted sports destination since 2014. 
              Premium cricket equipment, activewear, sports shoes, and more.
            </p>
            <div className="flex items-center gap-1 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-3.5 h-3.5 ${i < 4 ? "text-accent fill-accent" : "text-accent/30"}`} />
              ))}
              <span className="text-text-muted text-xs ml-2">4.7 (253 reviews)</span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted mb-5">Navigate</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-text-muted hover:text-text text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted mb-5">Collections</h3>
            <ul className="space-y-3">
              {categories.map((cat) => (
                <li key={cat.href}>
                  <Link href={cat.href} className="text-text-muted hover:text-text text-sm transition-colors">
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted mb-5">Visit</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span className="text-text-muted text-sm leading-relaxed">
                  1/2, KESHAVAM CREST, F F,<br />
                  behind PRATHAM SQUARE,<br />
                  opp. SWAMINAR MANDIR,<br />
                  Himatnagar, Gujarat 383001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <a href="tel:07405208523" className="text-text-muted hover:text-text text-sm transition-colors">
                  074052 08523
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <div className="text-text-muted text-sm space-y-1">
                  {hours.map((h) => (
                    <div key={h.day} className="flex gap-6">
                      <span className="w-20">{h.day}</span>
                      <span>{h.time}</span>
                    </div>
                  ))}
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border-light mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-muted/50 text-xs">
            &copy; {new Date().getFullYear()} G SPORTS. Himatnagar, Gujarat.
          </p>
          <p className="text-text-muted/50 text-xs">
            Crafted for Ganpatbhai &amp; Team
          </p>
        </div>
      </div>
    </footer>
  );
}
