import { getFormattedDay } from './times';
import { createDescSorter } from './general';

export function groupByDay(times) {
  const timesPerDayMap = times.reduce((groupedTimes, time) => {
    const formattedDay = getFormattedDay(time);

    const timesForDay = groupedTimes[formattedDay] || {
      date: time.date,
      times: []
    };

    return {
      ...groupedTimes,
      [formattedDay]: {
        ...timesForDay,
        times: [...timesForDay.times, time]
      }
    };
  }, {});

  return Object.values(timesPerDayMap).sort(createDescSorter('date'));
}
