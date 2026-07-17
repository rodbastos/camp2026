import {
  createCheckout as createAbacateCheckout,
  createCustomer as createAbacateCustomer,
  getOrCreateProduct,
} from "./abacatepay";
import { createPreference } from "./mercadopago";

export type PaymentProvider = "abacatepay" | "mercadopago";

export const DEFAULT_PAYMENT_PROVIDER: PaymentProvider = "mercadopago";

export function currentProvider(): PaymentProvider {
  const configured = process.env.PAYMENT_PROVIDER;
  if (configured === "abacatepay" || configured === "mercadopago") {
    return configured;
  }
  return DEFAULT_PAYMENT_PROVIDER;
}

export interface PaymentItem {
  externalId: string;
  name: string;
  description: string;
  price: number; // em centavos
  quantity: number;
}

export interface PaymentCustomer {
  name: string;
  email: string;
  cellphone: string;
  taxId: string;
}

export interface PaymentCheckoutParams {
  items: PaymentItem[];
  customer: PaymentCustomer;
  externalId: string;
  returnUrl: string;
  completionUrl: string;
  metadata?: Record<string, unknown>;
}

export interface PaymentCheckoutResult {
  url: string;
}

export async function createCheckout(
  params: PaymentCheckoutParams
): Promise<PaymentCheckoutResult> {
  const provider = currentProvider();

  if (provider === "abacatepay") {
    const products = await Promise.all(
      params.items.map(async (item) => {
        const product = await getOrCreateProduct({
          externalId: item.externalId,
          name: item.name,
          description: item.description,
          price: item.price,
        });
        return { id: product.id, quantity: item.quantity };
      })
    );

    const customer = await createAbacateCustomer({
      name: params.customer.name,
      email: params.customer.email,
      cellphone: params.customer.cellphone,
      taxId: params.customer.taxId,
    });

    const checkout = await createAbacateCheckout({
      items: products,
      customerId: customer.id,
      externalId: params.externalId,
      returnUrl: params.returnUrl,
      completionUrl: params.completionUrl,
      metadata: params.metadata,
    });

    return { url: checkout.url };
  }

  const preference = await createPreference({
    items: params.items.map((item) => ({
      name: item.name,
      description: item.description,
      price: item.price,
      quantity: item.quantity,
    })),
    payer: {
      name: params.customer.name,
      email: params.customer.email,
      cellphone: params.customer.cellphone,
      taxId: params.customer.taxId,
    },
    externalReference: params.externalId,
    backUrls: {
      success: params.completionUrl,
      pending: params.completionUrl,
      failure: params.returnUrl,
    },
    metadata: params.metadata,
  });

  return { url: preference.init_point };
}
