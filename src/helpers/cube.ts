import { Cube, CubeDirection, CubeFace, CubeTile, PuzzleColor } from "../types";
import { createAscSorter, generateArr } from "./general";
import { splitScramble } from "./scramble";

type Axis = "x" | "y";
type CubeEdge = { axis: Axis; opposite: boolean };
type FaceEdge = { face: CubeDirection; edge: CubeEdge; reversed?: boolean };
type Move = {
  reversed: boolean;
  direction: CubeDirection;
  depth: number;
  twice: boolean;
};

const TOP_EDGE: CubeEdge = { axis: "y", opposite: false };
const RIGHT_EDGE: CubeEdge = { axis: "x", opposite: true };
const BOTTOM_EDGE: CubeEdge = { axis: "y", opposite: true };
const LEFT_EDGE: CubeEdge = { axis: "x", opposite: false };
const DIRECTIONS: CubeDirection[] = ["U", "D", "L", "R", "F", "B"];

const FACE_EDGE_MAP: Record<CubeDirection, FaceEdge[]> = {
  U: [
    { face: "F", edge: TOP_EDGE },
    { face: "L", edge: TOP_EDGE },
    { face: "B", edge: TOP_EDGE },
    { face: "R", edge: TOP_EDGE },
  ],
  D: [
    { face: "B", edge: BOTTOM_EDGE },
    { face: "L", edge: BOTTOM_EDGE },
    { face: "F", edge: BOTTOM_EDGE },
    { face: "R", edge: BOTTOM_EDGE },
  ],
  L: [
    { face: "U", edge: LEFT_EDGE, reversed: true },
    { face: "F", edge: LEFT_EDGE },
    { face: "D", edge: LEFT_EDGE },
    { face: "B", edge: RIGHT_EDGE, reversed: true },
  ],
  R: [
    { face: "U", edge: RIGHT_EDGE },
    { face: "B", edge: LEFT_EDGE, reversed: true },
    { face: "D", edge: RIGHT_EDGE, reversed: true },
    { face: "F", edge: RIGHT_EDGE },
  ],
  F: [
    { face: "U", edge: BOTTOM_EDGE, reversed: true },
    { face: "R", edge: LEFT_EDGE },
    { face: "D", edge: TOP_EDGE, reversed: true },
    { face: "L", edge: RIGHT_EDGE },
  ],
  B: [
    { face: "U", edge: TOP_EDGE },
    { face: "L", edge: LEFT_EDGE, reversed: true },
    { face: "D", edge: BOTTOM_EDGE },
    { face: "R", edge: RIGHT_EDGE, reversed: true },
  ],
};

const INITIAL_FACES: Record<CubeDirection, PuzzleColor> = {
  U: "W",
  D: "Y",
  L: "O",
  R: "R",
  F: "G",
  B: "B",
};

export function layoutScramble(scramble: string, size: number) {
  const moves = splitScramble(scramble).map(parseMove);

  const validMoves = moves.every(
    (move) =>
      move.depth <= Math.floor(size / 2) && DIRECTIONS.includes(move.direction)
  );

  if (!validMoves) {
    return null;
  }

  const cube = moves.reduce((cube, move) => {
    const { direction, depth, reversed, twice } = move;
    return generateArr(twice ? 2 : reversed ? 3 : 1).reduce(
      (scrambledCube) => rotate(scrambledCube, direction, depth),
      cube
    );
  }, createCube(size));

  return cube;
}

function parseMove(move: string): Move {
  const direction = parseDirection(move);
  const depth = parseDepth(move);
  const reversed = move.indexOf("'") > 0;
  const twice = move.indexOf("2") > 0;

  return { direction, reversed, depth, twice };
}

function parseDirection(move: string) {
  return DIRECTIONS.reduce((finalDirection, direction) => {
    return move.indexOf(direction) > -1 ? direction : finalDirection;
  }, "") as CubeDirection;
}

function parseDepth(move: string) {
  if (move.indexOf("w") === -1) {
    return 1;
  }

  return Number(move.slice(0, 1)) || 2;
}

function createCube(size: number): Cube {
  return Object.keys(INITIAL_FACES).reduce(
    (state, face: CubeDirection) => ({
      ...state,
      [face]: createFace(size, INITIAL_FACES[face]),
    }),
    {}
  ) as Cube;
}

function rotate(cube: Cube, face: CubeDirection, depth: number) {
  return {
    ...cube,
    ...cycleEdges(FACE_EDGE_MAP[face], cube, depth),
    [face]: rotateFace(cube[face]),
  };
}

function createFace(size: number, color: PuzzleColor) {
  return generateArr(size).reduce(
    (face, y) => [...face, ...generateArr(size).map((x) => ({ x, y, color }))],
    []
  );
}

function cycleEdges(edgeMap: FaceEdge[], cube: Cube, depth: number) {
  return edgeMap.reduce<Cube>((nextCube, target, index) => {
    const source = getPreviousItem(edgeMap, index);

    return {
      ...nextCube,
      [target.face]: generateArr(depth).reduce((nextFace, offset) => {
        const row = getEdge(cube[source.face], source.edge, offset);
        const colors = getRowColors(
          sortRowBy(row, getOppositeAxis(source.edge.axis))
        );

        return replaceEdgeColors(
          nextFace,
          target.edge,
          colors,
          offset,
          target.reversed
        );
      }, cube[target.face]),
    };
  }, {} as Cube);
}

function replaceEdgeColors(
  face: CubeFace,
  edge: CubeEdge,
  colors: PuzzleColor[],
  offset: number,
  reversed = false
) {
  const colorQueue = reversed ? [...colors].reverse() : colors;
  const { axis, index } = getEdgeValues(edge, getSize(face), offset);
  const oppositeAxis = getOppositeAxis(axis);

  return face.map((tile) =>
    tile[axis] === index
      ? { ...tile, color: colorQueue[tile[oppositeAxis]] }
      : tile
  );
}

function getRow(face: CubeFace, axis: Axis, index: number) {
  return face.filter((tile) => tile[axis] === index);
}

function getRowColors(row: CubeTile[]) {
  return row.map(({ color }) => color);
}

function sortRowBy(row: CubeTile[], axis: Axis) {
  return [...row].sort(createAscSorter(axis));
}

function getEdge(face: CubeFace, edge: CubeEdge, offset: number) {
  const { axis, index } = getEdgeValues(edge, getSize(face), offset);
  return getRow(face, axis, index);
}

function getEdgeValues(edge: CubeEdge, size: number, offset: number) {
  const { axis, opposite } = edge;
  const index = opposite ? size - 1 - offset : offset;
  return { axis, index };
}

function rotateFace(face: CubeFace) {
  return face.map(({ color, x, y }) => ({
    x: reverseIndex(y, getSize(face)),
    y: x,
    color,
  }));
}

function reverseIndex(index: number, size: number) {
  return (index - size) * -1 - 1;
}

function getSize(face: CubeFace) {
  return Math.sqrt(face.length);
}

function getPreviousItem<T>(array: T[], index: number) {
  return index === 0 ? array[array.length - 1] : array[index - 1];
}

function getOppositeAxis(axis: Axis): Axis {
  return axis === "x" ? "y" : "x";
}
