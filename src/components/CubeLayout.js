import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { layoutScramble, U, L, F, R, B, D } from '../helpers/cube';
import CubeFace from './CubeFace';

const CUBE_LAYOUT = [
  [0, U, 0, 0],
  [L, F, R, B],
  [0, D, 0, 0]
]

const CubeLayout = ({ scramble, cubeSize }) => {
  let cube = null;

  try {
    cube = layoutScramble(scramble, cubeSize);
  } catch (e) {
    console.error(e); // eslint-disable-line no-console
  }

  return (
    <CubePreviewContainer>
      {!cube && <Message>Cube preview not available.</Message>}
      {
        cube &&
        <div>
        {CUBE_LAYOUT.map((row, y) => (
          <Row key={y}>
            {row.map((face, x) => (
              <CubeFace
              key={x}
              cubeSize={cubeSize}
              face={face !== 0 ? cube[face] : undefined}
            />
            ))}
          </Row>
        ))}
        </div>
      }
    </CubePreviewContainer>
  );
}

CubeLayout.propTypes = {
  cubeSize: PropTypes.number,
  scramble: PropTypes.arrayOf(PropTypes.string)
};

const CubePreviewContainer = styled.div`
  padding: ${props => props.theme.sizes.xs};
  overflow-x: auto;
  border-radius: 3px;
`;

const Row = styled.div`
  display: flex;
  margin-bottom: ${props => props.theme.sizes.xs};
`;

const Message = styled.p`
margin-bottom: 0;
  text-align: center;
  color: ${props => props.theme.colors.subtleFg};
`;

export default CubeLayout;
