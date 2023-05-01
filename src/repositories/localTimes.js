import * as storageConstants from "../constants/storage";
import * as serialization from "../helpers/serialization";

export function getAll() {
  const times = serialization.parseTimes(
    get(storageConstants.TIMES_STORAGE_KEY)
  );
  const legacyTimes = getLegacyTimes();
  const allTimes = [...legacyTimes, ...times];

  if (legacyTimes.length > 0) {
    store(allTimes);
    removeLegacyTimes();
  }

  return allTimes;
}

export function store(times) {
  localStorage.setItem(
    storageConstants.TIMES_STORAGE_KEY,
    JSON.stringify(serialization.serializeTimes(times))
  );
}

function removeLegacyTimes() {
  localStorage.removeItem(storageConstants.ARCHIVED_TIMES_STORAGE_KEY);
  localStorage.removeItem(storageConstants.CURRENT_TIMES_STORAGE_KEY);
}

function getLegacyTimes() {
  const legacyArchivedTimes = serialization.parseTimes(
    get(storageConstants.ARCHIVED_TIMES_STORAGE_KEY)
  );
  const legacyCurrentTimes = serialization
    .parseTimes(get(storageConstants.CURRENT_TIMES_STORAGE_KEY))
    .map((time) => ({ ...time, current: true }));

  return [...legacyCurrentTimes, ...legacyArchivedTimes];
}

function get(storageKey) {
  const raw = localStorage.getItem(storageKey);

  if (!raw) {
    return [];
  }

  const parsed = JSON.parse(raw);

  if (!Array.isArray(parsed)) {
    return [];
  }

  return parsed;
}
