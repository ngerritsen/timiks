import { lighten, darken } from 'polished';

const PRIMARY_COLOR = '#6f42c1';
const WHITE = '#fff';
const BLACK = '#000';
const BASE_SIZE = 0.8;

const getSize = n => (BASE_SIZE * n).toFixed(1) + 'rem';

export default {
  font: 'Barlow, Arial, sans-serif',
  monoFont: '"Roboto Mono", monospace',
  colors: {
    bg: WHITE,
    subtleBg: darken(0.1, WHITE),
    fg: BLACK,
    subtleFg: lighten(0.3, BLACK),
    grey: darken(0.25, WHITE),
    green: '#28a745',
    primary: PRIMARY_COLOR,
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
