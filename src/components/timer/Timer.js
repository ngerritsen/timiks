import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import * as CustomPropTypes from '../../propTypes';
import ActivationContainer from '../../containers/timer/ActivationContainer';
import ScrambleContainer from '../../containers/timer/ScrambleContainer';
import Section from '../shared/Section';
import Time from '../shared/Time';
import TimeActionsContainer from '../../containers/timer/TimeActionsContainer';
import TimeEntryContainer from '../../containers/timer/TimeEntryContainer';
import IncrementingTime from './IncrementingTime';
import DecrementingTime from './DecrementingTime';
import { INSPECTION_TIME } from '../../constants/app';

const Timer = ({
  inspecting,
  preparing,
  preparingForInspection,
  ready,
  showLastTime,
  inspectionStartTime,
  startTime,
  lastTime,
  useManualTimeEntry,
  showTimerTime
}) => (
  <div>
    <Section margin="sm">
      <TimerTimeContainer withManualEntry={useManualTimeEntry}>
        <TimerTime disabled={preparing && !ready}>
          {(() => {
            switch (true) {
              case useManualTimeEntry:
                return <TimeEntryContainer />;
              case inspecting:
                return (
                  <DecrementingTime
                    decrementFrom={INSPECTION_TIME}
                    startTime={inspectionStartTime}
                    secondsOnly
                  />
                );
              case preparingForInspection:
                return <Time time={{ ms: INSPECTION_TIME }} secondsOnly />;
              case startTime > 0 && showTimerTime:
                return <IncrementingTime startTime={startTime} />;
              case startTime > 0 && !showTimerTime:
                return 'Solve.';
              case showLastTime:
                return <Time time={lastTime} />;
              default:
                return <Time time={{ ms: 0 }} />;
            }
          })()}
        </TimerTime>
      </TimerTimeContainer>
    </Section>
    <TimeFooter withManualEntry={useManualTimeEntry}>
      {showLastTime && <TimeActionsContainer />}
    </TimeFooter>
    <Section margin="sm">
      <ScrambleContainer />
    </Section>
    <Section margin="sm">
      <ActivationContainer />
    </Section>
  </div>
);

Timer.propTypes = {
  inspecting: PropTypes.bool.isRequired,
  inspectionStartTime: PropTypes.number.isRequired,
  preparing: PropTypes.bool.isRequired,
  preparingForInspection: PropTypes.bool.isRequired,
  ready: PropTypes.bool.isRequired,
  showLastTime: PropTypes.bool.isRequired,
  startTime: PropTypes.number.isRequired,
  lastTime: CustomPropTypes.Time,
  useManualTimeEntry: PropTypes.bool.isRequired,
  showTimerTime: PropTypes.bool.isRequired
};

const TimeFooter = styled.div`
  height: ${props => (props.withManualEntry ? '9.3rem' : '6.4rem')};
  text-align: center;
`;

const TimerTime = styled.span`
  position: relative;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  z-index: ${props => props.theme.zIndices.onFullScreenMask};
`;

const TimerTimeContainer = styled.div`
  text-align: center;
  padding: ${props => (props.withManualEntry ? '6rem' : '5.2rem')} 0 0;
  font-size: 5.6rem;
  position: relative;
`;

export default React.memo(Timer);
