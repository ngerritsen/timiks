import * as constants from '../constants';

export function generateScramble() {
  let moves = [];

  for (let i = 0; i < constants.SCRAMBLE_LENGTH; i++) {
    const previousDirection = (moves[moves.length - 1] || '').slice(0, 1);
    const direction = pickRandom(constants.SCRAMBLE_DIRECTIONS.filter(d => d !== previousDirection));
    const twice = pickRandom([false, false, true]);
    const reversed = twice ? false : randomBoolean();
    const move = direction + (twice ? '2' : '') + (reversed ? '\'' : '');

    moves = [...moves, move];
  }

  return moves;
}

export function obfuscateScramble(scramble) {
  return scramble.map(move => generateString(move.length, constants.SCRAMBLE_OBFUSCATION_CHAR));
}

function generateString(amount, char) {
  let string = '';

  for (let i = 0; i < amount; i++) {
    string += char;
  }

  return string;
}

function randomBoolean() {
  return pickRandom([false, true]);
}

function pickRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}
