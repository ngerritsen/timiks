import * as constants from '../constants/app';
import puzzles, { DODECAHEDRON } from '../constants/puzzles';

export function generateScramble(puzzle = constants.DEFAULT_PUZZLE) {
  const { scrambleOptions, type } = getPuzzle(puzzle);

  if (type === DODECAHEDRON) {
    return createDodecahedronScramble(scrambleOptions);
  }

  return createCubeScramble(scrambleOptions);
}

export function obfuscateScramble(scramble) {
  return scramble.map(move => generateString(move.length, constants.SCRAMBLE_OBFUSCATION_CHAR));
}

function createCubeScramble(scrambleOptions) {
  const { directions, length, extraLayers } = scrambleOptions;
  let moves = [];

  doTimes(length, () => {
    const previousDirection = (moves[moves.length - 1] || '').slice(0, 1);
    const direction = pickRandom(directions.filter(d => d !== previousDirection));
    const twice = pickRandom([false, false, true]);
    const reversed = twice ? false : randomBoolean();
    const outerLayers = extraLayers ? randomBoolean() : false;
    const threeOuterLayers = (outerLayers && extraLayers > 1) ? randomBoolean(): false;

    const move = (
      (threeOuterLayers ? '3' : '') +
      direction +
      (outerLayers ? 'w' : '') +
      (twice ? '2' : '') +
      (reversed ? '\'' : '')
    );

    moves = [...moves, move];
  });

  return moves;
}

function createDodecahedronScramble(scrambleOptions) {
  const { directions, endDirection, lineLength, lines } = scrambleOptions;
  let moves = [];

  doTimes(lines, () => {
    const endMove = endDirection + (randomBoolean() ? '\'' : '');

    doTimes(lineLength - 1, () => {
      const direction = pickRandom(directions);
      const move = direction + (randomBoolean() ? '--' : '++');

      moves = [...moves, move];
    });

    moves = [...moves, endMove]
  });

  return moves;
}

function generateString(amount, char) {
  let string = '';

  for (let i = 0; i < amount; i++) {
    string += char;
  }

  return string;
}

function getPuzzle(puzzle) {
  return puzzles.find(({ name }) => name === puzzle);
}

function randomBoolean() {
  return pickRandom([false, true]);
}

function pickRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function doTimes(n, callback) {
  for (let i = 0; i < n; i++) {
    callback(i);
  }
}
