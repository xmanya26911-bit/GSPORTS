"use client";

import { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingBag, LayoutGrid, MessageCircle } from "lucide-react";
import { useCart } from "@/store/cart";
import { WHATSAPP_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const pathname = usePathname();
  const items = useCart((s) => s.items);
  const count = useMemo(() => items.reduce((n, i) => n + i.quantity, 0), [items]);

  const isProductDetail = /^\/products\/[^/]+$/.test(pathname ?? "");
  const isAdminArea = pathname?.startsWith("/admin") || pathname?.startsWith("/login");
  if (isProductDetail || isAdminArea) return null;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  const links = [
    { href: "/", label: "Home", icon: Home },
    { href: "/products", label: "Shop", icon: LayoutGrid },
    { href: "/cart", label: "Cart", icon: ShoppingBag, badge: count },
    { href: WHATSAPP_URL, label: "WhatsApp", icon: MessageCircle, external: true },
  ];

  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed bottom-0 inset-x-0 z-40 lg:hidden safe-bottom border-t border-border bg-white/95 backdrop-blur-xl"
    >
      <div className="grid grid-cols-4 h-16">
        {links.map((link) => {
          const Icon = link.icon;
          const active = !link.external && isActive(link.href);
          const inner = (
            <>
              <span className="relative">
                <Icon className={cn("w-5 h-5", active ? "text-accent" : "text-text-muted")} />
                {"badge" in link && link.badge ? (
                  <span className="absolute -top-1.5 -right-2 min-w-4 h-4 px-1 rounded-full bg-accent text-white text-[10px] font-bold flex items-center justify-center">
                    {link.badge > 9 ? "9+" : link.badge}
                  </span>
                ) : null}
              </span>
              <span className={cn("text-[10px] font-medium leading-none", active ? "text-accent" : "text-text-muted")}>
                {link.label}
              </span>
            </>
          );
          const cls = cn(
            "flex flex-col items-center justify-center gap-1.5 min-h-11 transition-colors",
            active ? "text-accent" : "text-text-muted"
          );
          return link.external ? (
            <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className={cls}>
              {inner}
            </a>
          ) : (
            <Link key={link.label} href={link.href} className={cls} aria-current={active ? "page" : undefined}>
              {inner}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}