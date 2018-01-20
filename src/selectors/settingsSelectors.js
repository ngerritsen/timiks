import puzzles, { CUBE } from '../constants/puzzles';

export function getCubeSize(state) {
  const puzzle = puzzles.find(puzzle => puzzle.name === state.settings.puzzle);

  if (puzzle.type !== CUBE) {
    return undefined;
  }

  return puzzle.size;
}
