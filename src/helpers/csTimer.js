import { parseTimeInput, isValidTime } from './time';
import { parseCsv } from './csv';
import shortid from 'shortid';

export default function parseCsTimerSession(csv) {
  return parseCsv(csv, ';')
    .map(item => {
      try {
        const time = {
          id: shortid.generate(),
          ...parseCsTimerTime(item.Time),
          scramble: parseCsTimerScramble(item.Scramble),
          date: new Date(Date.parse(item.Date))
        };

        return isValidTime(time) && time;
      } catch (e) {
        return null;
      }
    })
    .filter(Boolean);
}

function parseCsTimerTime(string) {
  const dnfMatch = string.match(/^DNF\((.+)\)$/);

  if (dnfMatch) {
    return { ...parseTimeInput(dnfMatch[1]), dnf: true };
  }

  if (string.match(/.+\+$/)) {
    return parseTimeInput(string + '2');
  }

  return parseTimeInput(string);
}

function parseCsTimerScramble(string) {
  return string
    .trim()
    .replace(/\(\//g, ') /') // Add missing whitespace to square-1 scramble
    .replace(/[\n\s]+/g, ' '); // Remove extra whitespace
}
