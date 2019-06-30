import shortid from 'shortid';
import { SCRAMBLE_DELIMITER } from '../constants/scramble';

export function parseTimes(rawTimes) {
  return rawTimes.map(parseTime);
}

export function parseTime(raw) {
  return {
    id: raw.id,
    ms: raw.ms,
    puzzle: raw.puzzle,
    comment: String(raw.comment || ''),
    scramble: parseScramble(raw.scramble),
    date: parseDate(raw),
    dnf: Boolean(raw.dnf),
    plus2: Boolean(raw.plus2),
    current: Boolean(raw.current),
    dirty: Boolean(raw.dirty)
  };
}

export function serializeTimes(times) {
  return times.map(serializeTime);
}

export function serializeTime(time) {
  return {
    id: time.id || shortid.generate(),
    ms: time.ms,
    puzzle: time.puzzle,
    comment: time.comment || '',
    scramble: serializeScramble(time.scramble),
    timestamp: time.date,
    dnf: time.dnf || undefined,
    plus2: time.plus2 || undefined,
    current: Boolean(time.current)
  };
}

function parseDate(rawTime) {
  const date = rawTime.timestamp || rawTime.date;
  return typeof date === 'string' ? new Date(rawTime.timestamp) : rawTime.timestamp.toDate();
}

function serializeScramble(scramble) {
  return scramble.join(SCRAMBLE_DELIMITER);
}

function parseScramble(rawScramble) {
  return rawScramble.split(SCRAMBLE_DELIMITER);
}
