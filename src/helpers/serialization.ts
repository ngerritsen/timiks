import { Timestamp } from "firebase/firestore";
import { Time } from "../types";
import { randomId } from "./id";

export function parseTimes(rawTimes: Record<string, unknown>[]) {
  return rawTimes.map(parseTime);
}

export function parseTime(raw: Record<string, unknown>): Time {
  return {
    id: String(raw.id),
    ms: Number(raw.ms),
    puzzle: String(raw.puzzle),
    comment: String(raw.comment || ""),
    scramble: String(raw.scramble || ""),
    date: parseDate(raw),
    dnf: Boolean(raw.dnf),
    plus2: Boolean(raw.plus2),
    current: Boolean(raw.current),
    dirty: Boolean(raw.dirty),
  };
}

export function serializeTimes(times: Time[]) {
  return times.map(serializeTime);
}

export function serializeTime(time: Time) {
  return {
    id: time.id || randomId(),
    ms: time.ms,
    puzzle: time.puzzle,
    comment: time.comment || "",
    scramble: time.scramble,
    timestamp: time.date,
    dnf: time.dnf || undefined,
    plus2: time.plus2 || undefined,
    current: Boolean(time.current),
  };
}

function parseDate(rawTime: Record<string, unknown>) {
  const date = rawTime.timestamp || rawTime.date;

  if (!date) {
    return new Date();
  }

  return typeof date === "string"
    ? new Date(String(rawTime.timestamp))
    : (rawTime.timestamp as Timestamp).toDate();
}
