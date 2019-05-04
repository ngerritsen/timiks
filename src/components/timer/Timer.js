import PropTypes from 'prop-types';
import React from 'react'
import styled from 'styled-components'

import * as CustomPropTypes from '../../propTypes';
import ActivationContainer from '../../containers/timer/ActivationContainer';
import ScrambleContainer from '../../containers/timer/ScrambleContainer';
import Section from '../shared/Section';
import Time from '../shared/Time';
import TimeActionsContainer from '../../containers/timer/TimeActionsContainer';
import TimeEntryContainer from '../../containers/timer/TimeEntryContainer';

const Timer = ({
  inspectionMode,
  preparing,
  preparingForInspection,
  ready,
  showLastTime,
  time,
  useManualTimeEntry
}) => (
  <div>
    <Section margin="sm">
      <TimerTimeContainer>
        <TimerTime disabled={preparing && !ready}>
          {
            useManualTimeEntry &&
            <TimeEntryContainer/>
          }
          {
            !useManualTimeEntry &&
            <Time
              time={time}
              secondsOnly={inspectionMode || preparingForInspection}
            />
          }
        </TimerTime>
      </TimerTimeContainer>
    </Section>
    <TimeFooter>
      {
        showLastTime &&
        <TimeActionsContainer/>
      }
    </TimeFooter>
    <Section margin="sm">
      <ScrambleContainer />
    </Section>
    <Section margin="sm">
      <ActivationContainer/>
    </Section>
  </div>
);

Timer.propTypes = {
  inspectionMode: PropTypes.bool.isRequired,
  preparing: PropTypes.bool.isRequired,
  preparingForInspection: PropTypes.bool.isRequired,
  ready: PropTypes.bool.isRequired,
  showLastTime: PropTypes.bool.isRequired,
  time: CustomPropTypes.Time,
  useManualTimeEntry: PropTypes.bool.isRequired
};

const TimeFooter = styled.div`
  height: 6rem;
  text-align: center;
`;


const TimerTime = styled.span`
  position: relative;
  opacity: ${props => props.disabled ? 0.5 : 1};
  z-index: ${props => props.theme.zIndices.onFullScreenMask};
`;

const TimerTimeContainer = styled.div`
  text-align: center;
  padding: 4.5rem 0 0;
  font-size: 5.4rem;
  position: relative;
`;

export default Timer;
