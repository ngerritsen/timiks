import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';

import { puzzleColors } from '../../constants/puzzles';
import { getColor } from '../../helpers/theme';
import * as CustomPropTypes from '../../propTypes';

const LastLayerPreview = ({ previewString, previewArrows, theme }) => {
  const cubeSize = 3;
  const tileSize = 100 / cubeSize;
  const gap = 12 / cubeSize;
  const stroke = 3 / cubeSize;
  const radius = 9 / cubeSize;
  const arrowColor = getColor('dark')({ theme });

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
      <defs>
        <marker
          id="arrow-start"
          markerWidth="10"
          markerHeight="10"
          refX="1.5"
          refY="1.5"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <polygon points="3 0, 3 3, 0 1.5" fill={arrowColor} />
        </marker>
        <marker
          id="arrow-end"
          markerWidth="10"
          markerHeight="10"
          refX="1.5"
          refY="1.5"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <polygon points="0 0, 3 1.5, 0 3" fill={arrowColor} />
        </marker>
      </defs>
      {tiles.map(({ x, y, color }, i) => (
        <rect
          key={i}
          stroke={getColor('dark')({ theme })}
          strokeWidth={stroke}
          fill={getColor([puzzleColors[color]])({ theme })}
          rx={radius}
          width={getTileSize(x)}
          height={getTileSize(y)}
          x={getCoordinate(x)}
          y={getCoordinate(y)}
        />
      ))}
      {previewArrows.map(([start, end, swap], i) => (
        <line
          key={i}
          x1={getLinePointCoordinate(start[0], end[0])}
          y1={getLinePointCoordinate(start[1], end[1])}
          x2={getLinePointCoordinate(end[0], start[0])}
          y2={getLinePointCoordinate(end[1], start[1])}
          markerEnd="url(#arrow-end)"
          markerStart={swap ? 'url(#arrow-start)' : ''}
          stroke={arrowColor}
          strokeWidth={4}
        />
      ))}
    </svg>
  );

  function getLinePointCoordinate(position, oppositePosition) {
    return (
      position * tileSize +
      tileSize +
      (oppositePosition > position ? 4 : oppositePosition === position ? 0 : -4) -
      gap / 3
    );
  }

  function getCoordinate(position) {
    if (position === 0) return -1 + gap / 2;
    return tileSize * position - 1 + gap / 2 - tileSize / 2;
  }

  function getTileSize(position) {
    return (position === 0 || position === 4 ? tileSize / 2 : tileSize) - gap;
  }
};

LastLayerPreview.defaultProps = {
  previewArrows: []
};

LastLayerPreview.propTypes = {
  previewString: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
  previewArrows: CustomPropTypes.PreviewArrows
};

export default withTheme(LastLayerPreview);
