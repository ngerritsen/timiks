const FULL_CUBE_DIRECTIONS = ['U', 'R', 'D', 'L', 'F', 'B'];

const puzzles = [
  {
    name: '2x2x2',
    scrambleOptions: {
      directions: ['U', 'R', 'F'],
      extraLayers: 0,
      length: 9
    }
  },
  {
    name: '3x3x3',
    scrambleOptions: {
      directions: FULL_CUBE_DIRECTIONS,
      extraLayers: 0,
      length: 25
    }
  },
  {
    name: '4x4x4',
    scrambleOptions: {
      directions: FULL_CUBE_DIRECTIONS,
      extraLayers: 1,
      length: 40
    }
  },
  {
    name: '5x5x5',
    scrambleOptions: {
      directions: FULL_CUBE_DIRECTIONS,
      extraLayers: 1,
      length: 60
    }
  },
  {
    name: '6x6x6',
    scrambleOptions: {
      directions: FULL_CUBE_DIRECTIONS,
      extraLayers: 2,
      length: 80
    }
  },
  {
    name: '7x7x7',
    scrambleOptions: {
      directions: FULL_CUBE_DIRECTIONS,
      extraLayers: 2,
      length: 90
    }
  },
  {
    name: 'skewb',
    scrambleOptions: {
      directions: ['R', 'L', 'F', 'B'],
      extraLayers: 0,
      length: 25
    }
  }
];

export default puzzles;
export const DEFAULT_PUZZLE = puzzles[1];
