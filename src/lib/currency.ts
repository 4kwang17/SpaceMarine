export interface CurrencyRate {
  code: string;
  name: string;
  symbol: string;
  rateToKRW: number; // 1 KRW = rateToKRW of this currency (or 1 of this currency = 1/rateToKRW KRW)
  displayName: string;
}

export const currencyRates: CurrencyRate[] = [
  {
    code: "KRW",
    name: "대한민국 원",
    symbol: "₩",
    rateToKRW: 1, // Base currency
    displayName: "WON",
  },
  {
    code: "USD",
    name: "미국 달러",
    symbol: "$",
    rateToKRW: 1300, // 1 USD = 1300 KRW
    displayName: "$",
  },
  {
    code: "JPY",
    name: "일본 엔",
    symbol: "¥",
    rateToKRW: 10, // 1 JPY = 10 KRW (approximate)
    displayName: "¥",
  },
];

export function getCurrencyRate(code: string): CurrencyRate | undefined {
  return currencyRates.find((c) => c.code === code);
}

export function convertPrice(priceKRW: number, targetCurrency: string): number {
  const currency = getCurrencyRate(targetCurrency);
  if (!currency || currency.code === "KRW") {
    return priceKRW;
  }
  
  // Convert from KRW to target currency
  // If rateToKRW = 1300, then 1 USD = 1300 KRW, so 1300 KRW / 1300 = 1 USD
  return priceKRW / currency.rateToKRW;
}

export function formatCurrency(priceKRW: number | null, currencyCode: string): string {
  if (priceKRW === null) return "";
  
  const currency = getCurrencyRate(currencyCode);
  if (!currency) return priceKRW.toLocaleString();
  
  if (currency.code === "KRW") {
    return `${currency.symbol}${priceKRW.toLocaleString("ko-KR")}`;
  }
  
  const convertedPrice = convertPrice(priceKRW, currencyCode);
  
  if (currency.code === "USD") {
    return `${currency.symbol}${convertedPrice.toFixed(2)}`;
  } else if (currency.code === "JPY") {
    return `${currency.symbol}${Math.round(convertedPrice).toLocaleString()}`;
  }
  
  return `${currency.symbol}${convertedPrice.toLocaleString()}`;
}

// Get exchange rate display text
export function getExchangeRateText(currencyCode: string): string {
  const currency = getCurrencyRate(currencyCode);
  if (!currency || currency.code === "KRW") {
    return "기준 통화";
  }
  
  return `1 ${currency.code} = ${currency.rateToKRW.toLocaleString()} KRW`;
}
