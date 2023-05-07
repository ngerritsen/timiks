import { CubeDirection, Puzzle, PuzzleColor, StaticDirection } from "../types";
import { Color } from "../theme";

export const CUBE_OPPOSITES: [CubeDirection, CubeDirection][] = [
  ["U", "D"],
  ["R", "L"],
  ["F", "B"],
];

export const CUBE_DIRECTIONS: CubeDirection[] = ["U", "D", "F", "B", "L", "R"];
export const STATIC_DIRECTIONS: StaticDirection[] = ["x", "y", "z"];

export const puzzleColors: Record<PuzzleColor, Color> = {
  W: "white",
  Y: "yellow",
  R: "red",
  B: "blue",
  O: "orange",
  G: "green",
  X: "dark",
};

const puzzles: Puzzle[] = [
  {
    name: "1x1x1",
    title: "1x1x1",
    type: "STATIC",
    size: 1,
    allowInspectionTime: true,
    scrambleOptions: {
      length: 12,
      directions: STATIC_DIRECTIONS,
    },
  },
  {
    name: "2x2x2",
    title: "2x2x2",
    type: "CUBE",
    size: 2,
    allowInspectionTime: true,
    scrambleOptions: {
      jsssScrambler: "222",
    },
  },
  {
    name: "3x3x3",
    title: "3x3x3",
    type: "CUBE",
    size: 3,
    allowInspectionTime: true,
    scrambleOptions: {
      jsssScrambler: "333",
    },
  },
  {
    name: "4x4x4",
    title: "4x4x4",
    type: "CUBE",
    size: 4,
    allowInspectionTime: true,
    scrambleOptions: {
      jsssScrambler: "444",
    },
  },
  {
    name: "5x5x5",
    title: "5x5x5",
    type: "CUBE",
    size: 5,
    allowInspectionTime: true,
    scrambleOptions: {
      jsssScrambler: "555",
    },
  },
  {
    name: "6x6x6",
    title: "6x6x6",
    type: "CUBE",
    size: 6,
    allowInspectionTime: true,
    scrambleOptions: {
      jsssScrambler: "666",
    },
  },
  {
    name: "7x7x7",
    title: "7x7x7",
    type: "CUBE",
    size: 7,
    allowInspectionTime: true,
    scrambleOptions: {
      jsssScrambler: "777",
    },
  },
  {
    name: "8x8x8",
    title: "8x8x8",
    type: "CUBE",
    size: 8,
    allowInspectionTime: true,
    scrambleOptions: {
      length: 120,
      directions: CUBE_DIRECTIONS,
    },
  },
  {
    name: "9x9x9",
    title: "9x9x9",
    type: "CUBE",
    size: 9,
    allowInspectionTime: true,
    scrambleOptions: {
      length: 140,
      directions: CUBE_DIRECTIONS,
    },
  },
  {
    name: "10x10x10",
    title: "10x10x10",
    type: "CUBE",
    size: 10,
    allowInspectionTime: true,
    scrambleOptions: {
      length: 160,
      directions: CUBE_DIRECTIONS,
    },
  },
  {
    name: "11x11x11",
    title: "11x11x11",
    type: "CUBE",
    size: 11,
    allowInspectionTime: true,
    scrambleOptions: {
      length: 180,
      directions: CUBE_DIRECTIONS,
    },
  },
  {
    name: "megaminx",
    title: "Megaminx",
    type: "DODECAHEDRON",
    allowInspectionTime: true,
    scrambleOptions: {
      jsssScrambler: "minx",
    },
  },
  {
    name: "kilominx",
    title: "Kilominx",
    type: "DODECAHEDRON",
    allowInspectionTime: true,
    scrambleOptions: {
      jsssScrambler: "minx",
    },
  },
  {
    name: "pyraminx",
    title: "Pyraminx",
    type: "TETRAHEDRON",
    allowInspectionTime: true,
    scrambleOptions: {
      jsssScrambler: "pyram",
    },
  },
  {
    name: "skewb",
    title: "Skewb",
    type: "SKEWB",
    allowInspectionTime: true,
    scrambleOptions: {
      length: 11,
      directions: ["U", "B", "L", "R"],
    },
  },
  {
    name: "square-1",
    title: "Square-1",
    type: "SQUARE_ONE",
    allowInspectionTime: true,
    scrambleOptions: {
      jsssScrambler: "sq1",
    },
  },
  {
    name: "clock",
    title: "Clock",
    type: "CLOCK",
    allowInspectionTime: true,
  },
  {
    name: "3x3x3-oh",
    title: "3x3x3 One-Handed",
    type: "CUBE",
    size: 3,
    allowInspectionTime: true,
    scrambleOptions: {
      jsssScrambler: "333",
    },
  },
  {
    name: "3x3x3-ft",
    title: "3x3x3 With Feet",
    type: "CUBE",
    size: 3,
    allowInspectionTime: true,
    scrambleOptions: {
      jsssScrambler: "333",
    },
  },
  {
    name: "2x2x2-bld",
    title: "2x2x2 Blindfolded",
    type: "CUBE",
    size: 2,
    allowInspectionTime: false,
    scrambleOptions: {
      jsssScrambler: "222",
    },
  },
  {
    name: "3x3x3-bld",
    title: "3x3x3 Blindfolded",
    type: "CUBE",
    size: 3,
    allowInspectionTime: false,
    scrambleOptions: {
      jsssScrambler: "333",
    },
  },
  {
    name: "4x4x4-bld",
    title: "4x4x4 Blindfolded",
    type: "CUBE",
    size: 4,
    allowInspectionTime: false,
    scrambleOptions: {
      jsssScrambler: "444",
    },
  },
  {
    name: "5x5x5-bld",
    title: "5x5x5 Blindfolded",
    type: "CUBE",
    size: 5,
    allowInspectionTime: false,
    scrambleOptions: {
      jsssScrambler: "555",
    },
  },
  {
    name: "2-7-relay",
    title: "2-7 Relay",
    type: "RELAY",
    scrambleOptions: {
      puzzles: ["2x2x2", "3x3x3", "4x4x4", "5x5x5", "6x6x6", "7x7x7"],
    },
  },
  {
    name: "2-6-relay",
    title: "2-6 Relay",
    type: "RELAY",
    scrambleOptions: {
      puzzles: ["2x2x2", "3x3x3", "4x4x4", "5x5x5", "6x6x6"],
    },
  },
  {
    name: "2-5-relay",
    title: "2-5 Relay",
    type: "RELAY",
    scrambleOptions: {
      puzzles: ["2x2x2", "3x3x3", "4x4x4", "5x5x5"],
    },
  },
  {
    name: "2-4-relay",
    title: "2-4 Relay",
    type: "RELAY",
    scrambleOptions: {
      puzzles: ["2x2x2", "3x3x3", "4x4x4"],
    },
  },
];

export default puzzles;
