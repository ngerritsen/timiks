import React from 'react';

import Section from './Section';
import TimeBoardActionsContainer from '../containers/TimeBoardActionsContainer';
import TimeTableContainer from '../containers/TimeTableContainer';

const TimeBoard = () => {
  return (
    <div>
      <Section>
        <TimeTableContainer/>
      </Section>

      <Section>
        <TimeBoardActionsContainer/>
      </Section>
    </div>
  );
};

export default TimeBoard;
