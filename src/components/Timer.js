import React from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components'

import Time from './Time';
import Section from './Section';
import Scramble from './Scramble';
import ActivationContainer from '../containers/ActivationContainer';

const Timer = ({ scramble, time, cubeSize }) => (
  <div data-activation>
    <Section>
      <TimerTime>
        <Time ms={time} />
      </TimerTime>
    </Section>
    <Section>
      <Scramble scramble={scramble} cubeSize={cubeSize} />
    </Section>
    <Section>
      <ActivationContainer/>
    </Section>
  </div>
);

Timer.propTypes = {
  cubeSize: PropTypes.number,
  scramble: PropTypes.arrayOf(PropTypes.string).isRequired,
  time: PropTypes.number.isRequired
};

const TimerTime = styled.div`
  text-align: center;
  padding: ${props => props.theme.sizes.lg} 0;
  font-size: 5rem;

  @media screen and (min-width: 420px) {
    font-size: 6rem;
  }
`;

export default Timer
