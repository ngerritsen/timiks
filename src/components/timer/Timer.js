import React from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components'

import Time from '../shared/Time';
import Section from '../shared/Section';
import Scramble from '../Scramble';
import ActivationContainer from '../../containers/ActivationContainer';
import ScrambleDetails from '../ScrambleDetails';
import Modal from '../shared/Modal';
import Button from '../shared/Button';
import { isCube } from '../../helpers/puzzle';

const Timer = ({
  scramble,
  time,
  puzzle,
  dnf,
  inspectionMode,
  showScrambleDetails,
  preparingForInspection,
  preparing,
  ready,
  scrambleDetailsOpen,
  hideScrambleDetails
}) => (
  <div>
    <Section margin="sm">
      <TimerTime disabled={preparing && !ready}>
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
  preparing: PropTypes.bool.isRequired,
  ready: PropTypes.bool.isRequired,
  scrambleDetailsOpen: PropTypes.bool.isRequired,
  hideScrambleDetails: PropTypes.func.isRequired
};

const TimerTime = styled.div`
  text-align: center;
  padding: ${props => props.theme.sizes.lg} 0;
  font-size: 5rem;
  z-index: ${props => props.theme.zIndices.onFullScreenMask};
  position: relative;
  opacity: ${props => props.disabled ? 0.5 : 1};

  @media screen and (min-width: 420px) {
    font-size: 6rem;
  }
`;

export default Timer
