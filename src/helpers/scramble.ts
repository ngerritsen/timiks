import { DEFAULT_PUZZLE } from "../constants/settings";
import * as puzzleConstants from "../constants/puzzles";
import { getPuzzle } from "./puzzle";
import scramblers from "../vendor/jsss";

import { generateArr, pickRandom } from "./general";
import { SCRAMBLE_DELIMITER } from "../constants/scramble";
import {
  CubeDirection,
  JsssScrambler,
  JsssScramblerType,
  PuzzleType,
  ScrambleOptions,
  StaticDirection,
} from "../types";

export function splitRelayScramble(puzzle: string, scramble: string) {
  const relayPuzzle = getPuzzle(puzzle);
  const puzzles = relayPuzzle.scrambleOptions.puzzles || [];
  const parsedScramble = splitScramble(scramble);

  if (parsedScramble[0] !== puzzles[0]) {
    return [];
  }

  return parsedScramble.reduce(
    (splitScrambles, token) =>
      puzzles.includes(token)
        ? [...splitScrambles, { puzzle: token, scramble: "" }]
        : splitScrambles.map((scramble, i) =>
            i === splitScrambles.length - 1
              ? {
                  ...scramble,
                  scramble: scramble.scramble + SCRAMBLE_DELIMITER + token,
                }
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
    case "STATIC":
      return generateStaticScramble(
        scrambleOptions as ScrambleOptions<StaticDirection>
      );
    case "CUBE":
      return generateCubeScramble(
        scrambleOptions as ScrambleOptions<CubeDirection>,
        size
      );
    case "RELAY":
      return generateRelayScramble(relayPuzzles);
    case "SKEWB":
      return generateSkewbScramble(
        scrambleOptions as ScrambleOptions<CubeDirection>
      );
    case "CLOCK":
      return generateClockScamble();
    default:
      return "";
  }
}

export function splitScramble(str: string, splitOn = SCRAMBLE_DELIMITER) {
  return str
    .split(splitOn)
    .map((str) => str.trim())
    .filter(Boolean);
}

function getJsssScramble(
  jsssScrambler: JsssScramblerType,
  type: PuzzleType
): string {
  const result = (
    scramblers as unknown as Record<JsssScramblerType, JsssScrambler>
  )[jsssScrambler].getRandomScramble();

  const scrambleString = result.scramble_string;

  if (type === "CUBE") {
    return formatJsssCubeScramble(scrambleString);
  }

  if (type === "DODECAHEDRON") {
    return formatJsssDodecahedronScramble(scrambleString);
  }

  if (type === "SQUARE_ONE") {
    return formatJsssSquareOneScramble(scrambleString);
  }

  return scrambleString;
}

function formatJsssCubeScramble(scramble: string) {
  return splitScramble(scramble)
    .map((move) => {
      const firstChar = Number(move.charAt(0));

      if (isNaN(firstChar)) {
        return move;
      }

      const prefix = firstChar > 2 ? move.slice(0, 2) : move.slice(1, 2);

      return prefix + "w" + move.slice(2);
    })
    .join(SCRAMBLE_DELIMITER);
}

function formatJsssDodecahedronScramble(scramble: string) {
  return splitScramble(scramble.replace(/<br>/g, " ")).join(SCRAMBLE_DELIMITER);
}

function formatJsssSquareOneScramble(scramble: string) {
  return splitScramble(scramble, "/")
    .reduce(
      (moves, move, index) =>
        index === 0 ? [...moves, move] : [...moves, "/", move],
      []
    )
    .join(SCRAMBLE_DELIMITER);
}

function generateRelayScramble(relayPuzzles: string[]): string {
  return relayPuzzles.reduce(
    (relayScramble, puzzle) =>
      [relayScramble, puzzle, generateScramble(puzzle)].join(
        SCRAMBLE_DELIMITER
      ),
    ""
  );
}

function generateSkewbScramble(
  scrambleOptions: ScrambleOptions<CubeDirection>
) {
  const { directions, length } = scrambleOptions;

  return generateArr(length)
    .reduce((moves) => {
      const previousDirection = extractLastDirection<CubeDirection>(
        moves,
        directions
      );
      const relevantOpposites = puzzleConstants.CUBE_OPPOSITES.find((arr) =>
        arr.includes(previousDirection)
      );
      const direction = pickRandomDirection<CubeDirection>(
        directions,
        previousDirection,
        relevantOpposites
      );
      const reversed = randomBoolean();

      const move = direction + charIf(reversed, `'`);

      return [...moves, move];
    }, [])
    .join(SCRAMBLE_DELIMITER);
}

function generateCubeScramble(
  scrambleOptions: ScrambleOptions<CubeDirection>,
  size: number
) {
  const { directions, length } = scrambleOptions;
  const wideLayerAmount = Math.max(Math.floor(size / 2), 1);
  const wideLayerOptions = generateArr(wideLayerAmount).map((i) =>
    i === 0 ? "" : i + 1
  );

  return generateArr(length)
    .reduce((moves) => {
      const previousDirection = extractLastDirection(moves, directions);
      const relevantOpposites = puzzleConstants.CUBE_OPPOSITES.find((arr) =>
        arr.includes(previousDirection)
      );
      const direction = pickRandomDirection(
        directions,
        previousDirection,
        relevantOpposites
      );
      const wideLayers = pickRandom(wideLayerOptions);
      const double = pickRandom([true, false, false]);
      const reversed = randomBoolean() && !double;

      const move =
        String(wideLayers) +
        String(direction) +
        charIf(Boolean(wideLayers), "w") +
        charIf(reversed, `'`) +
        charIf(double, "2");

      return [...moves, move];
    }, [])
    .join(SCRAMBLE_DELIMITER);
}

function generateStaticScramble(
  scrambleOptions: ScrambleOptions<StaticDirection>
) {
  const { directions, length } = scrambleOptions;

  return generateArr(length)
    .reduce((moves) => {
      const previousDirection = extractLastDirection(moves, directions);
      const direction = pickRandomDirection(directions, previousDirection);
      const double = pickRandom([true, false, false]);
      const reversed = randomBoolean() && !double;

      const move = direction + charIf(reversed, `'`) + charIf(double, "2");

      return [...moves, move];
    }, [])
    .join(SCRAMBLE_DELIMITER);
}

function generateClockScamble() {
  const multiPinSettings = ["U", "R", "D", "L", "ALL"];
  const singlePinSettings = ["UR", "DR", "DL", "UL"];

  const front = [...singlePinSettings, ...multiPinSettings].map(
    generateClockTurn
  );
  const back = multiPinSettings.map(generateClockTurn);
  const finalPins = generateArr(randomNumber(0, 4))
    .reduce(
      (chosenPins) => [
        ...chosenPins,
        pickRandom(
          singlePinSettings.filter((sps) => !chosenPins.includes(sps))
        ),
      ],
      []
    )
    .sort(
      (a, b) => singlePinSettings.indexOf(a) - singlePinSettings.indexOf(b)
    );

  return [...front, "y2", ...back, ...finalPins].join(SCRAMBLE_DELIMITER);
}

function generateClockTurn(pins: string) {
  return pins + randomNumber(1, 6) + pickRandom(["+", "-"]);
}

function randomBoolean() {
  return pickRandom([false, true]);
}

function pickRandomDirection<T extends string>(
  directions: T[],
  previousDirection: T,
  opposites: T[] = []
) {
  return pickRandom(
    directions.filter(
      (direction) => ![...opposites, previousDirection].includes(direction)
    )
  );
}

function charIf(bool: boolean, a: string, b = "") {
  return bool ? a : b;
}

function getLastMove(moves: string[]) {
  return moves[moves.length - 1] || "";
}

function randomNumber(min: number, max: number) {
  return pickRandom(generateArr(max - min + 1)) + min;
}

function extractLastDirection<T extends string>(
  moves: string[],
  directions: T[]
) {
  const lastMove = getLastMove(moves);

  return directions.reduce((foundDirection, direction) => {
    const found = lastMove.indexOf(direction) > -1;

    return found ? direction : foundDirection;
  }, null);
}
