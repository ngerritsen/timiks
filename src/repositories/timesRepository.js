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
    date: new Date(raw.date)
  }));
}

function serializeTimes(times) {
  return times.map(time => ({
    ms: time.ms,
    puzzle: time.puzzle,
    scramble: serializeScramble(time.scramble),
    date: time.date.toISOString()
  }));
}

function parseArchive(rawArchive) {
  return rawArchive.map(item => ({
    title: item.title,
    times: parseTimes(item.times),
    id: shortid.generate(),
    puzzle: item.puzzle
  }));
}

function serializeArchive(archive) {
  return archive.map(item => ({
    title: item.title,
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
