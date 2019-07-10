import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import { puzzleColors } from '../../constants/puzzles';
import { getColor } from '../../helpers/theme';

const LastLayerPreview = ({ previewString, theme }) => {
  const cubeSize = 3;
  const tileSize = 100 / cubeSize;
  const gap = 12 / cubeSize;
  const stroke = 3 / cubeSize;
  const radius = 9 / cubeSize;

  const [top, right, bottom, left, firstRow, secondRow, lastRow] = previewString
    .split(' ')
    .map(str => str.split(''));

  const tiles = [
    ...top.map((color, i) => ({ color, y: 0, x: i + 1 })),
    ...right.map((color, i) => ({ color, y: i + 1, x: 4 })),
    ...bottom.map((color, i) => ({ color, y: 4, x: 3 - i })),
    ...left.map((color, i) => ({ color, y: 3 - i, x: 0 })),
    ...firstRow.map((color, i) => ({ color, y: 1, x: i + 1 })),
    ...secondRow.map((color, i) => ({ color, y: 2, x: i + 1 })),
    ...lastRow.map((color, i) => ({ color, y: 3, x: i + 1 }))
  ];

  return (
    <svg viewBox="0 0 133 133">
      {tiles.map(({ x, y, color }) => (
        <rect
          stroke={getColor('dark')({ theme })}
          strokeWidth={stroke}
          fill={getColor([puzzleColors[color]])({ theme })}
          rx={radius}
          key={x + '.' + y}
          width={(x === 0 || x === 4 ? tileSize / 2 : tileSize) - gap}
          height={(y === 0 || y === 4 ? tileSize / 2 : tileSize) - gap}
          x={getCoordinate(x)}
          y={getCoordinate(y)}
        />
      ))}
    </svg>
  );

  function getCoordinate(position) {
    if (position === 0) return -1 + gap / 2;
    return tileSize * position - 1 + gap / 2 - tileSize / 2;
  }
};

LastLayerPreview.propTypes = {
  previewString: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired
};

export default withTheme(LastLayerPreview);
