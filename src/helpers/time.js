import moment from 'moment';
import { fillZeroes } from './formatting';

const MS_IN_SECONDS = 1000;
const SECONDS_IN_MINUTES = 60;
const MS_IN_MINUTES = SECONDS_IN_MINUTES * MS_IN_SECONDS;

export function breakUpTime(ms) {
  let milliseconds = Math.round(ms);

  const minutes = Math.floor(milliseconds / MS_IN_MINUTES);

  milliseconds -= minutes * MS_IN_MINUTES;

  const seconds = Math.floor(milliseconds / MS_IN_SECONDS);

  milliseconds -= seconds * MS_IN_SECONDS;

  return { minutes, seconds, milliseconds };
}

export function formatShortTime(ms) {
  const { minutes, seconds, milliseconds } = breakUpTime(ms);
  return (
    (minutes > 0 ? minutes + ':' : '') +
    fillZeroes(String(seconds), 2) +
    '.' +
    Math.round(milliseconds / 100)
  );
}

export function formatTime(ms) {
  const { minutes, seconds, milliseconds } = breakUpTime(ms);
  return (
    fillZeroes(String(minutes), 2) +
    ':' +
    fillZeroes(String(seconds), 2) +
    '.' +
    fillZeroes(String(milliseconds), 3)
  );
}

export function parseTimeInput(input) {
  if (!input) {
    return null;
  }

  let timeInput = input.trim();
  let plus2 = false;

  if (timeInput.toLowerCase() === 'dnf') {
    return {
      ms: 0,
      dnf: true,
      plus2: false
    };
  }

  if (timeInput.indexOf('+2') > 0 && timeInput.indexOf('+2') === timeInput.length - 2) {
    timeInput = timeInput.slice(0, -2);
    plus2 = true;
  }

  const time = moment(
    timeInput,
    [
      'H:m:s.SSS',
      'H:m:s.SS',
      'H:m:s.S',
      'H:m:s',
      'm:s.SSS',
      'm:s.SS',
      'm:s.S',
      'm:s',
      's.SSS',
      's.SS',
      's.S',
      's'
    ],
    true
  );

  const ms =
    time.hour() * 3600000 + time.minute() * 60000 + time.second() * 1000 + time.millisecond();

  if (!ms || ms <= 0 || isNaN(ms)) {
    return null;
  }

  return { ms, plus2, dnf: false };
}

export function getMs(time) {
  if (time.dnf) {
    return Infinity;
  }

  if (time.plus2) {
    return time.ms + 2000;
  }

  return time.ms;
}
