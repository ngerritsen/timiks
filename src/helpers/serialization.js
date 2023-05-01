import shortid from "shortid";

export function parseTimes(rawTimes) {
  return rawTimes.map(parseTime);
}

export function parseTime(raw) {
  return {
    id: raw.id,
    ms: raw.ms,
    puzzle: raw.puzzle,
    comment: String(raw.comment || ""),
    scramble: String(raw.scramble || ""),
    date: parseDate(raw),
    dnf: Boolean(raw.dnf),
    plus2: Boolean(raw.plus2),
    current: Boolean(raw.current),
    dirty: Boolean(raw.dirty),
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
    comment: time.comment || "",
    scramble: time.scramble,
    timestamp: time.date,
    dnf: time.dnf || undefined,
    plus2: time.plus2 || undefined,
    current: Boolean(time.current),
  };
}

function parseDate(rawTime) {
  const date = rawTime.timestamp || rawTime.date;

  if (!date) {
    return new Date();
  }

  return typeof date === "string"
    ? new Date(rawTime.timestamp)
    : rawTime.timestamp.toDate();
}
