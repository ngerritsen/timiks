import { lighten, darken } from 'polished';
import * as puzzleColors from './constants/puzzle';

const WHITE = '#fff';
const BLACK = '#000';
const BASE_SIZE = 0.8;
const ORANGE = '#fc7f0a';
const PURPLE = '#6f42c1';
const YELLOW = '#fed330';

const getSize = n => (BASE_SIZE * n).toFixed(1) + 'rem';

export const light = {
  font: 'Barlow, Arial, sans-serif',
  monoFont: '"Roboto Mono", monospace',
  colors: {
    bg: '#fff',
    subtleBg: darken(0.1, WHITE),
    fg: '#000',
    subtleFg: lighten(0.3, BLACK),
    darkGrey: darken(0.4, WHITE),
    grey: darken(0.25, WHITE),
    orange: ORANGE,
    purple: PURPLE,
    primary: PURPLE,
    yellow: YELLOW,
    green: '#28a745',
    blue: '#0366d6',
    red: '#d73a49'
  },
  puzzleColors: {
    [puzzleColors.WHITE]: '#fff',
    [puzzleColors.YELLOW]: '#fff244',
    [puzzleColors.GREEN]: '#3fff78',
    [puzzleColors.BLUE]: '#3fb8ff',
    [puzzleColors.RED]: '#fc355c',
    [puzzleColors.ORANGE]: '#ff943d'
  },
  sizes: {
    xxs: getSize(0.5),
    xs: getSize(1),
    sm: getSize(2),
    md: getSize(3),
    lg: getSize(4),
    xl: getSize(5)
  },
  zIndices: {
    fullScreenMask: 1,
    onFullScreenMask: 2,
    modal: 3
  }
}

export const dark = {
  ...light,
  dark: true,
  colors: {
    ...light.colors,
    bg: lighten(0.02, BLACK),
    fg: darken(0.02, WHITE),
    subtleBg: lighten(0.2, BLACK),
    subtleFg: darken(0.4, WHITE),
    darkGrey: darken(0.5, WHITE),
    grey: lighten(0.3, BLACK),
    primary: '#fc7f0a',
    blue: lighten(0.1, '#0366d6'),
  }
}
