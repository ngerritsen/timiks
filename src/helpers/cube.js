import { UP, RIGHT, DOWN, LEFT, FRONT, BACK } from '../constants/puzzles';
import { WHITE, BLUE, YELLOW, ORANGE, RED, GREEN } from '../constants/puzzles';
import { createAscSorter } from './general';

const TOP_EDGE = { axis: 'y', opposite: false };
const RIGHT_EDGE = { axis: 'x', opposite: true };
const BOTTOM_EDGE = { axis: 'y', opposite: true };
const LEFT_EDGE = { axis: 'x', opposite: false };

const DIRECTIONS = [UP, DOWN, RIGHT, LEFT, FRONT, BACK];

const FACE_EDGE_MAP = {
  [UP]: [
    { face: FRONT, edge: TOP_EDGE },
    { face: LEFT, edge: TOP_EDGE },
    { face: BACK, edge: TOP_EDGE },
    { face: RIGHT, edge: TOP_EDGE }
  ],
  [DOWN]: [
    { face: BACK, edge: BOTTOM_EDGE },
    { face: LEFT, edge: BOTTOM_EDGE },
    { face: FRONT, edge: BOTTOM_EDGE },
    { face: RIGHT, edge: BOTTOM_EDGE }
  ],
  [LEFT]: [
    { face: UP, edge: LEFT_EDGE, reversed: true },
    { face: FRONT, edge: LEFT_EDGE },
    { face: DOWN, edge: LEFT_EDGE },
    { face: BACK, edge: RIGHT_EDGE, reversed: true }
  ],
  [RIGHT]: [
    { face: UP, edge: RIGHT_EDGE },
    { face: BACK, edge: LEFT_EDGE, reversed: true },
    { face: DOWN, edge: RIGHT_EDGE, reversed: true },
    { face: FRONT, edge: RIGHT_EDGE }
  ],
  [FRONT]: [
    { face: UP, edge: BOTTOM_EDGE, reversed: true },
    { face: RIGHT, edge: LEFT_EDGE },
    { face: DOWN, edge: TOP_EDGE, reversed: true },
    { face: LEFT, edge: RIGHT_EDGE }
  ],
  [BACK]: [
    { face: UP, edge: TOP_EDGE },
    { face: LEFT, edge: LEFT_EDGE, reversed: true },
    { face: DOWN, edge: BOTTOM_EDGE },
    { face: RIGHT, edge: RIGHT_EDGE, reversed: true }
  ]
};

const INITIAL_FACES = {
  [UP]: WHITE,
  [DOWN]: YELLOW,
  [LEFT]: ORANGE,
  [RIGHT]: RED,
  [FRONT]: GREEN,
  [BACK]: BLUE
};

export function layoutScramble(scramble, size) {
  const moves = scramble.map(parseMove);

  const validMoves = moves.every(
    move => move.depth <= Math.floor(size / 2) && DIRECTIONS.includes(move.direction)
  );

  if (!validMoves) {
    return null;
  }

  const cube = moves.reduce((cube, move) => {
    const { direction, depth, reversed, twice } = move;
    return generateArr(twice ? 2 : reversed ? 3 : 1).reduce(
      scrambledCube => rotate(scrambledCube, direction, depth),
      cube
    );
  }, createCube(size));

  return cube;
}

function parseMove(move) {
  const direction = parseDirection(move);
  const depth = parseDepth(move);
  const reversed = move.indexOf("'") > 0;
  const twice = move.indexOf('2') > 0;

  return { direction, reversed, depth, twice };
}

function parseDirection(move) {
  return DIRECTIONS.reduce((finalDirection, direction) => {
    return move.indexOf(direction) > -1 ? direction : finalDirection;
  }, '');
}

function parseDepth(move) {
  if (move.indexOf('w') === -1) {
    return 1;
  }

  return Number(move.slice(0, 1)) || 2;
}

function createCube(size) {
  return Object.keys(INITIAL_FACES).reduce(
    (state, face) => ({
      ...state,
      [face]: createFace(size, INITIAL_FACES[face])
    }),
    {}
  );
}

function rotate(cube, face, depth) {
  return {
    ...cube,
    ...cycleEdges(FACE_EDGE_MAP[face], cube, depth),
    [face]: rotateFace(cube[face])
  };
}

function createFace(size, color) {
  return generateArr(size).reduce(
    (cube, y) => [...cube, ...generateArr(size).map(x => ({ x, y, color }))],
    []
  );
}

function cycleEdges(edgeMap, cube, depth) {
  return edgeMap.reduce((nextCube, target, index) => {
    const source = getPreviousItem(edgeMap, index);

    return {
      ...nextCube,
      [target.face]: generateArr(depth).reduce((nextFace, offset) => {
        const row = getEdge(cube[source.face], source.edge, offset);
        const colors = getRowColors(sortRowBy(row, getOppositeAxis(source.edge.axis)));

        return replaceEdgeColors(nextFace, target.edge, colors, offset, target.reversed);
      }, cube[target.face])
    };
  }, {});
}

function replaceEdgeColors(face, edge, colors, offset, reversed = false) {
  const colorQueue = reversed ? [...colors].reverse() : colors;
  const { axis, index } = getEdgeValues(edge, getSize(face), offset);
  const oppositeAxis = getOppositeAxis(axis);

  return face.map(tile =>
    tile[axis] === index ? { ...tile, color: colorQueue[tile[oppositeAxis]] } : tile
  );
}

function getRow(face, axis, index) {
  return face.filter(tile => tile[axis] === index);
}

function getRowColors(row) {
  return row.map(({ color }) => color);
}

function sortRowBy(row, axis) {
  return [...row].sort(createAscSorter(axis));
}

function getEdge(face, edge, offset) {
  const { axis, index } = getEdgeValues(edge, getSize(face), offset);
  return getRow(face, axis, index);
}

function getEdgeValues(edge, size, offset) {
  const { axis, opposite } = edge;
  const index = opposite ? size - 1 - offset : offset;
  return { axis, index };
}

function rotateFace(face) {
  return face.map(({ color, x, y }) => ({
    x: reverseIndex(y, getSize(face)),
    y: x,
    color
  }));
}

function reverseIndex(index, size) {
  return (index - size) * -1 - 1;
}

function getSize(face) {
  return Math.sqrt(face.length);
}

function generateArr(size, arr = []) {
  return arr.length < size ? generateArr(size, [...arr, arr.length]) : arr;
}

function getPreviousItem(array, index) {
  return index === 0 ? array[array.length - 1] : array[index - 1];
}

function getOppositeAxis(axis) {
  return axis === 'x' ? 'y' : 'x';
}
