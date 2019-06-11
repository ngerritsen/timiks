import { generateArr } from './general';

export function fillZeroes(stringNumber, length, toEnd = false) {
  const zeroes = generateArr(length - stringNumber.length)
    .map(() => '0')
    .join('');

  if (toEnd) {
    return stringNumber + zeroes;
  }

  return zeroes + stringNumber;
}

export function decapitalize(string) {
  return string.charAt(0).toLowerCase() + string.substring(1);
}
