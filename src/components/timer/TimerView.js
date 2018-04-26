import React from 'react';

import TimerOptionsContainer from '../../containers/TimerOptionsContainer';
import TimerContainer from '../../containers/TimerContainer';
import TimeBoardContainer from '../../containers/TimeBoardContainer';
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
