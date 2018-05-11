import { ARCHIVE_SORT_OPTIONS } from '../constants/app';

import * as times from './times';
import { sortBy } from './general';

export function decorateArchive(archive, expanded, timeDetailsShown) {
  return archive.map(item => {
    const stats = times.calculateStats(item.times);

    return {
      ...item,
      ...stats,
      collapsed: expanded !== item.id,
      times: times.markShowDetails(times.markBestTime(item.times), timeDetailsShown),
      stats: times.calculateStats(item.times),
      date: times.getFirstDate(item.times)
    };
  });
}

export function sortArchive(archive, sortByProperty) {
  const { value, reversed } = ARCHIVE_SORT_OPTIONS.find(option => sortByProperty === option.value);

  const sortedArchive = sortBy(archive, value);

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
