import { lighten, darken } from 'polished';

const WHITE = '#fff';
const BLACK = '#000';
const BASE_SIZE = 0.8;
const ORANGE = '#fc7f0a';
const PURPLE = '#6f42c1';
const YELLOW = '#fff244';
const RED = '#f83f3f';
const BLUE = '#208dd6';
const CLOUD_BLUE = '#7dc9ff';
const GREEN = '#34db52';
const GOOGLE_RED = '#f95555';
const PINK = '#fc417f';

const getSize = n => (BASE_SIZE * n).toFixed(1) + 'rem';

export const light = {
  font: 'Barlow, Arial, sans-serif',
  monoFont: '"Roboto Mono", monospace',
  colors: {
    bg: WHITE,
    blue: BLUE,
    cloudBlue: CLOUD_BLUE,
    dark: lighten(0.2, BLACK),
    fg: BLACK,
    googleRed: GOOGLE_RED,
    green: GREEN,
    grey: darken(0.25, WHITE),
    orange: ORANGE,
    pink: PINK,
    primary: PURPLE,
    purple: PURPLE,
    red: RED,
    subtleBg: darken(0.1, WHITE),
    subtleFg: lighten(0.3, BLACK),
    white: WHITE,
    yellow: YELLOW
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
    darkGrey: darken(0.5, WHITE),
    fg: darken(0.1, WHITE),
    grey: lighten(0.3, BLACK),
    primary: ORANGE,
    subtleBg: lighten(0.2, BLACK),
    subtleFg: darken(0.4, WHITE)
  }
};
