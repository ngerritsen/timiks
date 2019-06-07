import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import TimerOptionsContainer from '../../containers/timer/TimerOptionsContainer';
import TimerContainer from '../../containers/timer/TimerContainer';
import TimeBoardContainer from '../../containers/timer/TimeBoardContainer';
import Section from '../shared/Section';

const TimerView = ({ requireTimes }) => {
  useEffect(() => {
    requireTimes(true);
  }, []);

  return (
    <div>
      <Section margin="lg">
        <TimerContainer />
      </Section>
      <Section margin="sm">
        <TimerOptionsContainer />
      </Section>
      <Section>
        <TimeBoardContainer />
      </Section>
    </div>
  );
};

TimerView.propTypes = {
  requireTimes: PropTypes.func.isRequired
};

export default TimerView;
