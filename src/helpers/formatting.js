import { generateArr } from './general';

export function fillZeroes(stringNumber, length) {
  const zeroes = generateArr(length - stringNumber.length)
    .map(() => '0')
    .join('');

  return zeroes + stringNumber;
}
