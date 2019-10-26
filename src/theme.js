import { lighten, darken } from 'polished';

const BLACK = '#000';
const BLUE = '#3491e5';
const CLOUD_BLUE = '#8ccbf7';
const DEEP_BLUE = '#3d35d6';
const GOOGLE_RED = '#f95555';
const GREEN = '#2acc5b';
const LIME = '#d5f243';
const ORANGE = '#f49929';
const PINK = '#f469c1';
const PURPLE = '#7642d6';
const RED = '#e83d3a';
const TURQUOISE = '#3be5e5';
const BROWN = '#783c11';
const WHITE = '#fff';
const YELLOW = '#f9e636';

const BASE_SIZE = 0.8;

const getSize = n => (BASE_SIZE * n).toFixed(1) + 'rem';

export const light = {
  fonts: {
    default: 'Barlow, Arial, sans-serif',
    mono: '"Roboto Mono", monospace'
  },
  colors: {
    bg: WHITE,
    black: BLACK,
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
    subtleFg: lighten(0.4, BLACK),
    brown: BROWN,
    turquoise: TURQUOISE,
    white: WHITE,
    yellow: YELLOW
  },
  breakpoints: {
    sm: '520px',
    md: '620px',
    lg: '720px'
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
