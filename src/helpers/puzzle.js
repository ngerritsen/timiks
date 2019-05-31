import puzzles from '../constants/puzzles';

export function getPuzzle(name) {
  return puzzles.find(puzzle => puzzle.name === name);
}
