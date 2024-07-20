import { Locale } from '@/types/next-auth';

export const formattingPrice = (number: number) => {
  return number.toFixed(2).toLocaleString();
};

export const getStockStyle = (
  comparePrice: number,
  ratio: number,
) => {
  if (comparePrice > 0) {
    return {
      color: 'text-warning-100',
      comparePrice: `▲${Math.abs(comparePrice).toFixed(2)}`,
      ratio: `+${(ratio * 100).toFixed(2)}%`,
    };
  } else if (comparePrice < 0) {
    return {
      color: 'text-secondary-600',
      comparePrice: `▼${Math.abs(comparePrice).toFixed(2)}`,
      ratio: `${(ratio * 100).toFixed(2)}%`,
    };
  } else {
    return {
      color: '',
      comparePrice: `${Math.abs(comparePrice).toFixed(2)}`,
      ratio: `${(ratio * 100).toFixed(2)}%`,
    };
  }
};

export const getExchangePrice = (
  dollarRate: number,
  compareRate: number,
  price: number,
  locale: Locale,
) => {
  const rate = dollarRate / compareRate;
  const exchangePrice = rate * price;

  switch (locale) {
    case 'zh':
      return `CNY ${Number(
        exchangePrice.toFixed(2),
      ).toLocaleString()}`;
    case 'fr':
      return `EUR ${Number(
        exchangePrice.toFixed(2),
      ).toLocaleString()}`;
    case 'en':
      return `USD ${Number(
        exchangePrice.toFixed(2),
      ).toLocaleString()}`;
    case 'ko':
      return `KRW ${Number(
        exchangePrice.toFixed(2),
      ).toLocaleString()}`;
    case 'ja':
      return `JPY ${Number(
        (exchangePrice * 100).toFixed(2),
      ).toLocaleString()}`;
  }
};

export const getFormat = (locale: Locale) => {
  switch (locale) {
    case 'zh':
    case 'ja':
      return `¥`;
    case 'fr':
      return '€';
    case 'en':
      return '$';
    case 'ko':
      return '₩';
  }
};
