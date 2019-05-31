import * as constants from '../constants/app';
import puzzles from '../constants/puzzles';
import * as puzzleConstants from '../constants/puzzle';
import scramblers from '../vendor/jsss';

import { generateArr } from './general';

export function generateScramble(puzzle = constants.DEFAULT_PUZZLE) {
  const { scrambleOptions, type, size } = getPuzzle(puzzle);
  const { jsssScrambler, puzzles: relayPuzzles } = scrambleOptions;

  if (jsssScrambler) {
    return getJsssScramble(jsssScrambler, type);
  }

  if (type === puzzleConstants.CUBE) {
    return generateCubeScramble(scrambleOptions, size);
  }

  if (type === puzzleConstants.RELAY) {
    return generateRelayScramble(relayPuzzles);
  }

  if (type === puzzleConstants.SKEWB) {
    return generateSkewbScramble(scrambleOptions);
  }

  if (type === puzzleConstants.CLOCK) {
    return generateClockScamble(scrambleOptions);
  }

  return [];
}

function getJsssScramble(jsssScrambler, type) {
  const result = scramblers[jsssScrambler].getRandomScramble();

  const scrambleString = result.scramble_string;

  if (type === puzzleConstants.CUBE) {
    return formatJsssCubeScramble(scrambleString);
  }

  if (type === puzzleConstants.DODECAHEDRON) {
    return formatJsssDodecahedronScramble(scrambleString);
  }

  if (type === puzzleConstants.SQUARE_ONE) {
    return formatJsssSquareOneScramble(scrambleString);
  }

  return scrambleString.split(' ');
}

function formatJsssCubeScramble(scramble) {
  return splitScramble(scramble, ' ').map(move => {
    const firstChar = Number(move.charAt(0));

    if (isNaN(firstChar)) {
      return move;
    }

    const prefix = firstChar > 2 ? move.substr(0, 2) : move.substr(1, 1);

    return prefix + 'w' + move.substr(2);
  });
}

function formatJsssDodecahedronScramble(scramble) {
  return splitScramble(scramble.replace(/<br>/g, ' '), ' ');
}

function formatJsssSquareOneScramble(scramble) {
  return splitScramble(scramble, '/').reduce(
    (moves, move, index) => (index === 0 ? [...moves, move] : [...moves, '/', move]),
    []
  );
}

function generateRelayScramble(relayPuzzles) {
  return relayPuzzles.reduce(
    (relayScramble, puzzle) => [...relayScramble, puzzle, ...generateScramble(puzzle)],
    []
  );
}

function generateSkewbScramble(scrambleOptions) {
  const { directions, length } = scrambleOptions;

  return generateArr(length).reduce(moves => {
    const previousDirection = extractLastDirection(moves, directions);
    const relevantOpposites = puzzleConstants.CUBE_OPPOSITES.find(arr =>
      arr.includes(previousDirection)
    );
    const direction = pickRandomDirection(directions, previousDirection, relevantOpposites);
    const reversed = randomBoolean();

    const move = direction + charIf(reversed, `'`);

    return [...moves, move];
  }, []);
}

function generateCubeScramble(scrambleOptions, size) {
  const { directions, length } = scrambleOptions;
  const wideLayerAmount = Math.max(Math.floor(size / 2), 1);
  const wideLayerOptions = generateArr(wideLayerAmount).map(i => (i === 0 ? '' : i + 1));

  return generateArr(length).reduce(moves => {
    const previousDirection = extractLastDirection(moves, directions);
    const relevantOpposites = puzzleConstants.CUBE_OPPOSITES.find(arr =>
      arr.includes(previousDirection)
    );
    const direction = pickRandomDirection(directions, previousDirection, relevantOpposites);
    const wideLayers = pickRandom(wideLayerOptions);
    const reversed = randomBoolean();

    const move = wideLayers + direction + charIf(wideLayers, 'w') + charIf(reversed, `'`);

    return [...moves, move];
  }, []);
}

function generateClockScamble(scrambleOptions) {
  return generateArr(scrambleOptions.length).map(() => {
    const pins = generateArr(4)
      .map(() => pickRandom(['d', 'U']))
      .join('');
    const wheel = randomNumber(1, 4);
    const turns = pickRandom([randomNumber(-6, -1), randomNumber(1, 6)]);

    return `(${pins}, ${wheel}, ${turns})`;
  });
}

function getPuzzle(puzzle) {
  return puzzles.find(({ name }) => name === puzzle);
}

function randomBoolean() {
  return pickRandom([false, true]);
}

function pickRandomDirection(directions, previousDirection, opposites = []) {
  return pickRandom(
    directions.filter(direction => ![...opposites, previousDirection].includes(direction))
  );
}

function pickRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function charIf(bool, a, b = '') {
  return bool ? a : b;
}

function getLastMove(moves) {
  return moves[moves.length - 1] || '';
}

function splitScramble(str, splitOn) {
  return str
    .split(splitOn)
    .map(str => str.trim())
    .filter(Boolean);
}

function randomNumber(min, max) {
  return pickRandom(generateArr(max - min + 1)) + min;
}

function extractLastDirection(moves, directions) {
  const lastMove = getLastMove(moves);

  return directions.reduce((foundDirection, direction) => {
    const uppercaseDirection = direction.toUpperCase();
    const found = lastMove.toUpperCase().indexOf(uppercaseDirection) > -1;

    return found ? uppercaseDirection : foundDirection;
  }, null);
}
