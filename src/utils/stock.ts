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
