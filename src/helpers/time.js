import { fillZeroes } from './formatting';
import { multiMatch } from './general';

const MILLISECONDS_IN_SECOND = 1000;
const SECONDS_IN_MINUTE = 60;
const MINUTES_IN_HOUR = 60;
const MILLISECONDS_IN_MINUTE = SECONDS_IN_MINUTE * MILLISECONDS_IN_SECOND;
const MILLISECONDS_IN_HOUR = MINUTES_IN_HOUR * MILLISECONDS_IN_MINUTE;
const MAX_MINUTES_IN_HOUR = 59;
const MAX_SECONDS_IN_MINUTE = 59;

const timeInputPatterns = [
  {
    regex: /^(\d{1,2}):(\d{1,2}):(\d{1,2})\.(\d{1,3})$/,
    fields: ['hours', 'minutes', 'seconds', 'milliseconds']
  },
  {
    regex: /^(\d{1,2}):(\d{1,2}):(\d{1,2})$/,
    fields: ['hours', 'minutes', 'seconds']
  },
  {
    regex: /^(\d{1,2}):(\d{1,2})\.(\d{1,3})$/,
    fields: ['minutes', 'seconds', 'milliseconds']
  },
  {
    regex: /^(\d{1,2}):(\d{1,2})$/,
    fields: ['minutes', 'seconds']
  },
  {
    regex: /^(\d{1,2})\.(\d{1,3})$/,
    fields: ['seconds', 'milliseconds']
  },
  {
    regex: /^(\d{1,2})$/,
    fields: ['seconds']
  }
];

export function isValidTime(time) {
  return (
    time &&
    typeof time.ms === 'number' &&
    !isNaN(time.ms) &&
    time.date &&
    !isNaN(time.date.getTime())
  );
}

export function breakUpTime(ms) {
  let milliseconds = Math.round(ms);

  const minutes = Math.floor(milliseconds / MILLISECONDS_IN_MINUTE);

  milliseconds -= minutes * MILLISECONDS_IN_MINUTE;

  const seconds = Math.floor(milliseconds / MILLISECONDS_IN_SECOND);

  milliseconds -= seconds * MILLISECONDS_IN_SECOND;

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
    (minutes > 0 ? fillZeroes(String(minutes), 2) + ':' : '') +
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

  const ms = parseTimeInputTime(timeInput);

  if (!ms || ms <= 0 || isNaN(ms)) {
    return null;
  }

  return { ms, plus2, dnf: false };
}

function parseTimeInputTime(timeInput) {
  let ms = 0;

  const match = multiMatch(timeInputPatterns, timeInput);

  if (!match) return null;

  if (match.hours) {
    ms += parseInt(match.hours) * MILLISECONDS_IN_HOUR;
  }

  if (match.minutes) {
    const minutes = parseInt(match.minutes);

    if (minutes > MAX_MINUTES_IN_HOUR) return null;

    ms += minutes * MILLISECONDS_IN_MINUTE;
  }

  if (match.seconds) {
    const seconds = parseInt(match.seconds);

    if (seconds > MAX_SECONDS_IN_MINUTE) return null;

    ms += seconds * MILLISECONDS_IN_SECOND;
  }

  if (match.milliseconds) {
    ms += parseInt(fillZeroes(match.milliseconds, 3, true));
  }

  return ms;
}

export function getMs(time) {
  if (time.dnf) {
    return Infinity;
  }

  if (time.plus2) {
    return time.ms + 2 * MILLISECONDS_IN_SECOND;
  }

  return time.ms;
}
