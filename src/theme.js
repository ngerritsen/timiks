import { lighten, darken } from 'polished';
import * as puzzleColors from './constants/puzzle';

const WHITE = '#fff';
const BLACK = '#000';
const BASE_SIZE = 0.8;
const ORANGE = '#fc7f0a';
const FLUO_ORANGE = '#fca344';
const PURPLE = '#6f42c1';
const FLUO_YELLOW = '#fff244';
const FLUO_RED = '#fc355c';
const RED = '#f83f3f';
const LIGHT_BLUE = '#3fb8ff';
const BLUE = '#1f93e0';
const CLOUD_BLUE = '#7dc9ff';
const GREEN = '#34db52';
const FLUO_GREEN = '#3fff78';
const GOOGLE_RED = '#f95555';

const getSize = n => (BASE_SIZE * n).toFixed(1) + 'rem';

export const light = {
  font: 'Barlow, Arial, sans-serif',
  monoFont: '"Roboto Mono", monospace',
  colors: {
    bg: WHITE,
    white: WHITE,
    subtleBg: darken(0.1, WHITE),
    fg: BLACK,
    subtleFg: lighten(0.3, BLACK),
    darkGrey: darken(0.4, WHITE),
    grey: darken(0.25, WHITE),
    orange: FLUO_ORANGE,
    purple: PURPLE,
    primary: PURPLE,
    yellow: FLUO_YELLOW,
    green: GREEN,
    blue: BLUE,
    red: RED,
    cloudBlue: CLOUD_BLUE,
    fluoRed: FLUO_RED,
    fluoGreen: FLUO_GREEN,
    lightBlue: LIGHT_BLUE,
    googleRed: GOOGLE_RED
  },
  puzzleColors: {
    [puzzleColors.WHITE]: WHITE,
    [puzzleColors.YELLOW]: FLUO_YELLOW,
    [puzzleColors.GREEN]: FLUO_GREEN,
    [puzzleColors.BLUE]: LIGHT_BLUE,
    [puzzleColors.RED]: FLUO_RED,
    [puzzleColors.ORANGE]: FLUO_ORANGE
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
};

export const dark = {
  ...light,
  dark: true,
  colors: {
    ...light.colors,
    bg: BLACK,
    fg: darken(0.02, WHITE),
    subtleBg: lighten(0.2, BLACK),
    subtleFg: darken(0.4, WHITE),
    darkGrey: darken(0.5, WHITE),
    grey: lighten(0.3, BLACK),
    primary: ORANGE,
    blue: BLUE
  }
};
