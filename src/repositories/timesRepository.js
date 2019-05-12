import * as constants from '../constants/app';
import * as serialization from '../helpers/serialization';

export function getCurrent() {
  return serialization.parseTimes(get(constants.CURRENT_TIMES_STORAGE_KEY));
}

export function getArchived() {
  return serialization.parseTimes(get(constants.ARCHIVED_TIMES_STORAGE_KEY));
}

export function storeCurrent(times) {
  localStorage.setItem(
    constants.CURRENT_TIMES_STORAGE_KEY,
    JSON.stringify(serialization.serializeTimes(times))
  );
}

export function storeArchived(times) {
  localStorage.setItem(
    constants.ARCHIVED_TIMES_STORAGE_KEY,
    JSON.stringify(serialization.serializeTimes(times))
  );
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
