import Link from "next/link";
import { SITE_NAME, QUICK_LINKS, INSTAGRAM_HANDLE, INSTAGRAM_URL, WHATSAPP_URL, WHATSAPP_NUMBER, EMAIL, ADDRESS, OWNER_NAME } from "@/lib/constants";
import { MessageCircle, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-bg-alt border-t border-border mt-auto">
      <div className="container-main py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                <span className="text-text text-lg font-black">GW</span>
              </div>
              <div>
                <span className="text-lg font-bold text-text font-display">{SITE_NAME}</span>
                <span className="block text-[10px] text-text-muted tracking-[0.2em] uppercase">EST. 2010</span>
              </div>
            </div>
            <p className="text-text-muted text-sm leading-relaxed max-w-md mb-4">
              India&#x2019;s premier cricket bat manufacturer. Handcrafted premium English &amp; Kashmir willow bats since 2010. Every bat is personally inspected and approved by <strong className="text-text">{OWNER_NAME}</strong>.
            </p>
            <p className="text-text text-sm font-medium">Crafting dreams, one bat at a time.</p>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold text-text mb-4 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-text-muted hover:text-accent transition-colors focus-ring rounded-sm">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold text-text mb-4 uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3">
              <li><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-text-muted hover:text-accent transition-colors focus-ring rounded-sm"><MessageCircle className="w-4 h-4 text-accent" /> {WHATSAPP_NUMBER}</a></li>
              <li><a href={`mailto:${EMAIL}`} className="flex items-center gap-2 text-sm text-text-muted hover:text-accent transition-colors focus-ring rounded-sm"><Mail className="w-4 h-4 text-accent" /> {EMAIL}</a></li>
              <li><a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-text-muted hover:text-accent transition-colors focus-ring rounded-sm"><svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/></svg> {INSTAGRAM_HANDLE}</a></li>
              <li className="flex items-start gap-2 text-sm text-text-muted"><MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" /> <span>{ADDRESS}</span></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-main py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-light">&copy; 2026, {SITE_NAME} Sports. All rights reserved.</p>
          <p className="text-xs text-text-light">Crafting dreams, one bat at a time.</p>
        </div>
      </div>
    </footer>
  );
}
