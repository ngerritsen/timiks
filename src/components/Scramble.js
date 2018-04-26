import styled from 'styled-components';
import PropTypes from 'prop-types';
import React from 'react';
import FontAwesome from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/fontawesome-pro-solid';

import IconButton from './shared/IconButton';

const Scramble = ({ scramble, small, onClick }) => (
  <div>
    <ScrambleBox small={small}>
      {
        onClick &&
        <ScrambleIconButtonContainer>
          <IconButton onClick={onClick}>
            <FontAwesome icon={faEye}/>
          </IconButton>
        </ScrambleIconButtonContainer>
      }
      {scramble.map((move, i) => <Move key={i}>{move}</Move>)}
    </ScrambleBox>
  </div>
);

Scramble.propTypes = {
  onClick: PropTypes.func,
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

const ScrambleIconButtonContainer = styled.span`
  float: right;
  display: inline-block;
  font-size: 1.8rem;
  margin: 0 ${props => props.theme.sizes.xxs} ${props => props.theme.sizes.xxs};
  color: ${props => props.theme.colors.blue};
`;

export default Scramble;
