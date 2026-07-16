"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQ_ITEMS: { question: string; answer: string }[] = [
  {
    question: "Quem serão os palestrantes do evento?",
    answer:
      "Todos os inscritos poderão apresentar, facilitar ou anfitriar sessões durante o evento. Essas sessões poderão ter duração e formato variados, o limite é a sua imaginação. Se você quiser tirar dúvidas ou pedir ajuda para a montagem de uma sessão, envie uma mensagem em nosso Discord.",
  },
  {
    question: "Quais as melhores opções de transporte até Vila dos Portões?",
    answer:
      "A Vila dos Portões fica na Estrada São Roque a Araçariguama, 1.971, Araçariguama - SP, a cerca de 1h de São Paulo. A organização de caronas é feita pela própria comunidade — mais detalhes serão compartilhados com os inscritos.",
  },
  {
    question: "Como será a alimentação?",
    answer:
      "Café da manhã, almoço e jantar estão inclusos no valor da inscrição. Informe qualquer restrição alimentar no formulário de inscrição.",
  },
  {
    question: "Como será a hospedagem?",
    answer:
      "A hospedagem será em quartos compartilhados, com possibilidade de quarto feminino. Também há a opção de camping, com valor de inscrição reduzido.",
  },
  {
    question: "Quais serão os horários de check-in e checkout?",
    answer:
      "Check-in no dia 15 de outubro, a partir das 15h. Checkout no dia 18 de outubro, até as 10h.",
  },
  {
    question:
      "Quais as principais diferenças desse evento para uma conferência regular?",
    answer:
      "Diferente de conferências tradicionais, com palestras marcadas e palestrantes definidos com antecedência, aqui a programação é construída pelas próprias pessoas presentes, ao longo da imersão, usando a metodologia Open Space. Todos são bem-vindos para propor sessões ou simplesmente participar. Tudo é convite, você não é obrigado a nada.",
  },
  {
    question:
      "Além de conversas sobre o tema autogestão, haverá atividades recreativas?",
    answer:
      "Sim! Qualquer pessoa pode propor atividades, sejam rodas de conversa, dinâmicas ou atividades recreativas. Além disso, a Vila dos Portões oferece muito contato com a natureza.",
  },
  {
    question:
      "Posso levar acompanhantes que não vão participar das discussões sobre autogestão?",
    answer:
      "Entre em contato com a organização pelo nosso Discord para conversarmos sobre o seu caso.",
  },
  {
    question: "Com quem eu posso tirar outras dúvidas sobre o Camp?",
    answer:
      "Envie uma mensagem em nosso Discord — a comunidade terá prazer em ajudar.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-forest/10 rounded-2xl border border-forest/10 bg-cream">
      {FAQ_ITEMS.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-semibold hover:text-terracotta transition-colors"
              aria-expanded={isOpen}
            >
              <span>{item.question}</span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isOpen && (
              <p className="px-6 pb-6 leading-relaxed text-forest/85">
                {item.answer}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
