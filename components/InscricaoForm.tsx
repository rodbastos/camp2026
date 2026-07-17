"use client";

import { useState } from "react";
import { Loader2, CreditCard, QrCode, UserPlus, Trash2 } from "lucide-react";
import { PRICING, formatBRL, type Accommodation } from "@/lib/pricing";

const PRONOUN_OPTIONS = ["ela/ dela", "ele/ dele", "elu/ delu"];
const RESTRICAO_OPTIONS = [
  "Nenhuma",
  "Vegetariano",
  "Vegano",
  "Intolerante a glúten",
  "Intolerante a lactose",
];
const EDICOES_OPTIONS = ["2025", "2024", "2023", "2022", "2019", "Nunca participei"];

interface ExtraParticipant {
  nome: string;
  pronomes: string;
  hospedagem: Accommodation;
  acessibilidade: string;
  restricaoAlimentar: string;
}

const EMPTY_EXTRA: ExtraParticipant = {
  nome: "",
  pronomes: "",
  hospedagem: "alojamento",
  acessibilidade: "",
  restricaoAlimentar: "",
};

const inputClass =
  "w-full rounded-xl border border-forest/20 bg-cream px-4 py-3 text-forest placeholder:text-forest/40 focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/30 transition";

function Field({
  label,
  required = true,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block font-semibold leading-snug">
        {label}
        {required && <span className="text-terracotta"> *</span>}
      </label>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function maskCpf(value: string): string {
  return value
    .replace(/\D/g, "")
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

export default function InscricaoForm() {
  const [nome, setNome] = useState("");
  const [pronomes, setPronomes] = useState("");
  const [pronomesOutro, setPronomesOutro] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");
  const [cidade, setCidade] = useState("");
  const [experiencia, setExperiencia] = useState("");
  const [hospedagem, setHospedagem] = useState<Accommodation | "">("");
  const [tipoQuarto, setTipoQuarto] = useState("");
  const [acessibilidade, setAcessibilidade] = useState("");
  const [restricoes, setRestricoes] = useState<string[]>([]);
  const [restricaoOutro, setRestricaoOutro] = useState("");
  const [edicoes, setEdicoes] = useState<string[]>([]);
  const [carona, setCarona] = useState("");
  const [acompanhantes, setAcompanhantes] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [extras, setExtras] = useState<ExtraParticipant[]>([]);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateExtra = (
    index: number,
    patch: Partial<ExtraParticipant>
  ) => {
    setExtras((list) =>
      list.map((extra, i) => (i === index ? { ...extra, ...patch } : extra))
    );
  };

  const total =
    (hospedagem ? PRICING[hospedagem].price : 0) +
    extras.reduce((sum, extra) => sum + PRICING[extra.hospedagem].price, 0);

  const toggle = (
    value: string,
    list: string[],
    setList: (v: string[]) => void
  ) => {
    if (value === "Nenhuma" || value === "Nunca participei") {
      setList(list.includes(value) ? [] : [value]);
      return;
    }
    const cleaned = list.filter((v) => v !== "Nenhuma" && v !== "Nunca participei");
    setList(
      cleaned.includes(value)
        ? cleaned.filter((v) => v !== value)
        : [...cleaned, value]
    );
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const pronomesFinal = pronomes === "outro" ? pronomesOutro.trim() : pronomes;
    if (!pronomesFinal) {
      setError("Informe seus pronomes.");
      return;
    }
    if (!hospedagem) {
      setError("Escolha onde você quer se hospedar.");
      return;
    }
    const restricoesFinal = restricoes.includes("outro-marcado")
      ? [...restricoes.filter((r) => r !== "outro-marcado"), restricaoOutro.trim()]
      : restricoes;
    if (restricoesFinal.length === 0 || restricoesFinal.some((r) => r === "")) {
      setError("Informe sua restrição alimentar.");
      return;
    }
    if (edicoes.length === 0) {
      setError("Informe se você já participou do CAMP.");
      return;
    }
    for (let i = 0; i < extras.length; i++) {
      const extra = extras[i];
      if (
        !extra.nome.trim() ||
        !extra.pronomes.trim() ||
        !extra.acessibilidade.trim() ||
        !extra.restricaoAlimentar.trim()
      ) {
        setError(`Preencha todos os campos do participante adicional ${i + 1}.`);
        return;
      }
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome,
          pronomes: pronomesFinal,
          email,
          telefone,
          cpf,
          cidade,
          experienciaAutogestao: experiencia,
          hospedagem,
          tipoQuarto,
          acessibilidade,
          restricaoAlimentar: restricoesFinal,
          edicoesAnteriores: edicoes,
          carona,
          acompanhantes,
          observacoes,
          participantesAdicionais: extras,
        }),
      });

      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        throw new Error(data.error ?? "Não foi possível iniciar o pagamento.");
      }

      window.location.href = data.url;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro inesperado. Tente novamente."
      );
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Field label="Qual seu nome (como você gostaria de ser chamado(a))?">
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
          className={inputClass}
          placeholder="Seu nome"
        />
      </Field>

      <Field label="Quais são seus pronomes?">
        <div className="space-y-2">
          {PRONOUN_OPTIONS.map((option) => (
            <label key={option} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="pronomes"
                checked={pronomes === option}
                onChange={() => setPronomes(option)}
                className="h-4 w-4 accent-terracotta"
              />
              <span>{option}</span>
            </label>
          ))}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="pronomes"
              checked={pronomes === "outro"}
              onChange={() => setPronomes("outro")}
              className="h-4 w-4 accent-terracotta"
            />
            <span>Outro:</span>
            <input
              type="text"
              value={pronomesOutro}
              onChange={(e) => {
                setPronomesOutro(e.target.value);
                setPronomes("outro");
              }}
              className={`${inputClass} py-2`}
              placeholder="Escreva aqui"
            />
          </label>
        </div>
      </Field>

      <Field label="Qual seu e-mail?">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={inputClass}
          placeholder="voce@exemplo.com"
        />
      </Field>

      <Field label="Qual seu telefone para contato (WhatsApp)?">
        <input
          type="tel"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          required
          className={inputClass}
          placeholder="(11) 99999-9999"
        />
      </Field>

      <Field label="Qual seu CPF? (usado para o pagamento)">
        <input
          type="text"
          inputMode="numeric"
          value={cpf}
          onChange={(e) => setCpf(maskCpf(e.target.value))}
          required
          className={inputClass}
          placeholder="000.000.000-00"
        />
      </Field>

      <Field label="Qual sua cidade de origem?">
        <input
          type="text"
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
          required
          className={inputClass}
          placeholder="Cidade - UF"
        />
      </Field>

      <Field label="Você já teve alguma experiência com autogestão? Em caso afirmativo, comente brevemente.">
        <textarea
          value={experiencia}
          onChange={(e) => setExperiencia(e.target.value)}
          required
          rows={3}
          className={inputClass}
        />
      </Field>

      <Field label="Onde você quer se hospedar?">
        <div className="grid gap-3 sm:grid-cols-2">
          {(Object.keys(PRICING) as Accommodation[]).map((key) => {
            const option = PRICING[key];
            const selected = hospedagem === key;
            return (
              <label
                key={key}
                className={`flex cursor-pointer flex-col rounded-2xl border-2 p-4 transition ${
                  selected
                    ? "border-terracotta bg-terracotta/10"
                    : "border-forest/15 hover:border-forest/30"
                }`}
              >
                <input
                  type="radio"
                  name="hospedagem"
                  checked={selected}
                  onChange={() => setHospedagem(key)}
                  className="sr-only"
                />
                <span className="font-semibold">{option.label}</span>
                <span className="mt-1 font-serif text-2xl font-bold text-terracotta">
                  {formatBRL(option.price)}
                </span>
              </label>
            );
          })}
        </div>
      </Field>

      <Field label="Você prefere que sua hospedagem seja em:">
        <div className="space-y-2">
          {["quarto misto", "quarto feminino"].map((option) => (
            <label key={option} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="tipoQuarto"
                checked={tipoQuarto === option}
                onChange={() => setTipoQuarto(option)}
                required
                className="h-4 w-4 accent-terracotta"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </Field>

      <Field label="Você possui alguma necessidade de acessibilidade ou cuidado especial que devemos saber?">
        <textarea
          value={acessibilidade}
          onChange={(e) => setAcessibilidade(e.target.value)}
          required
          rows={2}
          className={inputClass}
        />
      </Field>

      <Field label="Você possui alguma restrição alimentar?">
        <div className="space-y-2">
          {RESTRICAO_OPTIONS.map((option) => (
            <label key={option} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={restricoes.includes(option)}
                onChange={() => toggle(option, restricoes, setRestricoes)}
                className="h-4 w-4 accent-terracotta"
              />
              <span>{option}</span>
            </label>
          ))}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={restricoes.includes("outro-marcado")}
              onChange={() => toggle("outro-marcado", restricoes, setRestricoes)}
              className="h-4 w-4 accent-terracotta"
            />
            <span>Outro:</span>
            <input
              type="text"
              value={restricaoOutro}
              onChange={(e) => setRestricaoOutro(e.target.value)}
              className={`${inputClass} py-2`}
              placeholder="Escreva aqui"
            />
          </label>
        </div>
      </Field>

      <Field label="Você já participou do CAMP? Se sim, quais edições?">
        <div className="space-y-2">
          {EDICOES_OPTIONS.map((option) => (
            <label key={option} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={edicoes.includes(option)}
                onChange={() => toggle(option, edicoes, setEdicoes)}
                className="h-4 w-4 accent-terracotta"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </Field>

      <Field label="Você precisa de carona ou pode oferecer carona? Em caso afirmativo, informe o trecho e a quantidade de vagas solicitadas ou ofertadas.">
        <textarea
          value={carona}
          onChange={(e) => setCarona(e.target.value)}
          required
          rows={2}
          className={inputClass}
        />
      </Field>

      <Field label="Você está indo sozinho ou com algum amigo(a) ou companheiro(a)? Conta pra gente quem é?">
        <textarea
          value={acompanhantes}
          onChange={(e) => setAcompanhantes(e.target.value)}
          required
          rows={2}
          className={inputClass}
        />
      </Field>

      <Field label="Você quer deixar alguma observação, sugestão ou pergunta?" required={false}>
        <textarea
          value={observacoes}
          onChange={(e) => setObservacoes(e.target.value)}
          rows={3}
          className={inputClass}
        />
      </Field>

      <div className="border-t border-forest/10 pt-8">
        <h3 className="font-serif text-2xl font-bold">
          Pagar por outros participantes
        </h3>
        <p className="mt-2 text-forest/75 leading-relaxed">
          Você pode incluir ingressos de amigos(as) ou acompanhantes nesta mesma
          inscrição e fazer um único pagamento. Informe os dados de cada pessoa
          abaixo.
        </p>

        <div className="mt-6 space-y-6">
          {extras.map((extra, index) => (
            <div
              key={index}
              className="rounded-2xl border border-forest/15 bg-cream-dark/40 p-5 md:p-6 space-y-5"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">
                  Participante adicional {index + 1}
                </h4>
                <button
                  type="button"
                  onClick={() =>
                    setExtras((list) => list.filter((_, i) => i !== index))
                  }
                  className="flex items-center gap-1.5 text-sm text-terracotta hover:text-terracotta-dark transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                  Remover
                </button>
              </div>

              <Field label="Nome (como gostaria de ser chamado(a))">
                <input
                  type="text"
                  value={extra.nome}
                  onChange={(e) => updateExtra(index, { nome: e.target.value })}
                  required
                  className={inputClass}
                  placeholder="Nome da pessoa"
                />
              </Field>

              <Field label="Pronomes">
                <input
                  type="text"
                  value={extra.pronomes}
                  onChange={(e) =>
                    updateExtra(index, { pronomes: e.target.value })
                  }
                  required
                  className={inputClass}
                  placeholder="ela/dela, ele/dele, elu/delu…"
                />
              </Field>

              <Field label="Onde essa pessoa quer se hospedar?">
                <div className="grid gap-3 sm:grid-cols-2">
                  {(Object.keys(PRICING) as Accommodation[]).map((key) => {
                    const option = PRICING[key];
                    const selected = extra.hospedagem === key;
                    return (
                      <label
                        key={key}
                        className={`flex cursor-pointer flex-col rounded-2xl border-2 p-4 transition ${
                          selected
                            ? "border-terracotta bg-terracotta/10"
                            : "border-forest/15 hover:border-forest/30"
                        }`}
                      >
                        <input
                          type="radio"
                          name={`extra-hospedagem-${index}`}
                          checked={selected}
                          onChange={() =>
                            updateExtra(index, { hospedagem: key })
                          }
                          className="sr-only"
                        />
                        <span className="font-semibold">{option.label}</span>
                        <span className="mt-1 font-serif text-xl font-bold text-terracotta">
                          {formatBRL(option.price)}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </Field>

              <Field label="Necessidade de acessibilidade ou cuidado especial">
                <textarea
                  value={extra.acessibilidade}
                  onChange={(e) =>
                    updateExtra(index, { acessibilidade: e.target.value })
                  }
                  required
                  rows={2}
                  className={inputClass}
                  placeholder='Se não houver, escreva "nenhuma"'
                />
              </Field>

              <Field label="Restrição alimentar">
                <input
                  type="text"
                  value={extra.restricaoAlimentar}
                  onChange={(e) =>
                    updateExtra(index, { restricaoAlimentar: e.target.value })
                  }
                  required
                  className={inputClass}
                  placeholder="Nenhuma, vegetariano, vegano, sem glúten…"
                />
              </Field>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setExtras((list) => [...list, { ...EMPTY_EXTRA }])}
          className="mt-6 flex items-center gap-2 rounded-xl border-2 border-dashed border-forest/25 px-5 py-3 font-semibold text-forest/80 hover:border-terracotta hover:text-terracotta transition-colors"
        >
          <UserPlus className="h-5 w-5" />
          Adicionar participante
        </button>
      </div>

      {error && (
        <p className="rounded-xl border border-terracotta/40 bg-terracotta/10 px-4 py-3 text-sm font-medium text-terracotta-dark">
          {error}
        </p>
      )}

      <div className="border-t border-forest/10 pt-6">
        {hospedagem && (
          <p className="mb-4 text-lg">
            Total:{" "}
            <span className="font-serif text-2xl font-bold text-terracotta">
              {formatBRL(total)}
            </span>{" "}
            <span className="text-forest/70">
              ({1 + extras.length}{" "}
              {extras.length === 0 ? "ingresso" : "ingressos"})
            </span>
          </p>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="flex w-full items-center justify-center gap-3 rounded-xl bg-terracotta px-8 py-4 text-lg font-semibold text-cream shadow-lg shadow-terracotta/25 transition-colors hover:bg-terracotta-dark disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Preparando pagamento…
            </>
          ) : (
            "Ir para o pagamento"
          )}
        </button>
        <p className="mt-3 flex items-center justify-center gap-4 text-sm text-forest/70">
          <span className="flex items-center gap-1.5">
            <QrCode className="h-4 w-4" /> Pix
          </span>
          <span className="flex items-center gap-1.5">
            <CreditCard className="h-4 w-4" /> Cartão em até 12x
          </span>
        </p>
      </div>
    </form>
  );
}
