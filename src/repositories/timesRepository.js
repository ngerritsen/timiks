import * as constants from '../constants/app';
import { createTime } from '../helpers/time';

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
  return rawTimes.map(raw => {
    return createTime(raw.ms, parseScramble(raw.scramble), raw.date);
  });
}

function serializeTimes(times) {
  return times.map(time => ({
    ms: time.ms,
    scramble: serializeScramble(time.scramble),
    date: time.date
  }));
}

function parseArchive(rawArchive) {
  return rawArchive.map(archivedTimes => ({
    title: archivedTimes.title,
    times: parseTimes(archivedTimes.times)
  }));
}

function serializeArchive(archive) {
  return archive.map(archivedTimes => ({
    title: archivedTimes.title,
    times: serializeTimes(archivedTimes.times)
  }));
}

function serializeScramble(scramble) {
  return scramble.join(constants.SCRAMBLE_DELIMITER);
}

function parseScramble(rawScramble) {
  return rawScramble.split(constants.SCRAMBLE_DELIMITER);
}
