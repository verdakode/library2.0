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
  icons: {
    icon: [
      {
        url: '/images/minecraftbookshelf.png',
        sizes: '32x32',
        type: 'image/png'
      },
      {
        url: '/images/minecraftbookshelf.png',
        sizes: '16x16',
        type: 'image/png'
      }
    ],
    apple: {
      url: '/images/minecraftbookshelf.png',
      sizes: '180x180',
      type: 'image/png'
    }
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${cinzel.variable} ${cormorant.variable}`}>
      <head>
        <link rel="icon" href="/images/minecraftbookshelf.png" />
        <link rel="shortcut icon" href="/images/minecraftbookshelf.png" />
        <link rel="apple-touch-icon" href="/images/minecraftbookshelf.png" />
      </head>
      <body className={`${playfair.className} antialiased`}>{children}</body>
    </html>
  );
}
