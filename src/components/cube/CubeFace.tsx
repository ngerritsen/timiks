import React from "react";
import { withTheme } from "styled-components";
import { getColor } from "../../helpers/theme";
import { CubeTile } from "../../types";
import { Theme } from "../../theme";
import { puzzleColors } from "../../constants/puzzles";

type CubeFaceProps = {
  cubeSize: number;
  tiles: CubeTile[];
  theme: Theme;
};

const CubeFace = ({ tiles, cubeSize, theme }: CubeFaceProps) => {
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
          fill={getColor(puzzleColors[color])({ theme })}
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

export default withTheme(CubeFace);
