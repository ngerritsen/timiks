import * as constants from '../constants/app';
import * as serialization from '../helpers/serialization';

export function getCurrent() {
  return getParsed(constants.CURRENT_TIMES_STORAGE_KEY, serialization.parseTimes);
}

export function getArchive() {
  return getParsed(constants.ARCHIVED_TIMES_STORAGE_KEY, serialization.parseArchive);
}

export function storeCurrent(times) {
  localStorage.setItem(
    constants.CURRENT_TIMES_STORAGE_KEY,
    JSON.stringify(serialization.serializeTimes(times))
  );
}

export function storeArchive(archive) {
  localStorage.setItem(
    constants.ARCHIVED_TIMES_STORAGE_KEY,
    JSON.stringify(serialization.serializeArchive(archive))
  );
}

function getParsed(storageKey, parser) {
  const raw = localStorage.getItem(storageKey);

  return raw ? parser(JSON.parse(raw)) : undefined;
}
