import { GROUP_STORAGE_KEY } from '../constants';
import { serializeGroups, deserializeGroups } from '../helpers/group';

export function getAll() {
  const raw = localStorage.getItem(GROUP_STORAGE_KEY);

  if (!raw) {
    return null;
  }

  deserializeGroups(JSON.parse(raw));
}

export function store(groups) {
  localStorage.setItem(GROUP_STORAGE_KEY, JSON.stringify(serializeGroups(groups)));
}
