import type { Metadata } from "next";
import { Playfair_Display, Cinzel, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: '--font-playfair',
});

const cinzel = Cinzel({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600"],
  variable: '--font-cinzel',
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: '--font-cormorant',
});

export const metadata: Metadata = {
  title: "Verda's Digital Library",
  description: "A personal digital library organizing life, projects, and thoughts",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${cinzel.variable} ${cormorant.variable}`}>
      <body className={`${playfair.className} antialiased`}>{children}</body>
    </html>
  );
}
