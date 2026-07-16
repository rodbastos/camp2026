import {
  Calendar,
  MapPin,
  Clock,
  Home,
  UtensilsCrossed,
  Banknote,
  Link2,
  Leaf,
  Sprout,
  Users,
  HeartHandshake,
  Trees,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import Faq from "@/components/Faq";
import Gallery from "@/components/Gallery";

const INSCRICAO_URL = "https://forms.gle/Gq7Hmm1qiVkSoU2p6";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-serif text-4xl md:text-5xl font-bold text-forest tracking-tight">
      {children}
    </h2>
  );
}

export default function Page() {
  return (
    <main className="texture-paper">
      {/* ===== Nav ===== */}
      <header className="sticky top-0 z-50 bg-cream/90 backdrop-blur border-b border-sand/50">
        <nav className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
          <a href="#" className="font-serif text-xl font-bold tracking-wide">
            CAMP 2026
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm">
            <a href="#experiencia" className="hover:text-terracotta transition-colors">
              Experiência
            </a>
            <a href="#local" className="hover:text-terracotta transition-colors">
              Local
            </a>
            <a href="#edicoes-passadas" className="hover:text-terracotta transition-colors">
              Edições
            </a>
            <a href="#informacoes" className="hover:text-terracotta transition-colors">
              Investimento
            </a>
            <a href="#faq" className="hover:text-terracotta transition-colors">
              FAQ
            </a>
          </div>
          <a
            href={INSCRICAO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-terracotta px-4 py-2 text-sm font-semibold text-cream hover:bg-terracotta-dark transition-colors"
          >
            Inscreva-se
          </a>
        </nav>
      </header>

      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="font-serif text-7xl md:text-8xl font-black leading-[0.95] tracking-tight">
              CAMP
              <br />
              2026
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed">
              Uma desconferência para quem cultiva sistemas sociais mais vivos.
            </p>

            <div className="mt-8 space-y-3 text-base">
              <p className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-terracotta" />
                <span className="font-semibold">15—18 OUT 2026</span>
              </p>
              <p className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-terracotta" />
                <span>Vila dos Portões · Araçariguama, SP</span>
              </p>
            </div>

            <div className="mt-10 flex flex-col items-start gap-4">
              <a
                href={INSCRICAO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-terracotta px-8 py-4 text-lg font-semibold text-cream shadow-lg shadow-terracotta/25 hover:bg-terracotta-dark transition-colors"
              >
                Quero participar
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="blob-mask aspect-[4/5] max-h-[560px] w-full shadow-2xl">
              <img
                src="/hero.jpg"
                alt="Camp 2026 na natureza"
                className="h-full w-full object-cover"
              />
            </div>
            <Sprout className="absolute -bottom-6 -left-6 h-20 w-20 text-forest/30 rotate-12" />
            <Leaf className="absolute -top-4 -right-4 h-16 w-16 text-forest/25 -rotate-45" />
          </div>
        </div>
      </section>

      {/* ===== Informações práticas ===== */}
      <section id="informacoes" className="bg-forest text-cream">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight">
            Informações práticas
          </h2>
          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex gap-4">
              <MapPin className="h-6 w-6 shrink-0 text-sand" />
              <div>
                <h3 className="font-semibold">Local</h3>
                <p className="mt-1 text-cream/80 text-sm leading-relaxed">
                  Vila dos Portões — Estrada São Roque a Araçariguama, 1.971,
                  Araçariguama - SP (cerca de 1h de São Paulo)
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Calendar className="h-6 w-6 shrink-0 text-sand" />
              <div>
                <h3 className="font-semibold">Data</h3>
                <p className="mt-1 text-cream/80 text-sm leading-relaxed">
                  15 a 18 de outubro (quinta a domingo)
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Clock className="h-6 w-6 shrink-0 text-sand" />
              <div>
                <h3 className="font-semibold">Check-in e checkout</h3>
                <p className="mt-1 text-cream/80 text-sm leading-relaxed">
                  Check-in: dia 15, a partir das 15h
                  <br />
                  Checkout: dia 18, até as 10h
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Home className="h-6 w-6 shrink-0 text-sand" />
              <div>
                <h3 className="font-semibold">Hospedagem</h3>
                <p className="mt-1 text-cream/80 text-sm leading-relaxed">
                  Quartos compartilhados (com possibilidade de quarto feminino) ou camping
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <UtensilsCrossed className="h-6 w-6 shrink-0 text-sand" />
              <div>
                <h3 className="font-semibold">Alimentação</h3>
                <p className="mt-1 text-cream/80 text-sm leading-relaxed">
                  Café da manhã, almoço e jantar inclusos (informe qualquer
                  restrição alimentar na inscrição)
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Banknote className="h-6 w-6 shrink-0 text-sand" />
              <div>
                <h3 className="font-semibold">Investimento</h3>
                <p className="mt-1 text-cream/80 text-sm leading-relaxed">
                  R$ 1.100 por pessoa, em alojamento
                  <br />
                  R$ 800 por pessoa, em camping
                </p>
              </div>
            </div>
          </div>
          <div className="mt-12 flex flex-col items-start gap-4 border-t border-cream/15 pt-8 md:flex-row md:items-center md:justify-between">
            <p className="max-w-xl text-cream/80 text-sm">
              O Camp não tem fins lucrativos. É organizado totalmente pela
              comunidade e para a comunidade.
            </p>
            <a
              href={INSCRICAO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-terracotta px-6 py-3 font-semibold text-cream hover:bg-terracotta-dark transition-colors"
            >
              <Link2 className="h-4 w-4" />
              Fazer inscrição
            </a>
          </div>
        </div>
      </section>

      {/* ===== O que é o Camp ===== */}
      <section id="experiencia" className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <SectionTitle>O que é o Camp?</SectionTitle>
        <div className="mt-8 grid gap-10 md:grid-cols-2">
          <div className="space-y-5 text-lg leading-relaxed">
            <p>
              O Camp 2026 será uma imersão de 4 dias na Vila dos Portões, em
              Araçariguama, no interior de São Paulo. O tema central é a{" "}
              <strong>autogestão</strong>, ou seja, formas de organizar times,
              comunidades e projetos sem depender de uma hierarquia fixa de
              chefes e comandos, onde as próprias pessoas decidem, se organizam
              e se responsabilizam juntas.
            </p>
            <p>
              Se você nunca ouviu falar de autogestão ou está começando a se
              interessar pelo assunto, este é um ótimo lugar para começar: não é
              preciso ter experiência prévia, só curiosidade genuína.
            </p>
          </div>
          <div className="space-y-5 text-lg leading-relaxed">
            <p>
              Diferente de imersões tradicionais, com palestras marcadas e
              palestrantes definidos com antecedência, aqui a programação é
              construída pelas próprias pessoas presentes, ao longo da imersão.
            </p>
            <p>
              Todos são bem-vindos para propor uma roda de conversa, uma
              atividade ou simplesmente para participar das que outras pessoas
              propuserem. <em>Tudo é convite, você não é obrigado a nada.</em>
            </p>
          </div>
        </div>
      </section>

      {/* ===== Para quem / Para quê ===== */}
      <section className="bg-cream-dark/60">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24 grid gap-16 md:grid-cols-2">
          <div>
            <SectionTitle>Para quem é o Camp?</SectionTitle>
            <ul className="mt-8 space-y-4">
              {[
                "Pessoas interessadas e dispostas a vivenciar um ambiente totalmente autogerido;",
                "Pessoas que já praticam autogestão e querem trocar experiências com outros grupos e organizações;",
                "Pessoas curiosas sobre o tema, que nunca experimentaram autogestão na prática e querem entender como ela funciona de verdade;",
                "Pessoas que tentam aplicar autogestão em sua organização e enfrentam dificuldades no caminho;",
                "Agentes de mudança interessados em conhecer casos reais de outras organizações e aprender coisas novas;",
                "Membros da comunidade Target Teal que querem se conectar mais profundamente;",
                "Apaixonados por natureza.",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <Sprout className="mt-1 h-5 w-5 shrink-0 text-terracotta" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionTitle>Para quê é o Camp?</SectionTitle>
            <ul className="mt-8 space-y-6">
              {[
                {
                  icon: HeartHandshake,
                  text: "Fortalecer os vínculos da comunidade Target Teal;",
                },
                {
                  icon: Sparkles,
                  text: "Trazer casos reais e vivências concretas de autogestão;",
                },
                {
                  icon: Users,
                  text: "Dar espaço para que todas as pessoas participantes construam a imersão junto;",
                },
                {
                  icon: Trees,
                  text: "Proporcionar conexão com a natureza;",
                },
                {
                  icon: MessageCircle,
                  text: "Reunir agentes de mudança para compartilhar as ideias sobre alegrias e os desafios de como as organizações funcionam, ou poderiam funcionar.",
                },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest text-cream">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="leading-relaxed pt-2">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ===== Como vai funcionar ===== */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <SectionTitle>Como vai funcionar?</SectionTitle>
        <div className="mt-8 grid gap-12 md:grid-cols-2">
          <div className="space-y-5 text-lg leading-relaxed">
            <p>
              A imersão é <strong>autogerida, do início ao fim</strong>, desde a
              organização de caronas até a energização de papéis em círculos com
              propósito explícito, passando pela construção das atividades.
            </p>
            <p>
              Usamos a metodologia <strong>Open Space</strong> (Espaço Aberto),
              que dá uma estrutura simples para a criação da agenda: todas as
              pessoas são convidadas a propor sessões, sobre o que quiserem
              discutir ou compartilhar. Não é necessário ser especialista em
              nada, só trazer um interesse ou uma pergunta genuína.
            </p>
            <p>
              Essa é a tradição das <strong>Desconferências</strong>: encontros
              autogeridos para troca de ideias, aprendizado e conexão entre
              pessoas.
            </p>
          </div>
          <div className="rounded-2xl bg-forest p-8 md:p-10 text-cream shadow-xl">
            <h3 className="font-serif text-2xl font-bold">
              Princípios do Open Space
            </h3>
            <ol className="mt-6 space-y-4">
              {[
                "As pessoas que vierem são as pessoas certas",
                "A hora que começar é a hora certa para começar",
                "O que acontecer é a única coisa que poderia ter acontecido",
                "Quando acabar, acabou",
                "Onde for, é o lugar certo",
              ].map((principle, i) => (
                <li key={principle} className="flex gap-4">
                  <span className="font-serif text-2xl font-bold text-sand">
                    {i + 1}
                  </span>
                  <span className="pt-1 leading-relaxed">{principle}</span>
                </li>
              ))}
            </ol>
            <p className="mt-8 border-t border-cream/15 pt-6 text-sm text-cream/80 leading-relaxed">
              Esses princípios existem justamente para tirar a pressão de
              &ldquo;fazer do jeito certo&rdquo;. Eles convidam a confiar no
              processo e nas pessoas presentes, mesmo que tudo seja novidade.
            </p>
          </div>
        </div>
      </section>

      {/* ===== Sobre a Vila dos Portões ===== */}
      <section id="local" className="bg-forest text-cream">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight">
            Sobre a Vila dos Portões
          </h2>
          <div className="mt-10 grid gap-10 md:grid-cols-2 items-center">
          <div className="space-y-5 text-lg leading-relaxed text-cream/90">
            <p>
              A Vila dos Portões é um espaço único, que mistura natureza,
              história, cultura e arquitetura. Foi criado em 1971 por Leyla
              Mattoso, uma apaixonada por peças de demolição. A construção
              começou com material trazido de uma casa do século XVIII que
              estava abandonada em Cotia. Nas palavras da idealizadora,
              &ldquo;já nasceu com 200 anos de idade&rdquo;.
            </p>
            <a
              href="https://www.viladosportoes.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-terracotta px-6 py-3 font-semibold text-cream hover:bg-terracotta-dark transition-colors"
            >
              <Link2 className="h-4 w-4" />
              Conheça a Vila dos Portões
            </a>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <img
              src="/vila1.jpg"
              alt="Fachada e detalhes arquitetônicos da Vila dos Portões"
              className="aspect-[4/5] w-full rounded-2xl object-cover shadow-lg"
            />
            <img
              src="/vila2.png"
              alt="Paisagem e estrutura da Vila dos Portões"
              className="aspect-[4/5] w-full rounded-2xl object-cover shadow-lg sm:mt-8"
            />
          </div>
          </div>
        </div>
      </section>

      {/* ===== Edições passadas ===== */}
      <section
        id="edicoes-passadas"
        className="bg-cream-dark/60 texture-paper-light"
      >
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <SectionTitle>Edições passadas</SectionTitle>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-forest/85">
            Veja como foram as outras edições do CAMP
          </p>
          <div className="mt-10">
            <Gallery />
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq" className="bg-cream-dark/60 texture-paper-light">
        <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
          <SectionTitle>Perguntas frequentes</SectionTitle>
          <div className="mt-10">
            <Faq />
          </div>
        </div>
      </section>

      {/* ===== CTA final ===== */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24 text-center">
        <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight">
          Vem cultivar com a gente
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed">
          15 a 18 de outubro de 2026,{" "}
          <span className="whitespace-nowrap">na Vila dos Portões, Araçariguama - SP.</span>
        </p>
        <a
          href={INSCRICAO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block rounded-xl bg-terracotta px-10 py-4 text-lg font-semibold text-cream shadow-lg shadow-terracotta/25 hover:bg-terracotta-dark transition-colors"
        >
          Quero participar
        </a>
      </section>

      {/* ===== Footer ===== */}
      <footer className="border-t border-sand/60">
        <div className="mx-auto max-w-6xl px-6 py-8 flex flex-col items-center gap-2 text-sm text-forest/70 md:flex-row md:justify-between">
          <span className="font-serif font-bold text-forest">CAMP 2026</span>
          <span>
            Organizado pela comunidade, para a comunidade. Sem fins lucrativos.
          </span>
        </div>
      </footer>
    </main>
  );
}
