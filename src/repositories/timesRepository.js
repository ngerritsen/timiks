import shortid from 'shortid';

import * as constants from '../constants/app';

export function getCurrent() {
  return getParsed(constants.CURRENT_TIMES_STORAGE_KEY, parseTimes);
}

export function getArchive() {
  return getParsed(constants.ARCHIVED_TIMES_STORAGE_KEY, parseArchive);
}

export function storeCurrent(times) {
  localStorage.setItem(constants.CURRENT_TIMES_STORAGE_KEY, JSON.stringify(serializeTimes(times)));
}

export function storeArchive(archive) {
  localStorage.setItem(constants.ARCHIVED_TIMES_STORAGE_KEY, JSON.stringify(serializeArchive(archive)));
}

function getParsed(storageKey, parser) {
  const raw = localStorage.getItem(storageKey);

  return raw ? parser(JSON.parse(raw)) : undefined;
}

function parseTimes(rawTimes) {
  return rawTimes.map(raw => ({
    id: shortid.generate(),
    ms: raw.ms,
    puzzle: raw.puzzle,
    scramble: parseScramble(raw.scramble),
    date: new Date(raw.date),
    dnf: Boolean(raw.dnf),
    plus2: Boolean(raw.plus2)
  }));
}

function serializeTimes(times) {
  return times.map(time => ({
    ms: time.ms,
    puzzle: time.puzzle,
    scramble: serializeScramble(time.scramble),
    date: time.date.toISOString(),
    dnf: Boolean(time.dnf),
    plus2: Boolean(time.plus2)
  }));
}

function parseArchive(rawArchive) {
  let shouldUpdateIds = false;

  const parsedArchive = rawArchive.map(item => {
    if (!item.id) {
      shouldUpdateIds = true;
    }

    return {
      title: item.title,
      times: parseTimes(item.times),
      id: item.id || shortid.generate(),
      puzzle: item.puzzle
    }
  });

  /**
   * This is for backwards compatibility for people that had an archive before
   * id's where stored in localStorage. We make sure they have consistent id's,
   * to prevent problems with merging imports later.
   */
  if (shouldUpdateIds) {
    storeArchive(parsedArchive);
  }

  return parsedArchive;
}

function serializeArchive(archive) {
  return archive.map(item => ({
    title: item.title,
    id: item.id,
    times: serializeTimes(item.times),
    puzzle: item.puzzle
  }));
}

function serializeScramble(scramble) {
  return scramble.join(constants.SCRAMBLE_DELIMITER);
}

function parseScramble(rawScramble) {
  return rawScramble.split(constants.SCRAMBLE_DELIMITER);
}
