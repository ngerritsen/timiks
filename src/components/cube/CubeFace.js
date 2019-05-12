import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { darken, lighten } from 'polished';

const CubeFace = ({ face = [], cubeSize }) => (
  <Face>
    {face.map((row, y) => (
      <Row key={y}>
        {row.map((color, x) => (
          <Tile key={x} color={color} cubeSize={cubeSize} />
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
  min-width: 9rem;
  width: 9rem;
  height: 9rem;
  margin-right: ${props => props.theme.sizes.xs};
`;

const Row = styled.div`
  display: flex;
  flex-grow: 1;
`;

const Tile = styled.span`
  border-radius: ${props => scale(props.cubeSize, 0.2, 0.4)}rem;
  display: inline-block;
  flex-grow: 1;
  background-color: ${props => props.theme.puzzleColors[props.color]};
  border-width: 1px;
  border-style: solid;
  border-color: ${props =>
    props.theme.dark
      ? lighten(0.15, props.theme.puzzleColors[props.color])
      : darken(0.25, props.theme.puzzleColors[props.color])};
  width: 100%;
  margin: ${props => scale(props.cubeSize, 0.1, 0.3)}rem;
`;

function scale(cubeSize, min, max) {
  return min + (max - min) * ((7 - cubeSize) / 5);
}

export default CubeFace;
