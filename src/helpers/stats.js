import { generateArr } from './general';
import { getMs } from './time';
import stats, {
  AVERAGE,
  STANDARD_DEVIATION,
  TRIM_PERCENTAGE,
  MEAN,
  SINGLE
} from '../constants/stats';

export function calculateStats(times) {
  const noDnfTimes = getNoDnfTimes(times);

  if (times.length < 2) {
    return [];
  }

  return stats
    .map(stat => {
      switch (stat.type) {
        case SINGLE: {
          if (times.length === 0) return null;

          const all = times.map(getMs);

          return {
            ...stat,
            all: all,
            current: getCurrent(all),
            best: getBest(all)
          };
        }
        case AVERAGE: {
          if (times.length < stat.size) return null;

          const averageStats = calculateAveragesOf(times, stat.size, calculateTrim(stat.size));

          if (!averageStats) return null;

          return {
            ...stat,
            ...averageStats
          };
        }
        case MEAN: {
          if (!stat.size && noDnfTimes.length === 0) return null;

          if (!stat.size) {
            return {
              ...stat,
              current: calculateAverageOf(noDnfTimes)
            };
          }

          if (times.length < stat.size) return null;

          const averageStats = calculateAveragesOf(times, stat.size);

          if (!averageStats) return null;

          return {
            ...stat,
            ...averageStats
          };
        }
        case STANDARD_DEVIATION:
          if (noDnfTimes.length < 2) return null;

          return {
            ...stat,
            current: calculateStandardDeviation(times)
          };
        default:
          return null;
      }
    })
    .filter(Boolean);
}

export function calculateTrim(size) {
  return Math.ceil((size * TRIM_PERCENTAGE) / 100);
}

function calculateAveragesOf(times, size, trim = 0) {
  const all = generateArr(times.length + 1 - size).map(index =>
    calculateAverageOf(times.slice(index, index + size), trim)
  );

  return {
    all,
    current: getCurrent(all),
    best: getBest(all)
  };
}

function calculateAverageOf(times, trim = 0) {
  const dnfs = times.reduce((dnfs, time) => (time.dnf ? dnfs + 1 : dnfs), 0);

  if (dnfs > trim) {
    return Infinity;
  }

  const totalTime = [...times]
    .sort((a, b) => Math.sign(getMs(a) - getMs(b)))
    .slice(trim, trim === 0 ? undefined : -1 * trim)
    .filter(time => !time.dnf)
    .reduce((totalTimes, time) => totalTimes + getMs(time), 0);

  return totalTime / (times.length - trim * 2);
}

function calculateStandardDeviation(times) {
  const noDnfTimes = getNoDnfTimes(times);
  const mean = noDnfTimes.reduce((total, time) => getMs(time) + total, 0) / noDnfTimes.length;
  const variance =
    noDnfTimes.reduce((total, time) => Math.pow(getMs(time) - mean, 2) + total, 0) /
    (noDnfTimes.length - 1);

  return Math.sqrt(variance);
}

function getBest(times) {
  return times.reduce((best, current) => (best === current || best < current ? best : current));
}

function getCurrent(times) {
  return times[times.length - 1];
}

function getNoDnfTimes(times) {
  return times.filter(time => !time.dnf);
}
