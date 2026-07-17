import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ArrowLeft, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Inscrição confirmada — CAMP 2026",
};

export default function SucessoPage() {
  return (
    <main className="texture-paper flex min-h-screen flex-col">
      <header className="bg-cream/90 backdrop-blur border-b border-sand/50">
        <nav className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
          <Link href="/" className="font-serif text-xl font-bold tracking-wide">
            CAMP 2026
          </Link>
        </nav>
      </header>

      <section className="mx-auto flex max-w-2xl flex-1 flex-col items-center justify-center px-6 py-16 text-center">
        <CheckCircle2 className="h-16 w-16 text-forest" />
        <h1 className="mt-6 font-serif text-4xl md:text-5xl font-bold tracking-tight">
          Inscrição confirmada!
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-forest/85">
          Recebemos seu pagamento e sua vaga no CAMP 2026 está garantida. Em
          breve entraremos em contato pelo WhatsApp e e-mail informados com os
          próximos passos.
        </p>
        <p className="mt-2 text-forest/70">
          Nos vemos de 15 a 18 de outubro, na Vila dos Portões, Araçariguama - SP.
        </p>
        <a
          href="https://wa.me/5511961989567"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex items-center gap-2 rounded-xl border border-forest/15 bg-cream px-6 py-3 text-base font-medium text-forest hover:border-terracotta hover:text-terracotta transition-colors"
        >
          <MessageCircle className="h-5 w-5" />
          Dúvidas? Fale com Camila no WhatsApp
        </a>
        <Link
          href="/"
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-terracotta px-8 py-4 text-lg font-semibold text-cream shadow-lg shadow-terracotta/25 hover:bg-terracotta-dark transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          Voltar ao site
        </Link>
      </section>
    </main>
  );
}
