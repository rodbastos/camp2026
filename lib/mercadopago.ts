const API_BASE = "https://api.mercadopago.com";

export interface MercadoPagoPreference {
  id: string;
  init_point: string;
  sandbox_init_point: string;
}

interface MPPhone {
  area_code: string;
  number: string;
}

interface MPIdentification {
  type: string;
  number: string;
}

interface MPPayer {
  name: string;
  surname: string;
  email: string;
  phone?: MPPhone;
  identification?: MPIdentification;
}

function parsePhone(raw: string): MPPhone | undefined {
  let digits = raw.replace(/\D/g, "");
  if (digits.length === 0) return undefined;
  if (digits.startsWith("55") && digits.length > 10) {
    digits = digits.slice(2);
  }
  const areaCode = digits.slice(0, 2);
  const number = digits.slice(2);
  if (areaCode.length < 2 || number.length < 8) return undefined;
  return { area_code: areaCode, number };
}

function splitName(full: string): { name: string; surname: string } {
  const parts = full.trim().split(/\s+/);
  if (parts.length === 1) return { name: parts[0] ?? "", surname: "" };
  const [first, ...rest] = parts;
  return { name: first ?? "", surname: rest.join(" ") };
}

async function mpFetch<T>(path: string, init: RequestInit): Promise<T> {
  const token = process.env.MERCADOPAGO_ACCESS_TOKEN;
  if (!token) {
    throw new Error("MERCADOPAGO_ACCESS_TOKEN não configurada");
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...init.headers,
    },
    cache: "no-store",
  });

  const body = (await res.json().catch(() => null)) as
    | { message?: string; error?: string }
    | T
    | null;

  if (!res.ok) {
    const message =
      (body as { message?: string } | null)?.message ??
      (body as { error?: string } | null)?.error ??
      `Mercado Pago respondeu com status ${res.status}`;
    throw new Error(message);
  }

  if (!body) {
    throw new Error("Resposta vazia do Mercado Pago");
  }

  return body as T;
}

export interface PreferenceItem {
  name: string;
  description: string;
  price: number; // em centavos
  quantity: number;
}

export interface PreferencePayer {
  name: string;
  email: string;
  cellphone: string;
  taxId: string;
}

export interface PreferenceBackUrls {
  success: string;
  pending: string;
  failure: string;
}

export async function createPreference(params: {
  items: PreferenceItem[];
  payer: PreferencePayer;
  externalReference: string;
  backUrls: PreferenceBackUrls;
  metadata?: Record<string, unknown>;
}): Promise<MercadoPagoPreference> {
  const { name, surname } = splitName(params.payer.name);
  const phone = parsePhone(params.payer.cellphone);
  const autoReturn = params.backUrls.success.startsWith("https://");

  const preference = await mpFetch<MercadoPagoPreference>("/checkout/preferences", {
    method: "POST",
    body: JSON.stringify({
      items: params.items.map((item) => ({
        title: item.name,
        description: item.description,
        quantity: item.quantity,
        currency_id: "BRL",
        unit_price: item.price / 100,
      })),
      payer: {
        name,
        surname,
        email: params.payer.email,
        ...(phone ? { phone } : {}),
        identification: {
          type: "CPF",
          number: params.payer.taxId.replace(/\D/g, ""),
        },
      } as MPPayer,
      back_urls: params.backUrls,
      ...(autoReturn ? { auto_return: "approved" } : {}),
      payment_methods: {
        excluded_payment_methods: [],
        excluded_payment_types: [],
        installments: 12,
      },
      external_reference: params.externalReference,
      metadata: params.metadata ?? {},
    }),
  });

  return preference;
}
