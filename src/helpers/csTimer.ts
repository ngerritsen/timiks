import { parseTimeInput, isValidTime } from "./time";
import { parseCsv } from "./csv";
import { randomId } from "./id";

export default function parseCsTimerSession(csv: string) {
  return parseCsv(csv, ";")
    .map((item) => {
      try {
        const time = {
          id: randomId(),
          ...parseCsTimerTime(item.Time),
          scramble: parseCsTimerScramble(item.Scramble),
          date: parseCsTimerDate(item.Date),
        };

        return isValidTime(time) && time;
      } catch (e) {
        return null;
      }
    })
    .filter(Boolean);
}

function parseCsTimerDate(dateString: string) {
  const match = dateString.match(
    /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/
  );

  if (!match) {
    return null;
  }

  const [, year, month, day, hour, minute, second] = match;
  const date = new Date();

  date.setFullYear(parseInt(year));
  date.setMonth(parseInt(month) - 1);
  date.setDate(parseInt(day));
  date.setHours(parseInt(hour));
  date.setMinutes(parseInt(minute));
  date.setSeconds(parseInt(second));

  return date;
}

function parseCsTimerTime(string: string) {
  const dnfMatch = string.match(/^DNF\((.+)\)$/);

  if (dnfMatch) {
    return { ...parseTimeInput(dnfMatch[1]), dnf: true };
  }

  if (string.match(/.+\+$/)) {
    return parseTimeInput(string + "2");
  }

  return parseTimeInput(string);
}

function parseCsTimerScramble(string: string) {
  return string
    .trim()
    .replace(/\(\//g, ") /") // Add missing whitespace to square-1 scramble
    .replace(/[\n\s]+/g, " "); // Remove extra whitespace
}
