import { lighten, darken } from 'polished';

const BLACK = '#000';
const BLUE = '#2889e0';
const CLOUD_BLUE = '#7dc9ff';
const DEEP_BLUE = '#382cd6';
const GOOGLE_RED = '#f95555';
const GREEN = '#1ccc51';
const LIME = '#cbf71b';
const ORANGE = '#f48813';
const PINK = '#ef47b2';
const PURPLE = '#6f42c1';
const RED = '#e83733';
const TURQUOISE = '#22e8e8';
const WHITE = '#fff';
const YELLOW = '#f9e636';

const BASE_SIZE = 0.8;

const getSize = n => (BASE_SIZE * n).toFixed(1) + 'rem';

export const light = {
  font: 'Barlow, Arial, sans-serif',
  monoFont: '"Roboto Mono", monospace',
  colors: {
    bg: WHITE,
    blue: BLUE,
    cloudBlue: CLOUD_BLUE,
    deepBlue: DEEP_BLUE,
    dark: lighten(0.2, BLACK),
    fg: lighten(0.04, BLACK),
    googleRed: GOOGLE_RED,
    green: GREEN,
    grey: darken(0.25, WHITE),
    lime: LIME,
    orange: ORANGE,
    pink: PINK,
    primary: PURPLE,
    purple: PURPLE,
    red: RED,
    subtleBg: darken(0.1, WHITE),
    subtleFg: lighten(0.3, BLACK),
    turquoise: TURQUOISE,
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
    fg: darken(0.04, WHITE),
    grey: lighten(0.3, BLACK),
    primary: ORANGE,
    subtleBg: lighten(0.2, BLACK),
    subtleFg: darken(0.4, WHITE)
  }
};
