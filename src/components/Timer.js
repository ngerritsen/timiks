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
  stopped,
  time,
  puzzle,
  showScrambleDetails,
  scrambleDetailsOpen,
  hideScrambleDetails
}) => (
  <div>
    <Section>
      <TimerTime {...(stopped ? {} : { 'data-activation': true })}>
        <Time ms={time} />
      </TimerTime>
    </Section>
    <Section>
      <Scramble scramble={scramble} onClick={isCube(puzzle) ? showScrambleDetails : undefined} />
      <Modal isOpen={scrambleDetailsOpen} title="Scramble details">
        <Section>
          <ScrambleDetails scramble={scramble} puzzle={puzzle} />
        </Section>
        <Button onClick={hideScrambleDetails}>Close</Button>
      </Modal>
    </Section>
    <Section>
      <ActivationContainer/>
    </Section>
  </div>
);

Timer.propTypes = {
  puzzle: PropTypes.string.isRequired,
  scramble: PropTypes.arrayOf(PropTypes.string).isRequired,
  stopped: PropTypes.bool.isRequired,
  time: PropTypes.number.isRequired,
  showScrambleDetails: PropTypes.func.isRequired,
  scrambleDetailsOpen: PropTypes.bool.isRequired,
  hideScrambleDetails: PropTypes.func.isRequired
};

const TimerTime = styled.div`
  text-align: center;
  padding: ${props => props.theme.sizes.lg} 0;
  font-size: 5rem;
  z-index: 102;
  position: relative;

  @media screen and (min-width: 420px) {
    font-size: 6rem;
  }
`;

export default Timer
