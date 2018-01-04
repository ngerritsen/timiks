import { lighten, darken } from 'polished';

const WHITE = '#fff';
const BLACK = '#000';
const BASE_SIZE = 0.8;

const getSize = n => (BASE_SIZE * n).toFixed(1) + 'rem';

export const light = {
  font: 'Barlow, Arial, sans-serif',
  monoFont: '"Roboto Mono", monospace',
  colors: {
    bg: '#fff',
    subtleBg: darken(0.1, WHITE),
    fg: '#000',
    subtleFg: lighten(0.3, BLACK),
    grey: darken(0.25, WHITE),
    primary: '#6f42c1',
    green: '#28a745',
    blue: '#0366d6',
    red: '#d73a49'
  },
  sizes: {
    xxs: getSize(0.5),
    xs: getSize(1),
    sm: getSize(2),
    md: getSize(3),
    lg: getSize(4),
    xl: getSize(5)
  }
}

export const dark = {
  ...light,
  colors: {
    ...light.colors,
    bg: lighten(0.02, BLACK),
    fg: darken(0.02, WHITE),
    subtleBg: lighten(0.2, BLACK),
    subtleFg: darken(0.4, WHITE),
    grey: lighten(0.3, BLACK),
    primary: '#fc7f0a'
  }
}
