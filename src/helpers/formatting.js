import { generateArr } from './general';

export function formatTime(ms) {
  const time = new Date(ms);

  return [
    time.getMinutes(),
    time.getSeconds(),
    Math.round(time.getMilliseconds() / 10)
  ]
    .map(number => fillZeroes(number.toString(), 2))
    .join(':');
}

function fillZeroes(stringNumber, length) {
  const zeroes = generateArr(length - stringNumber.length)
    .map(() => '0')
    .join('');

  return zeroes + stringNumber
}
