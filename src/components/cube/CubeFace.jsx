import React from "react";
import PropTypes from "prop-types";
import { withTheme } from "styled-components";
import { puzzleColors } from "../../constants/puzzles";
import { getColor } from "../../helpers/theme";

const CubeFace = ({ tiles, cubeSize, theme }) => {
  const tileSize = 100 / cubeSize;
  const gap = 12 / cubeSize;
  const stroke = 3 / cubeSize;
  const radius = 9 / cubeSize;

  return (
    <svg viewBox="0 0 100 100">
      {tiles.map(({ x, y, color }) => (
        <rect
          stroke={getColor("dark")({ theme })}
          strokeWidth={stroke}
          fill={getColor([puzzleColors[color]])({ theme })}
          rx={radius}
          key={x + "." + y}
          width={tileSize - gap}
          height={tileSize - gap}
          x={tileSize * x + gap / 2}
          y={tileSize * y + gap / 2}
        />
      ))}
    </svg>
  );
};

CubeFace.propTypes = {
  cubeSize: PropTypes.number.isRequired,
  tiles: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
      color: PropTypes.string,
    })
  ),
  theme: PropTypes.object.isRequired,
};

export default withTheme(CubeFace);
