import { generateArr } from './general';
import { getMs } from './time';

export function calculateStats(times) {
  return {
    ao5: calculateAveragesOf(times, 5, 1),
    ao12: calculateAveragesOf(times, 12, 1),
    ao25: calculateAveragesOf(times, 25, 2),
    ao50: calculateAveragesOf(times, 50, 3),
    ao100: calculateAveragesOf(times, 100, 5),
    mo3: calculateAveragesOf(times, 3, 0)
  }
}

function calculateAveragesOf(times, amount, deviation = 1) {
  if (times.length < amount) {
    return null;
  }

  const result = generateArr(times.length + 1 - amount)
    .map(index => calculateAverageOf(times.slice(index, index + amount), deviation))

  const best = result.reduce((total, current) =>
      (total === current || total < current)
        ? total
        : current);

  return {
    current: result[result.length - 1],
    best
  }
}

function calculateAverageOf(times, deviation = 1) {
  const dnfs = times.reduce((dnfs, time) => time.dnf ? dnfs + 1 : dnfs, 0);

  if (dnfs > deviation) {
    return 'DNF';
  }

  const totalTime = times
    .sort((a, b) => getMs(a) - getMs(b))
    .slice(deviation, deviation === 0 ? undefined : (-1 * deviation))
    .filter(time => !time.dnf)
    .reduce((totalTimes, time) => totalTimes + getMs(time), 0);

  return totalTime / times.length;
}

export function markBestTime(times) {
  const bestTime = Math.min(...times.map(time => getMs(time)));

  return times.map(time => (
    time.ms === bestTime ? { ...time, best: true } : time
  ));
}

export function markShowDetails(times, id) {
  return times.map(time => ({
    ...time,
    showDetails: time.id === id
  }));
}

export function getFirstDate(times) {
  return new Date(Math.min(...times.map(time => time.date.getTime())));
}
