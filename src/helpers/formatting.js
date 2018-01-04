import { generateArr } from './general';

export function formatTime(ms) {
  const time = new Date(ms);

  return [
    [time.getMinutes(), 2],
    [time.getSeconds(), 2],
    [time.getMilliseconds(), 3]
  ]
    .map((number, length) => fillZeroes(number.toString(), length))
    .join(':');
}

export function fillZeroes(stringNumber, length) {
  const zeroes = generateArr(length - stringNumber.length)
    .map(() => '0')
    .join('');

  return zeroes + stringNumber
}
