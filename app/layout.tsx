import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CAMP 2026 — Uma desconferência sobre autogestão",
  description:
    "Uma desconferência para quem cultiva sistemas sociais mais vivos. 15 a 18 de outubro de 2026, Vila dos Portões, Araçariguama - SP.",
  openGraph: {
    title: "CAMP 2026",
    description:
      "Uma desconferência para quem cultiva sistemas sociais mais vivos. 15 a 18 de outubro, Araçariguama - SP.",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body
        className={`${playfair.variable} ${inter.variable} font-sans bg-cream text-forest antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
