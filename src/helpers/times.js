export function calculateAverageTime(times) {
  const total = times.reduce((totalTimes, time) => totalTimes + time.ms, 0);

  return total / times.length;
}

export function calculateAverageTimeOfBestThree(times) {
  const bestThreeTimes = [...times]
    .sort((a, b) => a.ms - b.ms)
    .slice(0, 3);

  return calculateAverageTime(bestThreeTimes);
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
