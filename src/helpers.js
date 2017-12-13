import { SCRAMBLE_DIRECTIONS, SCRAMBLE_LENGTH } from './constants';

export function formatTime(ms) {
  return (ms / 1000).toFixed(2)
}

export function generateScramble() {
  let moves = [];

  for (let i = 0; i < SCRAMBLE_LENGTH; i++) {
    const previousDirection = (moves[moves.length - 1] || '').slice(0, 1);
    const direction = pickRandom(SCRAMBLE_DIRECTIONS.filter(d => d !== previousDirection));
    const twice = randomBoolean();
    const reversed = randomBoolean();
    const move = direction + (twice ? '2' : '') + (reversed ? '\'' : '');

    moves = [...moves, move];
  }

  return moves;
}

function pickRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function randomBoolean() {
  return Boolean(Math.round(Math.random()));
}
