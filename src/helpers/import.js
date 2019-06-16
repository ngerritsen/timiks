import { parseTimeInput } from './time';
import { parseCsv } from './csv';
import shortid from 'shortid';

export function csTimerSessionToTimes(csv) {
  return parseCsv(csv, ';')
    .map(item => {
      try {
        return {
          id: shortid.generate(),
          ...parseCsTimerTime(item.Time),
          scramble: parseCsTimerScramble(item.Scramble),
          date: new Date(Date.parse(item.Date))
        };
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
    .replace(/[\n\s]+/g, ' ') // Remove extra whitespcae
    .split(' ');
}
