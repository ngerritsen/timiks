import { TIMES_STORAGE_KEY } from '../constants';
import { serializeTimes, deserializeTimes } from '../helpers/time';

export function getAll() {
  const raw = localStorage.getItem(TIMES_STORAGE_KEY);

  if (!raw) {
    return null;
  }

  return deserializeTimes(JSON.parse(raw));
}

export function store(times) {
  localStorage.setItem(TIMES_STORAGE_KEY, JSON.stringify(serializeTimes(times)));
}
