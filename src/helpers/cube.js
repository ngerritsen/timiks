const edges = {
  top: { axis: 'y', end: false },
  right: { axis: 'x', end: true },
  bottom: { axis: 'y', end: true },
  left: { axis: 'x', end: false }
};

const U = 'U';
const D = 'D';
const R = 'R';
const L = 'L';
const F = 'F';
const B = 'B';

const faceEdgeMap = {
  [U]: [
    { face: F, edge: edges.top },
    { face: L, edge: edges.top },
    { face: B, edge: edges.top },
    { face: R, edge: edges.top }
  ],
  [D]: [
    { face: R, edge: edges.bottom },
    { face: B, edge: edges.bottom },
    { face: L, edge: edges.bottom },
    { face: F, edge: edges.bottom }
  ],
  [L]: [
    { face: U, edge: edges.left },
    { face: F, edge: edges.left },
    { face: D, edge: edges.left },
    { face: B, edge: edges.right }
  ],
  [R]: [
    { face: U, edge: edges.right },
    { face: B, edge: edges.left },
    { face: D, edge: edges.right },
    { face: F, edge: edges.right }
  ],
  [F]: [
    { face: U, edge: edges.bottom },
    { face: R, edge: edges.right },
    { face: D, edge: edges.top },
    { face: L, edge: edges.right }
  ],
  [B]: [
    { face: U, edge: edges.top },
    { face: L, edge: edges.left },
    { face: D, edge: edges.bottom },
    { face: R, edge: edges.left }
  ]
};

const printMap = [
  ['', U],
  [L, F, R, B],
  ['', D]
];

const initialState = {
  [U]: 'White',
  [D]: 'Yellow',
  [L]: 'Orange',
  [R]: 'Red',
  [F]: 'Green',
  [B]: 'Blue'
};

export function createCube(size) {
  return Object.keys(initialState)
    .reduce((state, face) => ({
      ...state,
      [face]: createFace(size, initialState[face])
    }), {})
}

export function getLayout(cube) {
  const size = getSize(cube.U);

  return printMap.map(row =>
    generateArr(size)
      .map((yIndex) =>
        row.map(face =>
          !face
            ? generateArr(size).map(() => ' ')
            : sortTilesBy(
              cube[face].filter(({ y }) => y === yIndex),
              'x'
            )
              .map(({ color }) => color.slice(0, 1))
        )
      )
    )
}

export function rotate(cube, face) {
  return {
    ...cube,
    ...cycleEdges(faceEdgeMap[face], cube),
    [face]: rotateFace(cube[face])
  }
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
  let nextCube = cube;

  edgeMap.forEach(({ edge, face }, index) => {
    const donorEdge = index === 0
      ? edgeMap[edgeMap.length - 1]
      : edgeMap[index - 1];

    const row = getEdge(cube[donorEdge.face], donorEdge.edge);
    const colors = getRowColors(row);

    nextCube = {
      ...nextCube,
      [face]: replaceEdgeColors(cube[face], edge, colors)
    }
  })

  return nextCube;
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
  const colorQueue = [...colors];
  const { axis, index } = getEdgeValues(edge);
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
  return face.map(({ color, x, y }) => ({
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

function sortTilesBy(tiles, axis) {
  return tiles
    .slice(0)
    .sort((a, b) => a[axis] - b[axis]);
}

function generateArr(size, arr = []) {
  return arr.length < size
    ? generateArr(size, [...arr, arr.length])
    : arr;
}
