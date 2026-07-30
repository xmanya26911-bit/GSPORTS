import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";

const inter = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-display", display: "swap" });

export const metadata: Metadata = {
  title: { default: "Golden Willowe Sports — Premium Cricket Bats", template: "%s – Golden Willowe Sports" },
  description: "India\u2019s premier cricket bat manufacturer. Handcrafted premium English & Kashmir willow bats since 2010. Factory-direct pricing from Srinagar.",
  openGraph: {
    type: "website", locale: "en_IN", siteName: "Golden Willowe Sports",
    title: "Golden Willowe Sports — Premium Cricket Bats",
    description: "Handcrafted premium English & Kashmir willow bats from Srinagar.",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
  metadataBase: new URL("https://goldenwillowe.vercel.app"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">
        <AnnouncementBar />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
