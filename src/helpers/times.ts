import { Time } from "../types";
import { getMs } from "./time";

export function addPuzzleToTimes(times: Time[], puzzle: string) {
  return times.map((time) => ({ ...time, puzzle }));
}

export function isCurrent(time: Time) {
  return Boolean(time.current);
}

export function getId(time: Time) {
  return time.id;
}

export function markBestTime(times: Time[]) {
  if (times.length < 2) {
    return times;
  }

  const bestTime = Math.min(...times.map((time) => getMs(time)));

  if (bestTime === Infinity) {
    return times;
  }

  return times.map((time) =>
    getMs(time) === bestTime ? { ...time, best: true } : time
  );
}
