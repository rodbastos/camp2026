"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQ_ITEMS: { question: string; answer: string }[] = [
  {
    question: "Quem serão os palestrantes do evento?",
    answer:
      "Todos os inscritos poderão apresentar, facilitar ou anfitriar sessões durante o evento. Essas sessões poderão ter duração e formato variados, o limite é a sua imaginação. Se você quiser tirar dúvidas ou pedir ajuda para a montagem de uma sessão é só nos enviar uma mensagem.",
  },
  {
    question: "Quais as melhores opções de transporte até Vila dos Portões?",
    answer:
      "A Vila dos Portões fica na Estrada São Roque a Araçariguama, 1.971, Araçariguama - SP, a cerca de 1h de São Paulo. A organização de caronas é feita pela própria comunidade — mais detalhes serão compartilhados com os inscritos.",
  },
  {
    question: "Como será a alimentação?",
    answer:
      "Café da manhã, almoço e jantar estão inclusos no valor da inscrição. Teremos uma equipe de apoio na cozinha, mas seguindo o espírito da autogestão, voluntários participantes do CAMP assumirão funções para auxiliar neste trabalho. Informe qualquer restrição alimentar no formulário de inscrição.",
  },
  {
    question: "Como será a hospedagem?",
    answer:
      "A hospedagem será em quartos compartilhados, com possibilidade de quarto feminino. Também há a opção de camping, com valor de inscrição reduzido. Haverá uma equipe de apoio, mas será bastante reduzida. Estaremos responsáveis pela organização dos espaços que utilizamos, assim como pela limpeza dos quartos (retirada do lixo, colocação de toalhas para secagem, etc).",
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
      "Existem duas grandes diferenças em relação ao formato. Primeiro, teremos algo que em alguns lugares é chamado de desconferência. Ou seja, um espaço aberto de troca, no qual todos podem propor sessões que abordam autogestão ou temas correlatos (pensamento sistêmico, facilitação, etc). A segunda diferença é que todo restante do evento, como preparar alimentos, limpar os espaços, conduzir atividades recreativas, etc, acontecerá com o envolvimento ativo de todos os presentes. Para organizar tudo isso, faremos uso de uma tecnologia social chamada O2, com uma estrutura de papéis e círculos.",
  },
  {
    question:
      "Além de conversas sobre o tema autogestão, haverá atividades recreativas?",
    answer:
      "Sim, e todos estão convidados a propor e conduzir atividades lúdicas, recreativas e que não têm uma conexão direta com o tema do evento. Você pode trazer instrumentos musicais, jogos de tabuleiro e o que achar interessante para aproveitar ao máximo os dias no CAMP.",
  },
  {
    question:
      "Posso levar acompanhantes que não vão participar das discussões sobre autogestão?",
    answer:
      "Sim. Você pode levar acompanhantes, porém todos precisam assumir papéis em círculos que atuam na logística do evento e devem igualmente pagar a taxa de inscrição. Se esse for o seu caso, coloque quem serão seus acompanhantes na ficha de inscrição, no campo Observações, e não esqueça de gerar uma nova inscrição para cada acompanhante e efetuar o pagamento de cada participante via pix. Se preferir efetuar um único pagamento com o valor da sua inscrição mais o valor da inscrição do acompanhante, então entre em contato com a gente.",
  },
  {
    question: "Com quem eu posso tirar outras dúvidas sobre o Camp?",
    answer:
      "Manda uma mensagem no Whatsapp para ?? no ",
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
