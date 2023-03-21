const NUMBER_FORMAT = new Intl.NumberFormat('pt-BR', {});

const PRICE_FORMAT = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: "BRL"
});

export function formatNumber(number: number) {
  return NUMBER_FORMAT.format(number);
}

export function formatPrice(number: number) {
  return PRICE_FORMAT.format(number);
}
