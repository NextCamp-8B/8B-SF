export const compareToZero = (number: number) => {
  if (number > 0) {
    return 'up';
  } else if (number < 0) {
    return 'down';
  } else {
    return 'equal';
  }
};

export const formattingPrice = (number: number) => {
  return number.toFixed(2).toLocaleString();
};
