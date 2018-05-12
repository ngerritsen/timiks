import styled from 'styled-components';
import PropTypes from 'prop-types';
import React from 'react';
import FontAwesome from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/fontawesome-pro-solid';

import IconButton from '../shared/IconButton';
import ScrambleDetails from './ScrambleDetails';
import { isCube } from '../../helpers/puzzle';
import Section from '../shared/Section';
import ModalContainer from '../../containers/shared/ModalContainer';

const Scramble = ({ scramble, small, withDetails, puzzle }) => (
  <div>
    <ScrambleBox small={small}>
      {
        (withDetails && isCube(puzzle)) &&
        <ScrambleIconButtonContainer>
          <ModalContainer
            id="scrambleDetails"
            title="Scramble details"
            toggle={openModal => (
              <IconButton onClick={openModal}>
                <FontAwesome icon={faEye}/>
              </IconButton>
            )}
            content={() => (
              <Section margin="sm">
                <ScrambleDetails scramble={scramble} puzzle={puzzle} />
              </Section>
            )}
          />
        </ScrambleIconButtonContainer>
      }
      {scramble.map((move, i) => <Move key={i}>{move}</Move>)}
    </ScrambleBox>
  </div>
);

Scramble.propTypes = {
  withDetails: PropTypes.bool,
  scramble: PropTypes.arrayOf(PropTypes.string),
  small: PropTypes.bool,
  puzzle: PropTypes.string
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
