import React from 'react';

import SettingsContainer from '../containers/SettingsContainer';
import TimerContainer from '../containers/TimerContainer';
import TimeBoardContainer from '../containers/TimeBoardContainer';
import Section from './Section';

const TimerView = () => (
  <div>
    <Section margin="lg">
      <TimerContainer/>
    </Section>
    <Section>
      <SettingsContainer/>
    </Section>
    <Section>
      <TimeBoardContainer/>
    </Section>
  </div>
);

export default TimerView;
