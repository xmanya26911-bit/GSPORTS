import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollProgress from "@/components/ScrollProgress";
import CustomCursor from "@/components/CustomCursor";
import NoiseOverlay from "@/components/NoiseOverlay";
import LoadingScreen from "@/components/LoadingScreen";
import Spotlight from "@/components/Spotlight";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Golden Willowe Sports — Premium Cricket Bats | Kashmir & English Willow",
  description:
    "Kashmir's premier cricket bat manufacturer | Premium English & Kashmir willow bats. Handcrafted by Imran Ali. 15+ years of excellence.",
  keywords: [
    "cricket bats Kashmir", "English willow bats", "Kashmir willow bats",
    "Golden Willowe Sports", "Imran Ali", "Kashmir cricket bats",
    "activewear", "sports shoes",
  ],
  openGraph: {
    title: "Golden Willowe Sports — Premium Cricket Bats",
    description: "Kashmir's premier cricket bat maker since 2010. Handcrafted English & Kashmir willow bats, factory-direct prices.",
    url: "https://goldenwillowe.vercel.app",
    siteName: "Golden Willowe Sports",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A0A0A",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-bg text-text font-sans antialiased">
        <LoadingScreen />
        <Spotlight />
        <NoiseOverlay />
        <CustomCursor />
        <ScrollProgress />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
