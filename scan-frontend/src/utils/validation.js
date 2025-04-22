export const validateINN = (inn) => {
  if (!inn) return false;
  const innStr = inn.toString();

  if (!/^\d+$/.test(innStr)) return false;

  if (innStr.length === 10) {
    const weights = [2, 4, 10, 3, 5, 9, 4, 6, 8];
    const control = innStr.split('').slice(0, 9).reduce((sum, digit, i) =>
      sum + parseInt(digit) * weights[i], 0) % 11 % 10;
    return parseInt(innStr[9]) === control;
  }

  if (innStr.length === 12) {
    const weights1 = [7, 2, 4, 10, 3, 5, 9, 4, 6, 8];
    const weights2 = [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8];

    const control1 = innStr.split('').slice(0, 10).reduce((sum, digit, i) =>
      sum + parseInt(digit) * weights1[i], 0) % 11 % 10;

    const control2 = innStr.split('').slice(0, 11).reduce((sum, digit, i) =>
      sum + parseInt(digit) * weights2[i], 0) % 11 % 10;

    return parseInt(innStr[10]) === control1 && parseInt(innStr[11]) === control2;
  }

  return false;
};

export default validateINN;