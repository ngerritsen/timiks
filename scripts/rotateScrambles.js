'use strict';

const fs = require('fs');
const pll = require('../src/scrambles/pll');
const oll = require('../src/scrambles/oll');

rotate(pll, 'pll');
rotate(oll, 'oll');

function rotate(scrambles, name) {
  const rotatedScrambles = Object.keys(scrambles).reduce(
    (rotated, id) => ({
      ...rotated,
      [id]: rotateScrambles(scrambles[id])
    }),
    {}
  );

  fs.writeFileSync(`./${name}.json`, JSON.stringify(rotatedScrambles, null, 2));
}

function rotateScrambles(scrambles) {
  let newScrambles = [...scrambles];

  for (let i = 0; i < 3; i++) {
    const rotatedScrambles = newScrambles.slice(-1 * scrambles.length).map(rotateScramble);
    newScrambles = [...newScrambles, ...rotatedScrambles];
  }

  return newScrambles
    .filter((val, i, arr) => arr.indexOf(val) === i)
    .sort((a, b) => Math.sign(a.length - b.length))
    .slice(0, 500);
}

function rotateScramble(scramble) {
  return scramble
    .split(' ')
    .map(move => {
      const isReversed = Boolean(move.match(/'$/));
      const isDouble = Boolean(move.match(/2/));
      const [face] = move.match(/[A-Z]/);

      return getRotatedFace(face) + (isDouble ? '2' : '') + (isReversed ? "'" : '');
    })
    .join(' ');
}

function getRotatedFace(face) {
  switch (face) {
    case 'F':
      return 'R';
    case 'R':
      return 'B';
    case 'B':
      return 'L';
    case 'L':
      return 'F';
    default:
      return face;
  }
}
