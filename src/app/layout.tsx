import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { MobileNav } from "@/components/layout/MobileNav";

const inter = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-display", display: "swap" });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0B0D" },
  ],
};

export const metadata: Metadata = {
  title: { default: "Golden Willowe Sports — Premium Cricket Bats", template: "%s – Golden Willowe Sports" },
  description: "India\u2019s premier cricket bat manufacturer. Handcrafted premium English & Kashmir willow bats since 2010. Factory-direct pricing from Srinagar.",
  metadataBase: new URL("https://goldenwillowe.vercel.app"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Golden Willowe Sports",
    title: "Golden Willowe Sports — Premium Cricket Bats",
    description: "Handcrafted premium English & Kashmir willow bats from Srinagar.",
    url: "https://goldenwillowe.vercel.app",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: "Golden Willowe Sports" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Golden Willowe Sports — Premium Cricket Bats",
    description: "Handcrafted premium English & Kashmir willow bats from Srinagar.",
    images: ["/images/og-image.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "(function(){try{var t=localStorage.getItem('theme');var d=t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(d){document.documentElement.classList.add('dark');}}catch(e){}})();" }} />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <AnnouncementBar />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <div className="h-16 lg:hidden" aria-hidden="true" />
        <MobileNav />
      </body>
    </html>
  );
}
