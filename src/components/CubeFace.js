import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { WHITE, YELLOW, GREEN, BLUE, RED, ORANGE } from '../helpers/cube';

const TILE_COLOR_MAP = {
  [WHITE]: '#fff',
  [YELLOW]: '#fff544',
  [GREEN]: '#3fff52',
  [BLUE]: '#3fafff',
  [RED]: '#f22951',
  [ORANGE]: '#ff9c3f'
}

const CubeFace = ({ face = [] }) => (
  <Face>
    {face.map((row, y) =>
      <Row key={y}>
        {row.map((color, x) => <Tile key={x} color={color}/>)}
      </Row>
    )}
  </Face>
);

CubeFace.propTypes = {
  face: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
}

const Face = styled.div`
  display: inline-flex;
  flex-direction: column;
  min-width: 9rem;
  width: 9rem;
  height: 9rem;
  margin-right: ${props => props.theme.sizes.xs};
`

const Row = styled.div`
  display: flex;
  flex-grow: 1;
`;

const Tile = styled.span`
  border-radius: 0.4rem;
  display: inline-block;
  flex-grow: 1;
  background-color: ${props => TILE_COLOR_MAP[props.color]};
  width: 100%;
  border: 2px solid ${props => props.theme.colors.subtleFg};
  margin: 0.15rem;
`;

export default CubeFace;
