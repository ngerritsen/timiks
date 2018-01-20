const TOP = { axis: 'y', opposite: false };
const RIGHT = { axis: 'x', opposite: true };
const BOTTOM = { axis: 'y', opposite: true };
const LEFT = { axis: 'x', opposite: false };

export const U = 'U';
export const D = 'D';
export const R = 'R';
export const L = 'L';
export const F = 'F';
export const B = 'B';

const DIRECTIONS = [U, D, R, L, F, B];

export const WHITE = 'WHITE';
export const BLUE = 'BLUE';
export const YELLOW = 'YELLOW';
export const ORANGE = 'ORANGE';
export const RED = 'RED';
export const GREEN = 'GREEN';

const FACE_EDGE_MAP = {
  [U]: [
    { face: F, edge: TOP },
    { face: L, edge: TOP },
    { face: B, edge: TOP },
    { face: R, edge: TOP }
  ],
  [D]: [
    { face: B, edge: BOTTOM },
    { face: L, edge: BOTTOM },
    { face: F, edge: BOTTOM },
    { face: R, edge: BOTTOM }
  ],
  [L]: [
    { face: U, edge: LEFT, reversed: true },
    { face: F, edge: LEFT },
    { face: D, edge: LEFT },
    { face: B, edge: RIGHT, reversed: true }
  ],
  [R]: [
    { face: U, edge: RIGHT },
    { face: B, edge: LEFT, reversed: true },
    { face: D, edge: RIGHT, reversed: true },
    { face: F, edge: RIGHT }
  ],
  [F]: [
    { face: U, edge: BOTTOM, reversed: true },
    { face: R, edge: LEFT },
    { face: D, edge: TOP, reversed: true },
    { face: L, edge: RIGHT }
  ],
  [B]: [
    { face: U, edge: TOP },
    { face: L, edge: LEFT, reversed: true },
    { face: D, edge: BOTTOM },
    { face: R, edge: RIGHT, reversed: true }
  ]
};

const INITIAL_FACES = {
  [U]: WHITE,
  [D]: YELLOW,
  [L]: ORANGE,
  [R]: RED,
  [F]: GREEN,
  [B]: BLUE
};

export function layoutScramble(scramble, size) {
  const cube = scramble.reduce((cube, move) => {
    const { direction, depth, reversed, twice } = parseMove(move);

    return generateArr(twice ? 2 : (reversed ? 3 : 1))
      .reduce((scrambledCube) => rotate(scrambledCube, direction, depth), cube);
  }, createCube(size));
  return formatCube(cube);
}

function parseMove(move) {
  const direction = parseDirection(move);
  const depth = parseDepth(move);
  const reversed = move.indexOf('\'') > 0;
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
  return Object.keys(INITIAL_FACES)
    .reduce((state, face) => ({
      ...state,
      [face]: createFace(size, INITIAL_FACES[face])
    }), {})
}

function formatCube(cube) {
  return Object.keys(cube)
    .reduce((formattedCube, face) => ({
      ...formattedCube,
      [face]: formatFace(cube[face])
    }), cube);
}

function rotate(cube, face, depth) {
  return {
    ...cube,
    ...cycleEdges(FACE_EDGE_MAP[face], cube, depth),
    [face]: rotateFace(cube[face])
  }
}

function formatFace(face) {
  return generateArr(getSize(face))
    .reduce((rows, y) => [
      ...rows,
      generateArr(getSize(face))
        .reduce((row, x) => [
          ...row,
          getTile(face, x, y).color
        ], [])
    ], [])
}

function getTile(face, x, y) {
  return face.find(tile => tile.x === x && tile.y === y);
}

function createFace(size, color) {
  return generateArr(size)
    .reduce((cube, y) => [
      ...cube,
      ...generateArr(size)
        .map(x => ({ x, y, color }))
      ], []);
}

function cycleEdges(edgeMap, cube, depth) {
  return edgeMap.reduce((nextCube, target, index) => {
    const source = getPreviousItem(edgeMap, index);

    return {
      ...nextCube,
      [target.face]: generateArr(depth)
        .reduce((nextFace, offset) => {
          const row = getEdge(cube[source.face], source.edge, offset);
          const colors = getRowColors(sortRowBy(row, getOppositeAxis(source.edge.axis)));

          return replaceEdgeColors(
            nextFace,
            target.edge,
            colors,
            offset,
            target.reversed
          )
        }, cube[target.face])
    }
  }, {})
}

function replaceEdgeColors(face, edge, colors, offset, reversed = false) {
  const colorQueue = reversed ? [...colors].reverse() : colors;
  const { axis, index } = getEdgeValues(edge, getSize(face), offset);
  const oppositeAxis = getOppositeAxis(axis);

  return face.map(tile =>
    tile[axis] === index
      ? { ...tile, color: colorQueue[tile[oppositeAxis]] }
      : tile
  );
}

function getRow(face, axis, index) {
  return face.filter(tile => tile[axis] === index);
}

function getRowColors(row) {
  return row.map(({ color }) => color);
}

function sortRowBy(row, axis) {
  return [...row]
    .sort((a, b) => a[axis] - b[axis]);
}

function getEdge(face, edge, offset) {
  const { axis, index } = getEdgeValues(edge, getSize(face), offset);
  return getRow(face, axis, index);
}

function getEdgeValues(edge, size, offset) {
  const { axis, opposite } = edge;
  const index = opposite ? (size - 1 - offset) : offset;
  return { axis, index };
}

function rotateFace(face) {
  return face
    .map(({ color, x, y }) => ({
      x: reverseIndex(y, getSize(face)),
      y: x,
      color
    }));
}

function reverseIndex(index, size) {
  return ((index - size) * -1) - 1;
}

function getSize(face) {
  return Math.sqrt(face.length);
}

function generateArr(size, arr = []) {
  return arr.length < size
    ? generateArr(size, [...arr, arr.length])
    : arr;
}

function getPreviousItem(array, index) {
  return index === 0
    ? array[array.length - 1]
    : array[index - 1]
}

function getOppositeAxis(axis) {
  return axis === 'x' ? 'y' : 'x';
}
