import { ARCHIVE_SORT_OPTIONS } from '../constants/app';

import * as times from '../helpers/times';

export function decorateArchive(archive, expanded, timeDetailsShown) {
  return archive.map(item => ({
    ...item,
    collapsed: expanded !== item.id,
    times: times.markShowDetails(times.markBestTime(item.times), timeDetailsShown),
    average: times.calculateAverageTime(item.times),
    averageOfBestThree: times.calculateAverageTimeOfBestThree(item.times),
    date: times.getFirstDate(item.times)
  }));
}

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

export function filterArchive(archive, puzzle) {
  if (!puzzle) {
    return archive;
  }

  return archive.filter(item => item.puzzle === puzzle);
}
