import * as constants from '../constants/app';
import puzzles, { CUBE, DODECAHEDRON, TETRAHEDRON, SQUARE_ONE, CLOCK } from '../constants/puzzles';
import { generateArr } from './general';

const scrambleGeneratorMap = {
  [CUBE]: generateCubeScramble,
  [CLOCK]: generateClockScamble,
  [DODECAHEDRON]: generateDodecahedronScramble,
  [TETRAHEDRON]: generateTetrahedronScramble,
  [SQUARE_ONE]: generateSquareOneScramble
}

export function generateScramble(puzzle = constants.DEFAULT_PUZZLE) {
  const { scrambleOptions, type } = getPuzzle(puzzle);

  return scrambleGeneratorMap[type](scrambleOptions);
}

export function obfuscateScramble(scramble) {
  return scramble.map(move => generateString(move.length, constants.SCRAMBLE_OBFUSCATION_CHAR));
}

function generateCubeScramble(scrambleOptions) {
  const { directions, length, extraLayers } = scrambleOptions;

  return generateArr(length).reduce(moves => {
    const previousDirection = extractLastDirection(moves, directions);
    const direction = pickRandomDirection(directions, previousDirection);
    const twice = pickRandom([false, false, true]);
    const reversed = twice ? false : randomBoolean();
    const outerLayers = extraLayers ? randomBoolean() : false;
    const threeOuterLayers = (outerLayers && extraLayers > 1) ? randomBoolean(): false;

    const move = (
      charIf(threeOuterLayers, '3') +
      direction +
      charIf(outerLayers, 'w') +
      charIf(twice, '2') +
      charIf(reversed, `'`)
    );

    return [...moves, move];
  }, []);
}

function generateDodecahedronScramble(scrambleOptions) {
  const { directions, endDirection, lineLength, lines } = scrambleOptions;

  return generateArr(lines * lineLength).reduce((moves, index) => {
    const isEndMove = (index + 1) % lineLength === 0;

    if (isEndMove) {
      const endMove = endDirection + charIf(randomBoolean(), `'`);
      return [...moves, endMove]
    }

    const previousDirection = extractLastDirection(moves, directions);
    const direction = pickRandomDirection(directions, previousDirection);
    const move = direction + charIf(randomBoolean(), '--', '++');

    return [...moves, move];
  }, []);
}

function generateTetrahedronScramble(scrambleOptions) {
  const { directions, length } = scrambleOptions;
  const lowerCaseAmount = pickRandom(generateArr(directions.length).map(i => i + 1));
  const lowerCaseDirections = pickMultipleRandom(directions, lowerCaseAmount);

  const moves = generateArr(length).reduce((moves) => {
    const previousDirection = extractLastDirection(moves, directions);
    const move = pickRandomDirection(directions, previousDirection) + charIf(randomBoolean(), `'`);

    return [...moves, move];
  }, [])

  const endMoves = lowerCaseDirections
    .map(direction => direction.toLowerCase() + charIf(randomBoolean(), `'`))

  return [...moves, ...endMoves];
}

function generateClockScamble(scrambleOptions) {
  return generateArr(scrambleOptions.length).map(() => {
    const pins = generateArr(4).map(() => pickRandom(['d', 'U'])).join('');
    const wheel = randomNumber(1, 4);
    const turns = pickRandom([randomNumber(-6, -1), randomNumber(1, 6)]);

    return `(${pins}, ${wheel}, ${turns})`;
  });
}

function generateSquareOneScramble(scrambleOptions) {
  return generateArr(scrambleOptions.length).map(() => {
    return `${randomNumber(-6, 6)},${randomNumber(-6, 6)} /`;
  });
}

function generateString(amount, char) {
  return generateArr(amount).reduce(string => string + char, '');
}

function getPuzzle(puzzle) {
  return puzzles.find(({ name }) => name === puzzle);
}

function randomBoolean() {
  return pickRandom([false, true]);
}

function pickRandomDirection(directions, previousDirection) {
 return pickRandom(directions.filter(direction => direction !== previousDirection));
}

function pickRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function pickMultipleRandom(array, amount, items = []) {
  const pickedItem = pickRandom(array);
  const nextItems = [...items, pickedItem];

  if (amount === 1) {
    return nextItems;
  }

  const nextArray = array.filter(item => item !== pickedItem)

  return pickMultipleRandom(nextArray, amount - 1, nextItems);
}

function randomNumber(min, max) {
  return pickRandom(generateArr(max - min + 1)) + min;
}

function charIf(bool, a, b = '') {
  return bool ? a : b;
}

function getLastMove(moves) {
  return moves[moves.length - 1] || '';
}

function extractLastDirection(moves, directions) {
  const lastMove = getLastMove(moves);

  return directions.reduce((foundDirection, direction) => {
    const uppercaseDirection = direction.toUpperCase();
    const found = lastMove.toUpperCase().indexOf(uppercaseDirection) > -1;

    return found ? uppercaseDirection : foundDirection;
  }, null);
}
