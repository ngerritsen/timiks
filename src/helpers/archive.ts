import { Time } from "../types";
import { createDescSorter } from "./general";

type TimesForDay = {
  date: Date;
  times: Time[];
};

export function groupByDay(times: Time[]) {
  const timesPerDayMap = times.reduce<Record<string, TimesForDay>>(
    (groupedTimes, time) => {
      const formattedDay = time.date.toDateString();

      const timesForDay =
        groupedTimes[formattedDay] ||
        ({
          date: time.date,
          times: [],
        } as TimesForDay);

      return {
        ...groupedTimes,
        [formattedDay]: {
          date: timesForDay.date,
          times: [...timesForDay.times, time],
        },
      };
    },
    {}
  );

  return Object.values(timesPerDayMap).sort(createDescSorter("date"));
}
