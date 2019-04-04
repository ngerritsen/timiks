import shortid from 'shortid';
import * as constants from '../constants/app';

export function parseTimes(rawTimes) {
  return rawTimes.map(raw => ({
    id: raw.id,
    ms: raw.ms,
    puzzle: raw.puzzle,
    scramble: parseScramble(raw.scramble),
    date: new Date(raw.date),
    dnf: Boolean(raw.dnf),
    plus2: Boolean(raw.plus2)
  }));
}

export function serializeTimes(times) {
  return times.map(time => ({
    id: time.id || shortid.generate(),
    ms: time.ms,
    puzzle: time.puzzle,
    scramble: serializeScramble(time.scramble),
    date: time.date.toISOString(),
    dnf: Boolean(time.dnf),
    plus2: Boolean(time.plus2)
  }));
}

function serializeScramble(scramble) {
  return scramble.join(constants.SCRAMBLE_DELIMITER);
}

function parseScramble(rawScramble) {
  return rawScramble.split(constants.SCRAMBLE_DELIMITER);
}
