import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Verda's Digital Library",
  description: "A personal digital library organizing life, projects, and thoughts",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={playfair.className}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
