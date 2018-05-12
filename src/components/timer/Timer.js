import React from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components'

import { parseTimeInput } from '../../helpers/time';
import ActivationContainer from '../../containers/timer/ActivationContainer';
import Input from '../shared/Input';
import Scramble from '../scramble/Scramble';
import Section from '../shared/Section';
import Time from '../shared/Time';
import TimeActionsContainer from '../../containers/timer/TimeActionsContainer';

const Timer = ({
  dnf,
  inspectionMode,
  plus2,
  preparing,
  preparingForInspection,
  puzzle,
  ready,
  scramble,
  showTimeActions,
  submitTimeInput,
  time,
  timeInput,
  updateTimeInput,
  useManualTimeEntry
}) => (
  <div>
    <Section margin="sm">
      <TimerTimeContainer>
        <TimerTime disabled={preparing && !ready}>
          {
            useManualTimeEntry &&
            <TimeEntry
              type="text"
              value={timeInput}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && parseTimeInput(timeInput)) {
                  submitTimeInput();
                }
              }}
              onInput={e => updateTimeInput(e.target.value)}
            />
          }
          {
            !useManualTimeEntry &&
            <Time
              ms={time}
              secondsOnly={inspectionMode || preparingForInspection}
              dnf={dnf}
              plus2={plus2}
            />
          }
        </TimerTime>
      </TimerTimeContainer>
    </Section>
    <TimeFooter>
      {
        useManualTimeEntry &&
        <Explanation>
          Format: <strong>{`'`}HH:mm:ss.SSS{`'`}</strong>, for +2 add <strong>{`'`}+2{`'`}</strong> at the end, for DNF enter <strong>{`'`}dnf{`'`}</strong>.
        </Explanation>
      }
      {
        showTimeActions &&
        <TimeActionsContainer/>
      }
    </TimeFooter>
    <Section margin="sm">
      <Scramble scramble={scramble} puzzle={puzzle} withDetails />
    </Section>
    <Section margin="sm">
      <ActivationContainer/>
    </Section>
  </div>
);

Timer.propTypes = {
  dnf: PropTypes.bool.isRequired,
  inspectionMode: PropTypes.bool.isRequired,
  plus2: PropTypes.bool.isRequired,
  preparing: PropTypes.bool.isRequired,
  preparingForInspection: PropTypes.bool.isRequired,
  puzzle: PropTypes.string.isRequired,
  ready: PropTypes.bool.isRequired,
  scramble: PropTypes.arrayOf(PropTypes.string).isRequired,
  showTimeActions: PropTypes.bool.isRequired,
  submitTimeInput: PropTypes.func.isRequired,
  time: PropTypes.number.isRequired,
  timeInput: PropTypes.string.isRequired,
  updateTimeInput: PropTypes.func.isRequired,
  useManualTimeEntry: PropTypes.bool.isRequired
};

const TimeEntry = Input.extend`
  display: block;
  font-size: 5.4rem;
  text-align: center;
  height: 6.2rem;
  font-family: ${props => props.theme.font};
  padding: ${props => props.theme.sizes.xs};
`;

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
  padding: 3.5rem 0 0;
  font-size: 5.4rem;
  position: relative;
`;

const Explanation = styled.span`
  display: block;
  font-size: 1.6rem;
  text-align: center;
  color: ${props => props.theme.colors.subtleFg};
`;

export default Timer
