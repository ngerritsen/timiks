import React from 'react';

import Section from '../shared/Section';
import TimeBoardActionsContainer from '../../containers/TimeBoardActionsContainer';
import TimeTableContainer from '../../containers/TimeTableContainer';

const TimeBoard = () => {
  return (
    <div>
      <Section margin="sm">
        <TimeTableContainer/>
      </Section>

      <Section margin="sm">
        <TimeBoardActionsContainer/>
      </Section>
    </div>
  );
};

export default TimeBoard;
