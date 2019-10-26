import { DEFAULT_PUZZLE } from '../constants/settings';
import * as puzzleConstants from '../constants/puzzles';
import { getPuzzle } from './puzzle';
import scramblers from '../vendor/jsss';

import { generateArr, pickRandom } from './general';
import { SCRAMBLE_DELIMITER } from '../constants/scramble';

export function splitRelayScramble(puzzle, scramble) {
  const relayPuzzle = getPuzzle(puzzle);
  const puzzles = relayPuzzle.scrambleOptions.puzzles || [];
  const parsedScramble = splitScramble(scramble);

  if (parsedScramble[0] !== puzzles[0]) {
    return [];
  }

  return parsedScramble.reduce(
    (splitScrambles, token) =>
      puzzles.includes(token)
        ? [...splitScrambles, { puzzle: token, scramble: '' }]
        : splitScrambles.map((scramble, i) =>
            i === splitScrambles.length - 1
              ? { ...scramble, scramble: scramble.scramble + SCRAMBLE_DELIMITER + token }
              : scramble
          ),
    []
  );
}

export function generateScramble(puzzle = DEFAULT_PUZZLE) {
  const { scrambleOptions = {}, type, size } = getPuzzle(puzzle);
  const { jsssScrambler, puzzles: relayPuzzles } = scrambleOptions;

  if (jsssScrambler) {
    return getJsssScramble(jsssScrambler, type);
  }

  switch (type) {
    case puzzleConstants.STATIC:
      return generateStaticScramble(scrambleOptions);
    case puzzleConstants.CUBE:
      return generateCubeScramble(scrambleOptions, size);
    case puzzleConstants.RELAY:
      return generateRelayScramble(relayPuzzles);
    case puzzleConstants.SKEWB:
      return generateSkewbScramble(scrambleOptions);
    case puzzleConstants.CLOCK:
      return generateClockScamble(scrambleOptions);
    default:
      return '';
  }
}

export function splitScramble(str, splitOn = SCRAMBLE_DELIMITER) {
  return str
    .split(splitOn)
    .map(str => str.trim())
    .filter(Boolean);
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

  return scrambleString;
}

function formatJsssCubeScramble(scramble) {
  return splitScramble(scramble)
    .map(move => {
      const firstChar = Number(move.charAt(0));

      if (isNaN(firstChar)) {
        return move;
      }

      const prefix = firstChar > 2 ? move.substr(0, 2) : move.substr(1, 1);

      return prefix + 'w' + move.substr(2);
    })
    .join(SCRAMBLE_DELIMITER);
}

function formatJsssDodecahedronScramble(scramble) {
  return splitScramble(scramble.replace(/<br>/g, ' ')).join(SCRAMBLE_DELIMITER);
}

function formatJsssSquareOneScramble(scramble) {
  return splitScramble(scramble, '/')
    .reduce((moves, move, index) => (index === 0 ? [...moves, move] : [...moves, '/', move]), [])
    .join(SCRAMBLE_DELIMITER);
}

function generateRelayScramble(relayPuzzles) {
  return relayPuzzles.reduce(
    (relayScramble, puzzle) =>
      [relayScramble, puzzle, generateScramble(puzzle)].join(SCRAMBLE_DELIMITER),
    ''
  );
}

function generateSkewbScramble(scrambleOptions) {
  const { directions, length } = scrambleOptions;

  return generateArr(length)
    .reduce(moves => {
      const previousDirection = extractLastDirection(moves, directions);
      const relevantOpposites = puzzleConstants.CUBE_OPPOSITES.find(arr =>
        arr.includes(previousDirection)
      );
      const direction = pickRandomDirection(directions, previousDirection, relevantOpposites);
      const reversed = randomBoolean();

      const move = direction + charIf(reversed, `'`);

      return [...moves, move];
    }, [])
    .join(SCRAMBLE_DELIMITER);
}

function generateCubeScramble(scrambleOptions, size) {
  const { directions, length } = scrambleOptions;
  const wideLayerAmount = Math.max(Math.floor(size / 2), 1);
  const wideLayerOptions = generateArr(wideLayerAmount).map(i => (i === 0 ? '' : i + 1));

  return generateArr(length)
    .reduce(moves => {
      const previousDirection = extractLastDirection(moves, directions);
      const relevantOpposites = puzzleConstants.CUBE_OPPOSITES.find(arr =>
        arr.includes(previousDirection)
      );
      const direction = pickRandomDirection(directions, previousDirection, relevantOpposites);
      const wideLayers = pickRandom(wideLayerOptions);
      const double = pickRandom([true, false, false]);
      const reversed = randomBoolean() && !double;

      const move =
        wideLayers +
        direction +
        charIf(wideLayers, 'w') +
        charIf(reversed, `'`) +
        charIf(double, '2');

      return [...moves, move];
    }, [])
    .join(SCRAMBLE_DELIMITER);
}

function generateStaticScramble(scrambleOptions) {
  const { directions, length } = scrambleOptions;

  return generateArr(length)
    .reduce(moves => {
      const previousDirection = extractLastDirection(moves, directions);
      const direction = pickRandomDirection(directions, previousDirection);
      const double = pickRandom([true, false, false]);
      const reversed = randomBoolean() && !double;

      const move = direction + charIf(reversed, `'`) + charIf(double, '2');

      return [...moves, move];
    }, [])
    .join(SCRAMBLE_DELIMITER);
}

function generateClockScamble() {
  const multiPinSettings = ['U', 'R', 'D', 'L', 'ALL'];
  const singlePinSettings = ['UR', 'DR', 'DL', 'UL'];

  const front = [...singlePinSettings, ...multiPinSettings].map(generateClockTurn);
  const back = multiPinSettings.map(generateClockTurn);
  const finalPins = generateArr(randomNumber(0, 4))
    .reduce(
      chosenPins => [
        ...chosenPins,
        pickRandom(singlePinSettings.filter(sps => !chosenPins.includes(sps)))
      ],
      []
    )
    .sort((a, b) => singlePinSettings.indexOf(a) - singlePinSettings.indexOf(b));

  return [...front, 'y2', ...back, ...finalPins].join(SCRAMBLE_DELIMITER);
}

function generateClockTurn(pins) {
  return pins + randomNumber(1, 6) + pickRandom(['+', '-']);
}

function randomBoolean() {
  return pickRandom([false, true]);
}

function pickRandomDirection(directions, previousDirection, opposites = []) {
  return pickRandom(
    directions.filter(direction => ![...opposites, previousDirection].includes(direction))
  );
}

function charIf(bool, a, b = '') {
  return bool ? a : b;
}

function getLastMove(moves) {
  return moves[moves.length - 1] || '';
}

function randomNumber(min, max) {
  return pickRandom(generateArr(max - min + 1)) + min;
}

function extractLastDirection(moves, directions) {
  const lastMove = getLastMove(moves);

  return directions.reduce((foundDirection, direction) => {
    const found = lastMove.indexOf(direction) > -1;

    return found ? direction : foundDirection;
  }, null);
}
