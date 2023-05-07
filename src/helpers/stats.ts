import { getMs } from "./time";
import stats, { TRIM_PERCENTAGE } from "../constants/stats";
import { Stat, StatTime, Time } from "../types";

export function calculateStats(times: Time[]): Stat[] {
  const noDnfTimes = getNoDnfTimes(times);

  if (times.length < 2) {
    return [];
  }

  return stats
    .map((stat) => {
      switch (stat.type) {
        case "SINGLE": {
          if (times.length === 0) return null;

          const all = times.map((time) => ({
            ms: getMs(time),
            includedIds: [time.id],
          }));

          return {
            ...stat,
            current: getCurrent(all),
            best: getBest(all),
            all,
          };
        }
        case "AVERAGE": {
          if (times.length < stat.size) return null;

          const averageStats = calculateAveragesOf(
            times,
            stat.size,
            calculateTrim(stat.size)
          );

          if (!averageStats) return null;

          return {
            ...stat,
            ...averageStats,
          };
        }
        case "MEAN": {
          if (!stat.size && noDnfTimes.length === 0) return null;
          if (!stat.size) {
            return {
              ...stat,
              current: calculateAverageOf(noDnfTimes),
            };
          }

          if (times.length < stat.size) return null;

          const averageStats = calculateAveragesOf(times, stat.size);

          if (!averageStats) return null;

          return {
            ...stat,
            ...averageStats,
          };
        }
        case "STANDARD_DEVIATION":
          if (noDnfTimes.length < 2) return null;

          return {
            ...stat,
            current: calculateStandardDeviation(times),
          };
        default:
          return null;
      }
    })
    .filter(Boolean);
}

export function calculateTrim(size: number) {
  return Math.ceil((size * TRIM_PERCENTAGE) / 100);
}

function calculateAverageOf(times: Time[], trim = 0) {
  return movingAverageTrimmed(times, times.length, trim)[0];
}

function calculateAveragesOf(times: Time[], size: number, trim = 0) {
  const all = movingAverageTrimmed(times, size, trim);
  return {
    all,
    current: getCurrent(all),
    best: getBest(all),
  };
}
const timeComparator = (a: Time, b: Time) => {
  if (a.dnf) return 1;
  if (b.dnf) return -1;
  return Math.sign(getMs(a) - getMs(b));
};

/**
 * Calculates the moving average, ignoring the best/worst values.
 * Example:
 * [0,7,3,2,5,1,4,4], windowSize=5, trim=1
 * LowerBound (LB) and UpperBound (UB) are the smallest or largest values that have not been trimmed.
 * [0,2,3,5,7] LB/UB 2/5, sum of counted values: 2+3+5=10 (0 and 7 are trimmed)
 *   0 moves out of the window => the LB (2) now needs to be trimmed and 3 is the new LB. (current sum 10-2=8)
 *   1 moves into the window and is lower than LB => move the value before LB(2) into the window and set it as the new LB (current sum 8+2=10)
 *   store current sum as avg[1]
 *   recalculate LB/UB.
 *   [1,2,3,5,7] LB/UB 2,5, sum: 2+3+5
 *     7 moves out of the window => the UB (5) now needs to be trimmed and 3 is the new UB. (current sum 10-5=5)
 *     4 moves into the window and is higher than UB => move the value after UB(4) into the window and set it as the new UB (current sum 5+4=9)
 *     recalculate LB/UB.
 *     [1,2,3,4,5] LB/UB 2,4
 *       3 moves out of the window. It is between LB and UB, so LB and UB remain unchanged. (current sum 9-3=6)
 *       4 moves into the window and is between LB and UB, so LB and UB remain unchanged (current sum 6+4=10)
 *       recalculate LB/UB.
 *       [1,2,4,4,5] LB/UB 2,4
 */
function movingAverageTrimmed(times: Time[], windowSize: number, trim = 0) {
  if (windowSize > times.length) return [];
  const averages = new Array(times.length - windowSize + 1);

  //The current window, sorted
  let movingWindow = times.slice(0, windowSize);
  let includedIds = movingWindow
    .filter((time) => !time.dnf)
    .map((time) => time.id);
  let excludedIds = movingWindow
    .filter((time) => time.dnf)
    .map((time) => time.id);

  movingWindow = movingWindow.sort(timeComparator);

  //Track the amount of DNFs to set the average to Infinity, when dnfCount > trim
  let dnfCount = movingWindow.reduce(
    (dnfs, time) => (time.dnf ? dnfs + 1 : dnfs),
    0
  );
  const avgScaling = windowSize - 2 * trim;

  //The lowest value that has not been trimmed
  let lowerBoundary = movingWindow[trim];

  //The highest ...
  let upperBoundary = movingWindow[windowSize - 1 - trim];
  let currentSum = 0;

  for (let i = trim; i < windowSize - trim; i++) {
    currentSum += getMsDnfOrElse(movingWindow[i], 0);
  }

  averages[0] = {
    ms: dnfCount > trim ? Infinity : currentSum / avgScaling,
    includedIds: includedIds.slice(),
    excludedIds: excludedIds.slice(),
  };

  for (let i = 1; i < averages.length; i++) {
    const expiredValue = times[i - 1]; //The value falling out of the moving avg window
    const newValue = times[i + windowSize - 1]; //The one coming into the window

    if (expiredValue.dnf) {
      excludedIds = excludedIds.slice(1);
      dnfCount--;
    } else {
      includedIds = includedIds.slice(1);
    }

    //If expired is below the boundary, we need another value to trim => The value of lowerBoundary will now be trimmed
    if (timeComparator(expiredValue, lowerBoundary) < 0) {
      currentSum -= getMsDnfOrElse(lowerBoundary, 0);
      lowerBoundary = movingWindow[trim + 1];
    }
    //Same for upper boundary
    else if (timeComparator(expiredValue, upperBoundary) > 0) {
      currentSum -= getMsDnfOrElse(upperBoundary, 0);
      upperBoundary = movingWindow[windowSize - 2 - trim];
    }
    //The expired value is removed without affecting the boundary
    else {
      currentSum -= getMsDnfOrElse(expiredValue, 0);
    }

    if (newValue.dnf) {
      excludedIds.push(newValue.id);
      dnfCount++;
    } else {
      includedIds.push(newValue.id);
    }

    //Same logic (in reverse) for the new value.
    swapValueInSortedArray(movingWindow, expiredValue, newValue); //Remove the expired value, and insert the new one

    if (timeComparator(newValue, lowerBoundary) < 0) {
      currentSum += getMsDnfOrElse(movingWindow[trim], 0);
    } else if (timeComparator(newValue, upperBoundary) > 0) {
      currentSum += getMsDnfOrElse(movingWindow[windowSize - 1 - trim], 0);
    } else {
      currentSum += getMsDnfOrElse(newValue, 0);
    }

    //Adjust the boundary unconditionally
    lowerBoundary = movingWindow[trim];
    upperBoundary = movingWindow[windowSize - 1 - trim];
    averages[i] = {
      ms: dnfCount > trim ? Infinity : currentSum / avgScaling,
      includedIds: includedIds.slice(),
      excludedIds: excludedIds.slice(),
    };
  }
  return averages;
}

function getMsDnfOrElse(time: Time, elseVal: number) {
  return time.dnf ? elseVal : getMs(time);
}

//Removes oldVal and puts newVal into a sorted array
function swapValueInSortedArray(values: Time[], oldVal: Time, newVal: Time) {
  if (!oldVal.dnf) {
    const oldIndex = findInsertionSpot(values, oldVal);

    if (oldIndex < values.length - 1) {
      values.copyWithin(oldIndex, oldIndex + 1);
    }
  }

  let newIndex;

  if (newVal.dnf) {
    newIndex = values.length - 1;
  } else {
    newIndex = findInsertionSpot(values, newVal);

    if (newIndex == values.length) {
      newIndex--;
    }
  }

  values.copyWithin(newIndex + 1, newIndex);
  values[newIndex] = newVal;
}

function findInsertionSpot(values: Time[], target: Time) {
  return binarySearch(values, target, 0, values.length - 1);
}

function binarySearch(
  values: Time[],
  target: Time,
  min: number,
  max: number
): number {
  const index = Math.max(0, Math.floor((min + max) / 2));

  if (min >= max) {
    if (timeComparator(values[index], target) >= 0) {
      return index;
    }
    return index + 1;
  }

  const val = values[index];

  if (timeComparator(val, target) < 0) {
    return binarySearch(values, target, index + 1, max);
  } else if (timeComparator(val, target) > 0) {
    return binarySearch(values, target, min, index - 1);
  } else {
    return index;
  }
}

function calculateStandardDeviation(times: Time[]) {
  const noDnfTimes = getNoDnfTimes(times);
  const mean =
    noDnfTimes.reduce((total, time) => getMs(time) + total, 0) /
    noDnfTimes.length;

  const variance =
    noDnfTimes.reduce(
      (total, time) => Math.pow(getMs(time) - mean, 2) + total,
      0
    ) /
    (noDnfTimes.length - 1);

  return { ms: Math.sqrt(variance) };
}

function getBest(times: StatTime[]) {
  return times.reduce((best, current) =>
    best.ms === current.ms || best.ms < current.ms ? best : current
  );
}

function getCurrent(times: StatTime[]) {
  return times[times.length - 1];
}

function getNoDnfTimes(times: Time[]) {
  return times.filter((time) => !time.dnf);
}
