import React from 'react';

import Section from '../shared/Section';
import TimerContainer from '../../containers/timer/TimerContainer';
import ActivationContainer from '../../containers/timer/ActivationContainer';
import TrainerCasesContainer from '../../containers/trainer/TrainerCasesContainer';
import TrainerScrambleContainer from '../../containers/trainer/TrainerScrambleContainer';
import TrainerOptionsContainer from '../../containers/trainer/TrainerOptionsContainer';
import TrainerTimeTableContainer from '../../containers/trainer/TrainerTimeTableContainer';

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
      <TrainerOptionsContainer />
    </Section>
    <Section margin="lg">
      <TrainerTimeTableContainer />
    </Section>
    <TrainerCasesContainer />
  </>
);

export default React.memo(Trainer);
