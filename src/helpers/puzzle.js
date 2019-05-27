import puzzles from '../constants/puzzles';
import { CUBE } from '../constants/puzzle';

export function getPuzzle(name) {
  return puzzles.find(puzzle => puzzle.name === name);
}

export function isCube(name) {
  if (!name) {
    return false;
  }

  const { type } = getPuzzle(name);

  return type === CUBE;
}

export function allowInspectionTimeForPuzzle(name) {
  if (!name) {
    return true;
  }

  return getPuzzle(name).allowInspectionTime;
}

export function getPuzzleSize(name) {
  if (!name) {
    return 0;
  }

  return getPuzzle(name).size;
}
