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
  metadataBase: new URL("https://camp.targetteal.com"),
  title: "CAMP 2026 — Uma desconferência sobre autogestão",
  description:
    "Uma desconferência para quem cultiva sistemas sociais mais vivos. 15 a 18 de outubro de 2026, Vila dos Portões, Araçariguama - SP.",
  openGraph: {
    title: "CAMP 2026 — Uma desconferência sobre autogestão",
    description:
      "Uma desconferência para quem cultiva sistemas sociais mais vivos. 15 a 18 de outubro de 2026, Vila dos Portões, Araçariguama - SP.",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/camp2026-og.jpg",
        width: 1200,
        height: 630,
        alt: "CAMP 2026 — Uma desconferência sobre autogestão",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/camp2026-og.jpg"],
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
