export function formatCurrency(cents: number) {
  if (cents === 0) return "Grátis";

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 2,
  }).format(cents / 100);
}

