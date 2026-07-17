const API_BASE = "https://api.abacatepay.com/v2";

interface AbacateResponse<T> {
  data: T | null;
  success: boolean;
  error: string | null;
}

async function abacateFetch<T>(
  path: string,
  init?: RequestInit
): Promise<AbacateResponse<T>> {
  const apiKey = process.env.ABACATEPAY_API_KEY;
  if (!apiKey) {
    throw new Error("ABACATEPAY_API_KEY não configurada");
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      ...init?.headers,
    },
    cache: "no-store",
  });

  const body = (await res.json().catch(() => null)) as AbacateResponse<T> | null;

  if (!res.ok || !body) {
    const message =
      body?.error ?? `AbacatePay respondeu com status ${res.status}`;
    return { data: null, success: false, error: message };
  }

  return body;
}

interface Product {
  id: string;
  externalId: string;
  name: string;
  price: number;
  status: string;
}

/**
 * Busca um produto pelo externalId; cria caso ainda não exista.
 */
export async function getOrCreateProduct(params: {
  externalId: string;
  name: string;
  description: string;
  price: number;
}): Promise<Product> {
  const existing = await abacateFetch<Product>(
    `/products/get?externalId=${encodeURIComponent(params.externalId)}`
  );
  if (existing.success && existing.data) {
    return existing.data;
  }

  const created = await abacateFetch<Product>("/products/create", {
    method: "POST",
    body: JSON.stringify({
      externalId: params.externalId,
      name: params.name,
      description: params.description,
      price: params.price,
      currency: "BRL",
    }),
  });

  if (!created.success || !created.data) {
    throw new Error(created.error ?? "Falha ao criar produto no AbacatePay");
  }

  return created.data;
}

interface Customer {
  id: string;
  email: string;
}

export async function createCustomer(params: {
  name: string;
  email: string;
  cellphone: string;
  taxId: string;
  metadata?: Record<string, unknown>;
}): Promise<Customer> {
  const created = await abacateFetch<Customer>("/customers/create", {
    method: "POST",
    body: JSON.stringify({
      email: params.email,
      name: params.name,
      cellphone: params.cellphone,
      taxId: params.taxId,
      metadata: params.metadata,
    }),
  });

  if (!created.success || !created.data) {
    throw new Error(created.error ?? "Falha ao criar cliente no AbacatePay");
  }

  return created.data;
}

interface Checkout {
  id: string;
  url: string;
  amount: number;
  status: string;
}

export async function createCheckout(params: {
  items: { id: string; quantity: number }[];
  customerId: string;
  externalId: string;
  returnUrl: string;
  completionUrl: string;
  metadata?: Record<string, unknown>;
}): Promise<Checkout> {
  const created = await abacateFetch<Checkout>("/checkouts/create", {
    method: "POST",
    body: JSON.stringify({
      items: params.items,
      customerId: params.customerId,
      externalId: params.externalId,
      returnUrl: params.returnUrl,
      completionUrl: params.completionUrl,
      methods: ["PIX", "CARD"],
      card: { maxInstallments: 12 },
      metadata: params.metadata,
    }),
  });

  if (!created.success || !created.data) {
    throw new Error(created.error ?? "Falha ao criar checkout no AbacatePay");
  }

  return created.data;
}
