import { generateScramble } from './helpers/scramble';

self.addEventListener(
  'message',
  ({ data: { puzzle } }) => {
    self.postMessage({ scramble: generateScramble(puzzle), puzzle });
  },
  false
);
