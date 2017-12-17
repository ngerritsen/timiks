export function calculateAverageTime(times) {
  const total = times.reduce((totalTimes, time) => totalTimes + time.ms, 0);

  return total / times.length;
}

export function markBestTime(times) {
  const bestTime = Math.min(...times.map(time => time.ms));

  return times.map(time => (
    time.ms === bestTime ? { ...time, best: true } : time
  ));
}

