import React from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components'

import Time from './Time';
import Section from './Section';
import Scramble from './Scramble';
import ActivationContainer from '../containers/ActivationContainer';
import ScrambleDetails from './ScrambleDetails';
import Modal from './Modal';
import Button from './Button';
import { isCube } from '../helpers/puzzle';

const Timer = ({
  scramble,
  time,
  puzzle,
  dnf,
  inspectionMode,
  showScrambleDetails,
  preparingForInspection,
  scrambleDetailsOpen,
  hideScrambleDetails
}) => (
  <div>
    <Section margin="sm">
      <TimerTime>
        <Time ms={time} secondsOnly={inspectionMode || preparingForInspection} dnf={dnf}/>
      </TimerTime>
    </Section>
    <Section margin="sm">
      <Scramble scramble={scramble} onClick={isCube(puzzle) ? showScrambleDetails : undefined} />
      <Modal isOpen={scrambleDetailsOpen} title="Scramble details">
        <Section margin="sm">
          <ScrambleDetails scramble={scramble} puzzle={puzzle} />
        </Section>
        <Button onClick={hideScrambleDetails}>Close</Button>
      </Modal>
    </Section>
    <Section margin="sm">
      <ActivationContainer/>
    </Section>
  </div>
);

Timer.propTypes = {
  puzzle: PropTypes.string.isRequired,
  scramble: PropTypes.arrayOf(PropTypes.string).isRequired,
  time: PropTypes.number.isRequired,
  dnf: PropTypes.bool.isRequired,
  inspectionMode: PropTypes.bool.isRequired,
  showScrambleDetails: PropTypes.func.isRequired,
  preparingForInspection: PropTypes.bool.isRequired,
  scrambleDetailsOpen: PropTypes.bool.isRequired,
  hideScrambleDetails: PropTypes.func.isRequired
};

const TimerTime = styled.div`
  text-align: center;
  padding: ${props => props.theme.sizes.lg} 0;
  font-size: 5rem;
  z-index: ${props => props.theme.zIndices.onFullScreenMask};
  position: relative;

  @media screen and (min-width: 420px) {
    font-size: 6rem;
  }
`;

export default Timer
