import puzzles from "../constants/puzzles";
import { Puzzle } from "../types";

export function getPuzzle(name: string): Puzzle {
  return puzzles.find((puzzle) => puzzle.name === name);
}
