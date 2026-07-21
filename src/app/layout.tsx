import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollProgress from "@/components/ScrollProgress";

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
  title: "G SPORTS — Premium Sports Equipment, Himatnagar",
  description:
    "Himatnagar's premier sports store | Cricket, Football, Badminton, Activewear & accessories. Family-owned since 2014. 4.7★ rated. Visit us today!",
  keywords: [
    "sports store Himatnagar", "cricket bats", "football shoes", "badminton rackets",
    "sports equipment Gujarat", "G SPORTS", "Ganpatbhai Prajapati", "Sabarkantha sports",
    "activewear", "sports shoes",
  ],
  openGraph: {
    title: "G SPORTS — Premium Sports Equipment Store",
    description: "Himatnagar's most trusted sports destination since 2014. 300+ products, 4.7★ rating.",
    url: "https://gsports-beta.vercel.app",
    siteName: "G SPORTS",
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
        <ScrollProgress />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
