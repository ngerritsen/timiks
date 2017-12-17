import shortid from 'shortid';
import { serializeScramble, deserializeScramble } from './scramble';

export function createTime(ms, scramble, date = new Date().toISOString()) {
  return {
    id: shortid.generate(),
    ms,
    scramble,
    date
  }
}

export function deserializeTimes(times) {
  return times.map(raw => {
    return createTime(raw.ms, deserializeScramble(raw.scramble), raw.date);
  });
}

export function serializeTimes(times) {
  return times.map(time => ({
    ms: time.ms,
    scramble: serializeScramble(time.scramble),
    date: time.date
  }));
}
