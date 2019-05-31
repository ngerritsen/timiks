import * as puzzleConstants from '../constants/puzzle';

const CUBE_DIRECTIONS = [
  puzzleConstants.UP,
  puzzleConstants.DOWN,
  puzzleConstants.FRONT,
  puzzleConstants.BACK,
  puzzleConstants.LEFT,
  puzzleConstants.RIGHT
];

const puzzles = [
  {
    name: '2x2x2',
    title: '2x2x2',
    type: puzzleConstants.CUBE,
    size: 2,
    allowInspectionTime: true,
    scrambleOptions: {
      jsssScrambler: '222'
    }
  },
  {
    name: '3x3x3',
    title: '3x3x3',
    type: puzzleConstants.CUBE,
    size: 3,
    allowInspectionTime: true,
    scrambleOptions: {
      jsssScrambler: '333'
    }
  },
  {
    name: '4x4x4',
    title: '4x4x4',
    type: puzzleConstants.CUBE,
    size: 4,
    allowInspectionTime: true,
    scrambleOptions: {
      jsssScrambler: '444'
    }
  },
  {
    name: '5x5x5',
    title: '5x5x5',
    type: puzzleConstants.CUBE,
    size: 5,
    allowInspectionTime: true,
    scrambleOptions: {
      jsssScrambler: '555'
    }
  },
  {
    name: '6x6x6',
    title: '6x6x6',
    type: puzzleConstants.CUBE,
    size: 6,
    allowInspectionTime: true,
    scrambleOptions: {
      jsssScrambler: '666'
    }
  },
  {
    name: '7x7x7',
    title: '7x7x7',
    type: puzzleConstants.CUBE,
    size: 7,
    allowInspectionTime: true,
    scrambleOptions: {
      jsssScrambler: '777'
    }
  },
  {
    name: '8x8x8',
    title: '8x8x8',
    type: puzzleConstants.CUBE,
    size: 8,
    allowInspectionTime: true,
    scrambleOptions: {
      length: 120,
      directions: CUBE_DIRECTIONS
    }
  },
  {
    name: '9x9x9',
    title: '9x9x9',
    type: puzzleConstants.CUBE,
    size: 9,
    allowInspectionTime: true,
    scrambleOptions: {
      length: 140,
      directions: CUBE_DIRECTIONS
    }
  },
  {
    name: '10x10x10',
    title: '10x10x10',
    type: puzzleConstants.CUBE,
    size: 10,
    allowInspectionTime: true,
    scrambleOptions: {
      length: 160,
      directions: CUBE_DIRECTIONS
    }
  },
  {
    name: '11x11x11',
    title: '11x11x11',
    type: puzzleConstants.CUBE,
    size: 11,
    allowInspectionTime: true,
    scrambleOptions: {
      length: 180,
      directions: CUBE_DIRECTIONS
    }
  },
  {
    name: 'megaminx',
    title: 'Megaminx',
    type: puzzleConstants.DODECAHEDRON,
    allowInspectionTime: true,
    scrambleOptions: {
      jsssScrambler: 'minx'
    }
  },
  {
    name: 'kilominx',
    title: 'Kilominx',
    type: puzzleConstants.DODECAHEDRON,
    allowInspectionTime: true,
    scrambleOptions: {
      jsssScrambler: 'minx'
    }
  },
  {
    name: 'pyraminx',
    title: 'Pyraminx',
    type: puzzleConstants.TETRAHEDRON,
    allowInspectionTime: true,
    scrambleOptions: {
      jsssScrambler: 'pyram'
    }
  },
  {
    name: 'skewb',
    title: 'Skewb',
    type: puzzleConstants.SKEWB,
    allowInspectionTime: true,
    scrambleOptions: {
      length: 11,
      directions: [
        puzzleConstants.UP,
        puzzleConstants.BACK,
        puzzleConstants.LEFT,
        puzzleConstants.RIGHT
      ]
    }
  },
  {
    name: 'square-1',
    title: 'Square-1',
    type: puzzleConstants.SQUARE_ONE,
    allowInspectionTime: true,
    scrambleOptions: {
      jsssScrambler: 'sq1'
    }
  },
  {
    name: 'clock',
    title: 'Clock',
    type: puzzleConstants.CLOCK,
    allowInspectionTime: true,
    scrambleOptions: {
      length: 12
    }
  },
  {
    name: '3x3x3-oh',
    title: '3x3x3 One-Handed',
    type: puzzleConstants.CUBE,
    size: 3,
    allowInspectionTime: true,
    scrambleOptions: {
      jsssScrambler: '333'
    }
  },
  {
    name: '3x3x3-ft',
    title: '3x3x3 With Feet',
    type: puzzleConstants.CUBE,
    size: 3,
    allowInspectionTime: true,
    scrambleOptions: {
      jsssScrambler: '333'
    }
  },
  {
    name: '2x2x2-bld',
    title: '2x2x2 Blindfolded',
    type: puzzleConstants.CUBE,
    size: 2,
    allowInspectionTime: false,
    scrambleOptions: {
      jsssScrambler: '222'
    }
  },
  {
    name: '3x3x3-bld',
    title: '3x3x3 Blindfolded',
    type: puzzleConstants.CUBE,
    size: 3,
    allowInspectionTime: false,
    scrambleOptions: {
      jsssScrambler: '333'
    }
  },
  {
    name: '4x4x4-bld',
    title: '4x4x4 Blindfolded',
    type: puzzleConstants.CUBE,
    size: 4,
    allowInspectionTime: false,
    scrambleOptions: {
      jsssScrambler: '444'
    }
  },
  {
    name: '5x5x5-bld',
    title: '5x5x5 Blindfolded',
    type: puzzleConstants.CUBE,
    size: 5,
    allowInspectionTime: false,
    scrambleOptions: {
      jsssScrambler: '555'
    }
  },
  {
    name: '2-7-relay',
    title: '2-7 Relay',
    type: puzzleConstants.RELAY,
    scrambleOptions: {
      puzzles: ['2x2x2', '3x3x3', '4x4x4', '5x5x5', '6x6x6', '7x7x7']
    }
  },
  {
    name: '2-6-relay',
    title: '2-6 Relay',
    type: puzzleConstants.RELAY,
    scrambleOptions: {
      puzzles: ['2x2x2', '3x3x3', '4x4x4', '5x5x5', '6x6x6']
    }
  },
  {
    name: '2-5-relay',
    title: '2-5 Relay',
    type: puzzleConstants.RELAY,
    scrambleOptions: {
      puzzles: ['2x2x2', '3x3x3', '4x4x4', '5x5x5']
    }
  },
  {
    name: '2-4-relay',
    title: '2-4 Relay',
    type: puzzleConstants.RELAY,
    scrambleOptions: {
      puzzles: ['2x2x2', '3x3x3', '4x4x4']
    }
  }
];

export const DEFAULT_PUZZLE = puzzles[1];

export default puzzles;
