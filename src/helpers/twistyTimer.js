import { parseTimeInput, isValidTime } from './time';
import { parseCsv } from './csv';
import shortid from 'shortid';

export default function parseTwistyTimerExport(csv) {
  return parseCsv(csv, ';', ['time', 'scramble', 'date', 'penalty'])
    .map(item => {
      try {
        const time = {
          id: shortid.generate(),
          ...parseTwistyTimerTime(item.time, item.penalty),
          scramble: parseTwistyTimerScramble(item.scramble),
          date: new Date(Date.parse(item.date))
        };

        return isValidTime(time) && time;
      } catch (e) {
        return null;
      }
    })
    .filter(Boolean);
}

function parseTwistyTimerTime(string, penalty) {
  return {
    ...parseTimeInput(string),
    dnf: penalty === 'DNF'
  };
}

function parseTwistyTimerScramble(string) {
  return string.trim().replace(/[\n\s]+/g, ' ');
}
