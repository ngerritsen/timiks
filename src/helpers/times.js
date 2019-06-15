import { getMs } from './time';

export function isCurrent(time) {
  return Boolean(time.current);
}

export function getId(time) {
  return time.id;
}

export function markBestTime(times) {
  if (times.length < 2) {
    return times;
  }

  const bestTime = Math.min(...times.map(time => getMs(time)));

  if (bestTime === Infinity) {
    return times;
  }

  return times.map(time => (getMs(time) === bestTime ? { ...time, best: true } : time));
}
