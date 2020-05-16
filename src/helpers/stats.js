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

          const all = times.map(time => ({ ms: getMs(time), includedIds: [time.id] }));

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
  return {
    all: movingAverageTrimmed(times, size, trim),
    current: getCurrent(all),
    best: getBest(all)
  };
}

const timeComparator = (a, b) => {
	if (a.dnf) return 1;
	if (b.dnf) return -1;
	return Math.sign(getMs(a) - getMs(b));
};

function movingAverageTrimmed(times, windowSize, trim = 0) {
    if(windowSize > times.length) return [];
    let averages = new Array(times.length - windowSize + 1);
	//The current window, sorted

    let movingWindow = times.slice(0, windowSize);
	let includedIds = movingWindow.filter(time => !time.dnf).map(time => time.id);
	let excludedIds = movingWindow.filter(time => time.dnf).map(time => time.id);
	movingWindow = movingWindow.sort(timeComparator);
	let dnfCount = movingWindow.reduce((dnfs, time) => (time.dnf ? dnfs + 1 : dnfs), 0);
    const avgScaling = windowSize - 2 * trim;
	//The lowest value that has not been trimmed
    let lowerBoundary = movingWindow[trim];
	//The highest ...
    let upperBoundary = movingWindow[windowSize - 1 - trim];
    let currentSum = 0;
    for(let i = trim; i < windowSize - trim; i++) {
        currentSum += getMsDnfOrElse(movingWindow[i], 0);
    }
	averages[0] = {
		ms: dnfCount > trim ? Infinity : currentSum / avgScaling,
		includedIds: includedIds.slice(),
		excludedIds: excludedIds.slice()
	};
    for(let i = 1; i < averages.length; i++) {
        const expiredValue = times[i - 1]; //The value falling out of the moving avg window
        const newValue = times[i + windowSize - 1]; //The one coming into the window
		if(expiredValue.dnf) {
			excludedIds = excludedIds.slice(1);
			dnfCount--;
		}
		else {
			includedIds = includedIds.slice(1);
		}
        //If expired is below the boundary, we need another value to trim => The value of lowerBoundary will now be trimmed 
		if(timeComparator(expiredValue, lowerBoundary) < 0) {
			currentSum -= getMsDnfOrElse(lowerBoundary, 0);
			lowerBoundary = movingWindow[trim + 1];
        }
		//Same for upper boundary
        else if(timeComparator(expiredValue, upperBoundary) > 0) {
            currentSum -= getMsDnfOrElse(upperBoundary, 0);
			upperBoundary = movingWindow[windowSize - 2 - trim];
        }
		//The expired value is removed without affecting the boundary
        else {
            currentSum -= getMsDnfOrElse(expiredValue, 0);
        }
		if(newValue.dnf) {
			excludedIds.push(newValue.id);
			dnfCount++;
		}
		else {
			includedIds.push(newValue.id);
		}
		//Same logic (in reverse) for the new value.
        swapValueInSortedArray(movingWindow, expiredValue, newValue); //Remove the expired value, and insert the new one
        if(timeComparator(newValue, lowerBoundary) < 0) {
            currentSum += getMsDnfOrElse(movingWindow[trim], 0);
        }
        else if(timeComparator(newValue, upperBoundary) > 0) {
            currentSum += getMsDnfOrElse(movingWindow[windowSize - 1 - trim], 0);
        }
        else {
            currentSum += getMsDnfOrElse(newValue, 0);
        }
		//Adjust the boundary unconditionally
        lowerBoundary = movingWindow[trim];
        upperBoundary = movingWindow[windowSize - 1 - trim];
		averages[i] = {
			ms: dnfCount > trim ? Infinity : currentSum / avgScaling,
			includedIds: includedIds.slice(),
			excludedIds: excludedIds.slice()
		};
    }
    return averages;
}

function getMsDnfOrElse(time, elseVal) {
	return time.dnf ? elseVal : getMs(time);
}

//Removes oldVal and puts newVal into a sorted array
function swapValueInSortedArray(values, oldVal, newVal) {
	if(!oldVal.dnf) {
		const oldIndex = findInsertionSpot(values, oldVal);
		if(oldIndex < values.length - 1) {
			values.copyWithin(oldIndex, oldIndex + 1);
		}
	}
	let newIndex;
	if(newVal.dnf) {
		newIndex = values.length - 1;
	}
	else {
		newIndex = findInsertionSpot(values, newVal);		
		if(newIndex == values.length) {
			newIndex--;
		}
	}
	values.copyWithin(newIndex + 1, newIndex);
	values[newIndex] = newVal;
}

function findInsertionSpot(values, target) {
	return binarySearch(values, target, 0, values.length - 1);
}

function binarySearch(values, target, min, max) {
	const index = Math.max(0, Math.floor((min + max) / 2));
    if(min >= max) {
        if(timeComparator(values[index], target) >= 0) {
            return index;
        }
        return index + 1;
    }
    const val = values[index];
    if(timeComparator(val, target) < 0) {
        return binarySearch(values, target, index + 1, max);
    }
    else if(timeComparator(val, target) > 0) {
        return binarySearch(values, target, min, index - 1);
    }
    else {
        return index;
    }
}

function calculateStandardDeviation(times) {
  const noDnfTimes = getNoDnfTimes(times);
  const mean = noDnfTimes.reduce((total, time) => getMs(time) + total, 0) / noDnfTimes.length;
  const variance =
    noDnfTimes.reduce((total, time) => Math.pow(getMs(time) - mean, 2) + total, 0) /
    (noDnfTimes.length - 1);

  return { ms: Math.sqrt(variance) };
}

function getBest(times) {
  return times.reduce((best, current) =>
    best.ms === current.ms || best.ms < current.ms ? best : current
  );
}

function getCurrent(times) {
  return times[times.length - 1];
}

function getNoDnfTimes(times) {
  return times.filter(time => !time.dnf);
}
