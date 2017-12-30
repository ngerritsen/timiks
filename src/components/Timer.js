import React from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components'

import Time from './Time';
import Section from './Section';
import Scramble from './Scramble';
import ActivationContainer from '../containers/ActivationContainer';

const Timer = ({ scramble, time }) => (
  <div>
    <Section>
      <TimerTime>
        <Time ms={time} fontSize={6.2} />
      </TimerTime>
    </Section>
    <Section>
      <Scramble scramble={scramble} />
    </Section>
    <Section>
      <ActivationContainer/>
    </Section>
  </div>
);

Timer.propTypes = {
  scramble: PropTypes.arrayOf(PropTypes.string).isRequired,
  time: PropTypes.number.isRequired
};

const TimerTime = styled.div`
  text-align: center;
  padding: ${props => props.theme.sizes.xl} 0;
`;

export default Timer
