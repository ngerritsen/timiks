const puzzles = [
  {
    name: '2x2x2',
    scrambleOptions: {
      directions: ['U', 'R', 'F'],
      length: 9
    }
  },
  {
    name: '3x3x3',
    scrambleOptions: {
      directions: ['U', 'R', 'D', 'L', 'F', 'B'],
      length: 25
    }
  },
  {
    name: 'skewb',
    scrambleOptions: {
      directions: ['R', 'L', 'F', 'B'],
      length: 25
    }
  }
];

export default puzzles;
export const DEFAULT_PUZZLE = puzzles[1];
