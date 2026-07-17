export type Accommodation = "alojamento" | "camping";

export const PRICING: Record<
  Accommodation,
  { label: string; description: string; price: number; externalId: string }
> = {
  alojamento: {
    label: "Alojamento em quartos compartilhados",
    description: "Inscrição CAMP 2026 — hospedagem em quartos compartilhados",
    price: 115000, // R$ 1.150,00 em centavos
    externalId: "prod_FrksNKp30QBrBwwnsGNzTqn4",
  },
  camping: {
    label: "Camping",
    description: "Inscrição CAMP 2026 — hospedagem em camping",
    price: 60000, // R$ 600,00 em centavos
    externalId: "camp-2026-camping",
  },
};

export function formatBRL(cents: number): string {
  return (cents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
