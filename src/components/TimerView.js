import React from 'react';

import PuzzleSelectorContainer from '../containers/PuzzleSelectorContainer';
import TimerContainer from '../containers/TimerContainer';
import TimeBoardContainer from '../containers/TimeBoardContainer';
import Section from './Section';

const TimerView = () => (
  <div>
    <Section margin="lg">
      <TimerContainer/>
    </Section>
    <Section margin="sm">
      <PuzzleSelectorContainer/>
    </Section>
    <Section>
      <TimeBoardContainer/>
    </Section>
  </div>
);

export default TimerView;
