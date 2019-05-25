import * as puzzleConstants from '../constants/puzzle';

const puzzles = [
  {
    name: '2x2x2',
    title: '2x2x2',
    type: puzzleConstants.CUBE,
    size: 2,
    scrambleOptions: {
      jsssScrambler: '222'
    }
  },
  {
    name: '3x3x3',
    title: '3x3x3',
    type: puzzleConstants.CUBE,
    size: 3,
    scrambleOptions: {
      jsssScrambler: '333'
    }
  },
  {
    name: '4x4x4',
    title: '4x4x4',
    type: puzzleConstants.CUBE,
    size: 4,
    scrambleOptions: {
      jsssScrambler: '444'
    }
  },
  {
    name: '5x5x5',
    title: '5x5x5',
    type: puzzleConstants.CUBE,
    size: 5,
    scrambleOptions: {
      jsssScrambler: '555'
    }
  },
  {
    name: '6x6x6',
    title: '6x6x6',
    type: puzzleConstants.CUBE,
    size: 6,
    scrambleOptions: {
      jsssScrambler: '666'
    }
  },
  {
    name: '7x7x7',
    title: '7x7x7',
    type: puzzleConstants.CUBE,
    size: 7,
    scrambleOptions: {
      jsssScrambler: '777'
    }
  },
  {
    name: 'megaminx',
    title: 'Megaminx',
    type: puzzleConstants.DODECAHEDRON,
    scrambleOptions: {
      jsssScrambler: 'minx'
    }
  },
  {
    name: 'kilominx',
    title: 'Kilominx',
    type: puzzleConstants.DODECAHEDRON,
    scrambleOptions: {
      jsssScrambler: 'minx'
    }
  },
  {
    name: 'pyraminx',
    title: 'Pyraminx',
    type: puzzleConstants.TETRAHEDRON,
    scrambleOptions: {
      jsssScrambler: 'pyram'
    }
  },
  {
    name: 'skewb',
    title: 'Skewb',
    type: puzzleConstants.SKEWB,
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
    scrambleOptions: {
      jsssScrambler: 'sq1'
    }
  },
  {
    name: 'clock',
    title: 'Clock',
    type: puzzleConstants.CLOCK,
    scrambleOptions: {
      length: 12
    }
  },
  {
    name: '3x3x3-oh',
    title: '3x3x3 One-Handed',
    type: puzzleConstants.CUBE,
    size: 3,
    scrambleOptions: {
      jsssScrambler: '333'
    }
  },
  {
    name: '3x3x3-ft',
    title: '3x3x3 With Feet',
    type: puzzleConstants.CUBE,
    size: 3,
    scrambleOptions: {
      jsssScrambler: '333'
    }
  },
  {
    name: '2x2x2-bld',
    title: '2x2x2 Blindfolded',
    type: puzzleConstants.CUBE,
    size: 2,
    scrambleOptions: {
      jsssScrambler: '222'
    }
  },
  {
    name: '3x3x3-bld',
    title: '3x3x3 Blindfolded',
    type: puzzleConstants.CUBE,
    size: 3,
    scrambleOptions: {
      jsssScrambler: '333'
    }
  },
  {
    name: '4x4x4-bld',
    title: '4x4x4 Blindfolded',
    type: puzzleConstants.CUBE,
    size: 4,
    scrambleOptions: {
      jsssScrambler: '444'
    }
  },
  {
    name: '5x5x5-bld',
    title: '5x5x5 Blindfolded',
    type: puzzleConstants.CUBE,
    size: 5,
    scrambleOptions: {
      jsssScrambler: '555'
    }
  }
];

export const DEFAULT_PUZZLE = puzzles[1];

export default puzzles;
