import { NextRequest, NextResponse } from "next/server";
import { createCheckout } from "@/lib/payments";
import { PRICING, type Accommodation } from "@/lib/pricing";

export const runtime = "nodejs";

interface ParticipanteAdicional {
  nome: string;
  pronomes: string;
  hospedagem: Accommodation;
  acessibilidade: string;
  restricaoAlimentar: string;
}

interface InscricaoPayload {
  nome: string;
  pronomes: string;
  email: string;
  telefone: string;
  cpf: string;
  cidade: string;
  experienciaAutogestao: string;
  hospedagem: Accommodation;
  tipoQuarto: string;
  acessibilidade: string;
  restricaoAlimentar: string[];
  edicoesAnteriores: string[];
  carona: string;
  acompanhantes: string;
  observacoes?: string;
  participantesAdicionais?: ParticipanteAdicional[];
}

function isValidCpf(raw: string): boolean {
  const cpf = raw.replace(/\D/g, "");
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

  const digit = (sliceEnd: number) => {
    let sum = 0;
    for (let i = 0; i < sliceEnd; i++) {
      sum += parseInt(cpf[i], 10) * (sliceEnd + 1 - i);
    }
    const rest = (sum * 10) % 11;
    return rest === 10 ? 0 : rest;
  };

  return digit(9) === parseInt(cpf[9], 10) && digit(10) === parseInt(cpf[10], 10);
}

function validate(body: InscricaoPayload): string | null {
  const required: [keyof InscricaoPayload, string][] = [
    ["nome", "Nome"],
    ["pronomes", "Pronomes"],
    ["email", "E-mail"],
    ["telefone", "Telefone"],
    ["cpf", "CPF"],
    ["cidade", "Cidade de origem"],
    ["experienciaAutogestao", "Experiência com autogestão"],
    ["hospedagem", "Hospedagem"],
    ["tipoQuarto", "Tipo de quarto"],
    ["acessibilidade", "Acessibilidade"],
    ["carona", "Carona"],
    ["acompanhantes", "Acompanhantes"],
  ];

  for (const [key, label] of required) {
    const value = body[key];
    if (typeof value !== "string" || value.trim() === "") {
      return `Campo obrigatório: ${label}`;
    }
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email.trim())) {
    return "E-mail inválido";
  }
  if (!isValidCpf(body.cpf)) {
    return "CPF inválido";
  }
  if (!(body.hospedagem in PRICING)) {
    return "Opção de hospedagem inválida";
  }
  if (!Array.isArray(body.restricaoAlimentar) || body.restricaoAlimentar.length === 0) {
    return "Campo obrigatório: Restrição alimentar";
  }
  if (!Array.isArray(body.edicoesAnteriores) || body.edicoesAnteriores.length === 0) {
    return "Campo obrigatório: Participação em edições anteriores";
  }

  if (body.participantesAdicionais !== undefined) {
    if (!Array.isArray(body.participantesAdicionais)) {
      return "Participantes adicionais inválidos";
    }
    for (let index = 0; index < body.participantesAdicionais.length; index++) {
      const extra = body.participantesAdicionais[index];
      const fields: [keyof ParticipanteAdicional, string][] = [
        ["nome", "Nome"],
        ["pronomes", "Pronomes"],
        ["acessibilidade", "Acessibilidade"],
        ["restricaoAlimentar", "Restrição alimentar"],
      ];
      for (const [key, label] of fields) {
        const value = extra[key];
        if (typeof value !== "string" || value.trim() === "") {
          return `Participante adicional ${index + 1} — campo obrigatório: ${label}`;
        }
      }
      if (!(extra.hospedagem in PRICING)) {
        return `Participante adicional ${index + 1} — opção de hospedagem inválida`;
      }
    }
  }
  return null;
}

export async function POST(request: NextRequest) {
  let body: InscricaoPayload;
  try {
    body = (await request.json()) as InscricaoPayload;
  } catch {
    return NextResponse.json({ error: "Corpo da requisição inválido" }, { status: 400 });
  }

  const validationError = validate(body);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const origin = request.nextUrl.origin;
  const extras = body.participantesAdicionais ?? [];

  // Quantidade de ingressos por tipo de hospedagem (titular + adicionais)
  const quantities: Record<Accommodation, number> = { alojamento: 0, camping: 0 };
  quantities[body.hospedagem] += 1;
  for (const extra of extras) {
    quantities[extra.hospedagem] += 1;
  }

  const orderId = `camp2026-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const paymentItems = (Object.keys(quantities) as Accommodation[])
    .filter((key) => quantities[key] > 0)
    .map((key) => {
      const pricing = PRICING[key];
      return {
        externalId: pricing.externalId,
        name: `CAMP 2026 — ${pricing.label}`,
        description: pricing.description,
        price: pricing.price,
        quantity: quantities[key],
      };
    });

  try {
    const checkout = await createCheckout({
      items: paymentItems,
      customer: {
        name: body.nome.trim(),
        email: body.email.trim(),
        cellphone: body.telefone.trim(),
        taxId: body.cpf.replace(/\D/g, ""),
      },
      externalId: orderId,
      returnUrl: `${origin}/inscricao`,
      completionUrl: `${origin}/inscricao/sucesso`,
      metadata: {
        nome: body.nome.trim(),
        pronomes: body.pronomes.trim(),
        email: body.email.trim(),
        telefone: body.telefone.trim(),
        cidade: body.cidade.trim(),
        experienciaAutogestao: body.experienciaAutogestao.trim(),
        hospedagem: body.hospedagem,
        tipoQuarto: body.tipoQuarto.trim(),
        acessibilidade: body.acessibilidade.trim(),
        restricaoAlimentar: body.restricaoAlimentar.join(", "),
        edicoesAnteriores: body.edicoesAnteriores.join(", "),
        carona: body.carona.trim(),
        acompanhantes: body.acompanhantes.trim(),
        observacoes: body.observacoes?.trim() ?? "",
        participantesAdicionais: extras
          .map(
            (extra, index) =>
              `${index + 1}. ${extra.nome.trim()} | pronomes: ${extra.pronomes.trim()} | hospedagem: ${extra.hospedagem} | acessibilidade: ${extra.acessibilidade.trim()} | restrição alimentar: ${extra.restricaoAlimentar.trim()}`
          )
          .join(" || "),
      },
    });

    return NextResponse.json({ url: checkout.url });
  } catch (error) {
    console.error("Erro ao criar checkout:", error);
    const message =
      error instanceof Error ? error.message : "Erro inesperado ao criar checkout";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
