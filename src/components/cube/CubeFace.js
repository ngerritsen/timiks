import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import { puzzleColors } from '../../constants/puzzles';
import { getColor } from '../../helpers/theme';

const CubeFace = ({ face = [], cubeSize, theme }) => {
  const tileSize = 100 / cubeSize;
  const gap = 12 / cubeSize;
  const stroke = 3 / cubeSize;
  const radius = 9 / cubeSize;

  return (
    <Face viewBox="0 0 100 100">
      {face.map((row, y) =>
        row.map((color, x) => (
          <rect
            stroke={getColor('dark')({ theme })}
            strokeWidth={stroke}
            fill={getColor([puzzleColors[color]])({ theme })}
            rx={radius}
            key={x + '.' + y}
            width={tileSize - gap}
            height={tileSize - gap}
            x={tileSize * x + gap / 2}
            y={tileSize * y + gap / 2}
            color={color}
          />
        ))
      )}
    </Face>
  );
};

CubeFace.propTypes = {
  cubeSize: PropTypes.number.isRequired,
  face: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  theme: PropTypes.object.isRequired
};

const Face = styled.svg`
  width: 100%;
  height: 100%;
`;

export default withTheme(CubeFace);
