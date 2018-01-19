import styled from 'styled-components';
import PropTypes from 'prop-types';
import React from 'react';

import CubeLayout from './CubeLayout';

const Scramble = ({ scramble, cubeSize, small = false }) => (
  <div>
    <ScrambleBox small={small}>
      {scramble.map((move, i) => <Move key={i}>{move}</Move>)}
    </ScrambleBox>
    {
      false &&
      <CubeLayout scramble={scramble} cubeSize={cubeSize}/>
    }
  </div>
);

Scramble.propTypes = {
  cubeSize: PropTypes.number,
  scramble: PropTypes.arrayOf(PropTypes.string),
  small: PropTypes.bool
};

const ScrambleBox = styled.p`
  font-size: ${props => props.small ? '1.4rem' : '1.6rem'};
  text-align: center;
  font-family: ${props => props.theme.monoFont};
  background-color: ${props => props.theme.colors.subtleBg};
  padding: ${props => props.theme.sizes.xs};
  margin: 0;
  font-weight: bold;
  border-radius: 3px;
`;

const Move = styled.span`
  display: inline-block;
  whitespace: nowrap;
  margin-right: 0.5em;

  &:last-child {
    margin-right: 0;
  }
`;

export default Scramble;
