import { ARCHIVE_SORT_OPTIONS } from '../constants/app';

export function sortArchive(archive, sortBy) {
  const { value, reversed } = ARCHIVE_SORT_OPTIONS.find(option => sortBy === option.value);

  const sortedArchive = [...archive].sort((a, b) => {
    if (a[value] < b[value]) {
      return -1
    } else if (a[value] > b[value]) {
      return 1;
    }

    return 0;
  });

  if (reversed) {
    sortedArchive.reverse();
  }

  return sortedArchive;
}
