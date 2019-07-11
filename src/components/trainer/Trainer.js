import React from 'react';

import Section from '../shared/Section';
import TimerContainer from '../../containers/timer/TimerContainer';
import ActivationContainer from '../../containers/timer/ActivationContainer';
import TrainerCasesContainer from '../../containers/trainer/TrainerCasesContainer';
import TrainerScrambleContainer from '../../containers/trainer/TrainerScrambleContainer';

const Trainer = () => (
  <>
    <Section margin="lg">
      <TimerContainer showFinalTime />
    </Section>
    <Section margin="sm">
      <TrainerScrambleContainer />
    </Section>
    <Section margin="md">
      <ActivationContainer />
    </Section>
    <Section margin="md">
      Select the OLL cases you want to train. Selecting nothing will be the same as everything.
    </Section>
    <TrainerCasesContainer />
  </>
);

export default React.memo(Trainer);
