import { generateArr } from './general';

export function calculateStats(times) {
  return {
    average: calculateAverageTime(times),
    ao5: calculateAverageOf(times, 5, 1),
    ao12: calculateAverageOf(times, 12, 1),
    ao25: calculateAverageOf(times, 25, 1),
    ao50: calculateAverageOf(times, 50, 3),
    ao100: calculateAverageOf(times, 100, 5),
    mo3: calculateMean(times, 3)
  }
}

function calculateAverageTime(times) {
  const total = times.reduce((totalTimes, time) => totalTimes + time.ms, 0);

  return total / times.length;
}

function calculateAverageOf(times, amount, deviation = 1) {
  if (times.length < amount) {
    return undefined;
  }

  const middleTimes = times.slice(-1 * amount)
    .sort((a, b) => a.ms - b.ms)
    .slice(deviation, -1 * deviation);

  return calculateAverageTime(middleTimes);
}

function calculateMean(times, series) {
  if (times.length < series) {
    return undefined;
  }

  return generateArr(times.length - (series - 1))
    .reduce((mean, _, index) => {
      const average = calculateAverageTime(times.slice(index, index + series))

      return average < mean ? average : mean;
    }, Infinity);
}

export function markBestTime(times) {
  const bestTime = Math.min(...times.map(time => time.ms));

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
