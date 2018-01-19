import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { layoutScramble } from '../helpers/cube';
import CubeFace from './CubeFace';

const CubeLayout = ({ scramble }) => {
  const cube = layoutScramble(scramble);
  return (
    <CubeLayoutContainer>
      <Row>
        <CubeFace/>
        <CubeFace face={cube.U}/>
        <CubeFace/>
        <CubeFace/>
      </Row>
      <Row>
        <CubeFace face={cube.L}/>
        <CubeFace face={cube.F}/>
        <CubeFace face={cube.R}/>
        <CubeFace face={cube.B}/>
      </Row>
      <Row>
        <CubeFace/>
        <CubeFace face={cube.D}/>
        <CubeFace/>
        <CubeFace/>
      </Row>
    </CubeLayoutContainer>
  );
}

CubeLayout.propTypes = {
  scramble: PropTypes.arrayOf(PropTypes.string)
};

const CubeLayoutContainer = styled.div`
  padding: ${props => props.theme.sizes.xs};
  overflow-x: auto;
`;

const Row = styled.div`
  display: flex;
  margin-bottom: ${props => props.theme.sizes.xs};
`;

export default CubeLayout;
