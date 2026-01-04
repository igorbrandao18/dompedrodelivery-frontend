/**
 * Formata valor em centavos para reais brasileiros
 */
export function formatCentsToBrl(cents: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(cents / 100);
}

/**
 * Formata valor numérico para reais brasileiros
 */
export function formatBrl(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

/**
 * Converte string de reais para número (ex: "R$ 1.234,56" -> 1234.56)
 */
export function parseBrlToNumber(value: string): number {
  // Remove "R$ ", espaços e pontos, substitui vírgula por ponto
  const cleanValue = value
    .replace(/R\$\s*/g, '')
    .replace(/\./g, '')
    .replace(',', '.');
  
  return parseFloat(cleanValue) || 0;
}

/**
 * Converte valor para centavos
 */
export function convertToCents(value: number): number {
  return Math.round(value * 100);
}
