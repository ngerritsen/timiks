import puzzles from '../constants/puzzles';
import { CUBE } from '../constants/puzzle';

export function isCube(puzzleName) {
  if (!puzzleName) {
    return false;
  }

  const { type } = puzzles.find(puzzle => puzzle.name === puzzleName);

  return type === CUBE;
}

export function getPuzzleSize(puzzleName) {
  if (!puzzleName) {
    return 0;
  }

  return puzzles.find(puzzle => puzzle.name === puzzleName).size;
}
