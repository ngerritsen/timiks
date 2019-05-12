import { generateScramble } from './helpers/scramble';

self.addEventListener(
  'message',
  event => {
    self.postMessage({ scramble: generateScramble(event.data.puzzle) });
  },
  false
);
