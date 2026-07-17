import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin, MessageCircle } from "lucide-react";
import InscricaoForm from "@/components/InscricaoForm";

export const metadata: Metadata = {
  title: "Inscrição — CAMP 2026",
  description:
    "Faça sua inscrição para o CAMP 2026. 15 a 18 de outubro, Vila dos Portões, Araçariguama - SP.",
};

export default function InscricaoPage() {
  return (
    <main className="texture-paper min-h-screen">
      <header className="sticky top-0 z-50 bg-cream/90 backdrop-blur border-b border-sand/50">
        <nav className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
          <Link href="/" className="font-serif text-xl font-bold tracking-wide">
            CAMP 2026
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 text-sm hover:text-terracotta transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar ao site
          </Link>
        </nav>
      </header>

      <section className="mx-auto max-w-3xl px-6 py-12 md:py-16">
        <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight">
          Inscrição
        </h1>
        <div className="mt-4 space-y-2 text-forest/85">
          <p className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-terracotta" />
            <span className="font-semibold">15—18 OUT 2026</span>
          </p>
          <p className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-terracotta" />
            <span>Vila dos Portões · Araçariguama, SP</span>
          </p>
        </div>
        <p className="mt-6 text-lg leading-relaxed text-forest/85">
          Preencha o formulário abaixo e, em seguida, você será direcionado(a)
          para o pagamento via Pix ou cartão de crédito.
        </p>

        <a
          href="https://wa.me/5511961989567"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 rounded-xl border border-forest/15 bg-cream px-4 py-2 text-sm font-medium text-forest hover:border-terracotta hover:text-terracotta transition-colors"
        >
          <MessageCircle className="h-4 w-4" />
          Dúvidas? Fale com Camila no WhatsApp
        </a>

        <div className="mt-10 rounded-2xl border border-forest/10 bg-cream p-6 md:p-10 shadow-sm">
          <InscricaoForm />
        </div>
      </section>
    </main>
  );
}
