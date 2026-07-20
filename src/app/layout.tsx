import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "G SPORTS | Himatnagar's Premier Sports Store – Cricket, Football & Activewear",
  description:
    "G SPORTS in Himatnagar, Gujarat – your one-stop shop for cricket bats, football gear, badminton equipment, activewear & sports shoes. 4.7★ from 250+ reviews.",
  keywords:
    "GSports, G SPORTS, Himatnagar, sports store, cricket bats, football gear, badminton, sports shoes, activewear, Sabarkantha, Ganpatbhai Prajapati",
  openGraph: {
    title: "G SPORTS – Himatnagar's Trusted Sports Store",
    description:
      "Premium cricket equipment, football gear, badminton, activewear & sports shoes. 4.7★ rated. Visit the best sports shop in Himatnagar!",
    url: "https://gsports.vercel.app",
    siteName: "G SPORTS",
    locale: "en_IN",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col font-sans antialiased bg-bg text-text-body">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
