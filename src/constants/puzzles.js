import { UP, RIGHT, DOWN, LEFT, FRONT, BACK } from '../constants/puzzle';
import { CUBE, CLOCK, DODECAHEDRON, TETRAHEDRON, SQUARE_ONE } from '../constants/puzzle';

const FULL_CUBE_DIRECTIONS = [UP, RIGHT, DOWN, LEFT, FRONT, BACK];
const DODECAHEDRON_DIRECTIONS = [RIGHT, DOWN];
const DODECAHEDRON_END_DIRECTION = UP;

const puzzles = [
  {
    name: '2x2x2',
    type: CUBE,
    size: 2,
    scrambleOptions: {
      directions: [UP, RIGHT, FRONT],
      length: 11
    }
  },
  {
    name: '3x3x3',
    type: CUBE,
    size: 3,
    scrambleOptions: {
      directions: FULL_CUBE_DIRECTIONS,
      length: 20
    }
  },
  {
    name: '4x4x4',
    type: CUBE,
    size: 4,
    scrambleOptions: {
      directions: FULL_CUBE_DIRECTIONS,
      extraLayers: 1,
      length: 45
    }
  },
  {
    name: '5x5x5',
    type: CUBE,
    size: 5,
    scrambleOptions: {
      directions: FULL_CUBE_DIRECTIONS,
      extraLayers: 1,
      length: 50
    }
  },
  {
    name: '6x6x6',
    type: CUBE,
    size: 6,
    scrambleOptions: {
      directions: FULL_CUBE_DIRECTIONS,
      extraLayers: 2,
      length: 80
    }
  },
  {
    name: '7x7x7',
    type: CUBE,
    size: 7,
    scrambleOptions: {
      directions: FULL_CUBE_DIRECTIONS,
      extraLayers: 2,
      length: 100
    }
  },
  {
    name: 'megaminx',
    type: DODECAHEDRON,
    scrambleOptions: {
      directions: DODECAHEDRON_DIRECTIONS,
      endDirection: DODECAHEDRON_END_DIRECTION,
      lineLength: 11,
      lines: 7
    }
  },
  {
    name: 'kilominx',
    type: DODECAHEDRON,
    scrambleOptions: {
      directions: DODECAHEDRON_DIRECTIONS,
      endDirection: DODECAHEDRON_END_DIRECTION,
      lineLength: 11,
      lines: 7
    }
  },
  {
    name: 'pyraminx',
    type: TETRAHEDRON,
    scrambleOptions: {
      directions: [UP, RIGHT, LEFT, BACK],
      length: 11
    }
  },
  {
    name: 'skewb',
    type: CUBE,
    scrambleOptions: {
      directions: [RIGHT, LEFT, FRONT, BACK],
      length: 11
    }
  },
  {
    name: 'square-1',
    type: SQUARE_ONE,
    scrambleOptions: {
      length: 16
    }
  },
  {
    name: 'clock',
    type: CLOCK,
    scrambleOptions: {
      length: 12
    }
  }
];

export const DEFAULT_PUZZLE = puzzles[1];

export default puzzles;
