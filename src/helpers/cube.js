const TOP = { axis: 'y', end: false };
const RIGHT = { axis: 'x', end: true };
const BOTTOM = { axis: 'y', end: true };
const LEFT = { axis: 'x', end: false };

const U = 'U';
const D = 'D';
const R = 'R';
const L = 'L';
const F = 'F';
const B = 'B';

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
    { face: U, edge: LEFT },
    { face: F, edge: LEFT },
    { face: D, edge: LEFT },
    { face: B, edge: RIGHT }
  ],
  [R]: [
    { face: U, edge: RIGHT },
    { face: B, edge: LEFT },
    { face: D, edge: RIGHT },
    { face: F, edge: RIGHT }
  ],
  [F]: [
    { face: U, edge: BOTTOM },
    { face: R, edge: RIGHT },
    { face: D, edge: TOP },
    { face: L, edge: RIGHT }
  ],
  [B]: [
    { face: U, edge: TOP },
    { face: L, edge: LEFT },
    { face: D, edge: BOTTOM },
    { face: R, edge: LEFT }
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
    const { direction, times } = parseMove(move);

    return generateArr(times)
      .reduce((scrambledCube) => {
        return rotate(scrambledCube, direction);
      }, cube);
  }, createCube(size));

  return formatCube(cube);
}

function parseMove(move) {
  const direction = move.slice(0, 1);
  const reverse = move.indexOf('\'') === 1;
  const twice = move.indexOf('2') === 1;

  let times = reverse ? 3 : 1;

  times = twice ? 2 : times;

  return { direction, times };
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
    .reduce((sortedCube, face) => ({
      ...sortedCube,
      [face]: formatFace(sortFace(cube[face]))
    }), cube);
}

function rotate(cube, face) {
  return {
    ...cube,
    ...cycleEdges(FACE_EDGE_MAP[face], cube),
    [face]: sortFace(rotateFace(cube[face]))
  }
}

function formatFace(face) {
  return generateArr(getSize(face))
    .map(y => getRow(face, 'y', y)
      .map(tile => tile.color));
}

function sortFace(face) {
  return face
    .slice(0)
    .sort((a, b) => a.x - b.x)
    .sort((a, b) => a.y - b.y);
}

function createFace(size, color) {
  return generateArr(size)
    .reduce((cube, y) => [
      ...cube,
      ...generateArr(size)
        .map(x => ({ x, y, color }))
      ], []);
}

function cycleEdges(edgeMap, cube) {
  return edgeMap.reduce((nextCube, target, index) => {
    const source = getPreviousItem(edgeMap, index);
    const row = getEdge(cube[source.face], source.edge);
    const colors = getRowColors(row);

    return {
      ...nextCube,
      [target.face]: sortFace(replaceEdgeColors(
        cube[target.face],
        target.edge,
        colors
      ))
    }
  }, {})
}

function getRow(face, axis, index) {
  return face.filter(tile => tile[axis] === index);
}

function getRowColors(row) {
  return row.map(({ color }) => color);
}

function getEdge(face, edge) {
  const { axis, index } = getEdgeValues(edge, getSize(face));
  return getRow(face, axis, index);
}

function replaceEdgeColors(face, edge, colors) {
  const colorQueue = [...colors].reverse();
  const { axis, index } = getEdgeValues(edge, getSize(face));
  return face.map(tile =>
    tile[axis] === index
      ? { ...tile, color: colorQueue.pop() }
      : tile
  );
}

function getEdgeValues(edge, size) {
  const { axis, end } = edge;
  const index = end ? (size - 1) : 0;
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
