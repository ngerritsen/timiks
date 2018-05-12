import React from 'react';

import TimerOptionsContainer from '../../containers/timer/TimerOptionsContainer';
import TimerContainer from '../../containers/timer/TimerContainer';
import TimeBoardContainer from '../../containers/timer/TimeBoardContainer';
import Section from '../shared/Section';

const TimerView = () => (
  <div>
    <Section margin="lg">
      <TimerContainer/>
    </Section>
    <Section margin="sm">
      <TimerOptionsContainer/>
    </Section>
    <Section>
      <TimeBoardContainer/>
    </Section>
  </div>
);

export default TimerView;
