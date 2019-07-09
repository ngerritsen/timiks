import React from 'react';

import Section from '../shared/Section';
import Scramble from '../scramble/Scramble';
import TimerContainer from '../../containers/timer/TimerContainer';
import ActivationContainer from '../../containers/timer/ActivationContainer';
import { DEFAULT_PUZZLE } from '../../constants/settings';
import * as CustomPropTypes from '../../propTypes';

const Trainer = ({ scramble }) => (
  <div>
    <Section margin="lg">
      <TimerContainer />
    </Section>
    <Section margin="sm">
      <Scramble scramble={scramble} puzzle={DEFAULT_PUZZLE} />
    </Section>
    <Section margin="sm">
      <ActivationContainer />
    </Section>
  </div>
);

Trainer.propTypes = {
  scramble: CustomPropTypes.Scramble.isRequired
};

export default Trainer;
