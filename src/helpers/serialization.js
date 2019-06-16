import shortid from 'shortid';
import * as constants from '../constants/app';

export function parseTimes(rawTimes) {
  return rawTimes.map(parseTime);
}

export function parseTime(raw) {
  return {
    id: raw.id,
    ms: raw.ms,
    puzzle: raw.puzzle,
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
    scramble: serializeScramble(time.scramble),
    timestamp: time.date,
    dnf: time.dnf || undefined,
    plus2: time.plus2 || undefined,
    current: Boolean(time.current)
  };
}

function parseDate(rawTime) {
  return rawTime.timestamp ? rawTime.timestamp.toDate() : new Date(rawTime.date);
}

function serializeScramble(scramble) {
  return scramble.join(constants.SCRAMBLE_DELIMITER);
}

function parseScramble(rawScramble) {
  return rawScramble.split(constants.SCRAMBLE_DELIMITER);
}
