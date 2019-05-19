import * as constants from '../constants/app';
import * as serialization from '../helpers/serialization';

export function getAll() {
  const times = serialization.parseTimes(get(constants.TIMES_STORAGE_KEY));
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
    constants.TIMES_STORAGE_KEY,
    JSON.stringify(serialization.serializeTimes(times))
  );
}

function removeLegacyTimes() {
  localStorage.removeItem(constants.ARCHIVED_TIMES_STORAGE_KEY);
  localStorage.removeItem(constants.CURRENT_TIMES_STORAGE_KEY);
}

function getLegacyTimes() {
  const legacyArchivedTimes = serialization.parseTimes(get(constants.ARCHIVED_TIMES_STORAGE_KEY));
  const legacyCurrentTimes = serialization
    .parseTimes(get(constants.CURRENT_TIMES_STORAGE_KEY))
    .map(time => ({ ...time, current: true }));

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
