import React from 'react';

import Section from '../shared/Section';
import TimeBoardActionsContainer from '../../containers/timer/TimeBoardActionsContainer';
import TimeTableContainer from '../../containers/timeTable/TimeTableContainer';

const TimeBoard = () => {
  return (
    <div>
      <Section margin="sm">
        <TimeTableContainer />
      </Section>

      <Section margin="sm">
        <TimeBoardActionsContainer />
      </Section>
    </div>
  );
};

export default TimeBoard;
