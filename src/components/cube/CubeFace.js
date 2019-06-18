import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { shade, tint } from 'polished';
import { puzzleColors } from '../../constants/puzzles';
import { getSize, getColor, isDark } from '../../helpers/theme';

const CubeFace = ({ face = [], cubeSize }) => (
  <Face>
    {face.map((row, y) => (
      <Row key={y}>
        {row.map((color, x) => (
          <Tile
            key={x}
            isLastColumn={x + 1 === cubeSize}
            isLastRow={y + 1 === cubeSize}
            color={color}
            cubeSize={cubeSize}
          />
        ))}
      </Row>
    ))}
  </Face>
);

CubeFace.propTypes = {
  cubeSize: PropTypes.number.isRequired,
  face: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};

const Face = styled.div`
  display: inline-flex;
  flex-direction: column;
  min-width: 8.6rem;
  width: 8.6rem;
  height: 8.6rem;
  margin-right: ${getSize('xs')};
`;

const Row = styled.div`
  display: flex;
  flex-grow: 1;
`;

const Tile = styled.span`
  border-radius: ${props => scale(props.cubeSize, 0.2, 0.4)}rem;
  display: inline-block;
  flex-grow: 1;
  background-color: ${props => getColor([puzzleColors[props.color]])(props)};
  border-width: 1px;
  border-style: solid;
  border-color: ${props =>
    isDark(props)
      ? tint(0.6, getColor([puzzleColors[props.color]])(props))
      : shade(0.6, getColor([puzzleColors[props.color]])(props))};
  width: 100%;
  margin-right: ${props => (props.isLastColumn ? '0' : scale(props.cubeSize, 0.2, 0.4))}rem;
  margin-bottom: ${props => (props.isLastRow ? '0' : scale(props.cubeSize, 0.2, 0.4))}rem;
`;

function scale(cubeSize, min, max) {
  return min + (max - min) * ((7 - cubeSize) / 5);
}

export default CubeFace;
