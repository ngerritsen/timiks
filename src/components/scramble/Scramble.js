import styled from 'styled-components';
import PropTypes from 'prop-types';
import React from 'react';
import FontAwesome from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/fontawesome-pro-solid';

import * as CustomPropTypes from '../../propTypes';
import IconButton from '../shared/IconButton';
import ScrambleDetails from './ScrambleDetails';
import Section from '../shared/Section';
import Shortcut from '../shared/Shortcut';
import Modal from '../shared/Modal';
import ToggleContent from '../ToggleContent';
import { CUBE } from '../../constants/puzzle';
import { getPuzzle } from '../../helpers/puzzle';

const Scramble = ({ scramble, withDetails, puzzle, expand }) => (
  <div>
    <ScrambleBox expand={expand}>
      {withDetails && getPuzzle(puzzle).type === CUBE && (
        <ScrambleIconButtonContainer>
          <ToggleContent
            toggle={({ show }) => (
              <IconButton onClick={show}>
                <Shortcut command="showScramble" action={show} />
                <FontAwesome icon={faEye} />
              </IconButton>
            )}
            content={({ hide }) => (
              <Modal title="Scramble details" onClose={hide}>
                <Section margin="sm">
                  <ScrambleDetails scramble={scramble} puzzle={puzzle} />
                </Section>
              </Modal>
            )}
          />
        </ScrambleIconButtonContainer>
      )}
      {scramble.map((move, i) =>
        getPuzzle(move) ? (
          <span key={i}>
            {i > 0 && <Separator />}
            <Title>{getPuzzle(move).title}:</Title>
          </span>
        ) : (
          <Move key={i}>{move}</Move>
        )
      )}
    </ScrambleBox>
  </div>
);

Scramble.propTypes = {
  withDetails: PropTypes.bool,
  scramble: CustomPropTypes.Scramble,
  small: PropTypes.bool,
  puzzle: PropTypes.string,
  expand: PropTypes.bool
};

const ScrambleBox = styled.div`
  font-size: 1.65rem;
  text-align: center;
  font-family: ${props => props.theme.monoFont};
  line-height: 1.3;
  background-color: ${props => props.theme.colors.subtleBg};
  padding: ${props => props.theme.sizes.xs};
  margin: 0;
  font-weight: bold;
  border-radius: 3px;
  max-height: ${props => (props.expand ? '' : '14.5rem')};
  overflow-y: auto;
`;

const Separator = styled.div`
  margin-top: ${props => props.theme.sizes.xs};
`;

const Move = styled.span`
  display: inline-block;
  whitespace: nowrap;
  margin-right: 0.5em;

  &:last-child {
    margin-right: 0;
  }
`;

const Title = styled.span`
  display: inline-block;
  color: ${props => props.theme.colors.subtleFg};
  margin-right: ${props => props.theme.sizes.xs};
`;

const ScrambleIconButtonContainer = styled.span`
  float: right;
  display: inline-block;
  font-size: 1.8rem;
  margin: 0 ${props => props.theme.sizes.xxs};
  color: ${props => props.theme.colors.blue};
`;

export default React.memo(Scramble);
