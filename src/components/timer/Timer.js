import React from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components'

import Input from '../shared/Input';
import Time from '../shared/Time';
import Section from '../shared/Section';
import Scramble from '../Scramble';
import ActivationContainer from '../../containers/ActivationContainer';
import Button from '../shared/Button';
import { parseTimeInput } from '../../helpers/time';

const Timer = ({
  scramble,
  time,
  puzzle,
  timeInput,
  submitTimeInput,
  updateTimeInput,
  dnf,
  plus2,
  inspectionMode,
  removeLastTime,
  toggleDnfLastTime,
  togglePlus2LastTime,
  showTimeActions,
  preparingForInspection,
  useManualTimeEntry,
  preparing,
  ready
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
        <TimeActions>
          <TimeAction>
            <Button tiny tag empty={!plus2} onClick={togglePlus2LastTime}>+2</Button>
          </TimeAction>
          <TimeAction>
            <Button tiny tag empty={!dnf} onClick={toggleDnfLastTime}>DNF</Button>
          </TimeAction>
          <TimeAction>
            <Button tiny tag danger onClick={removeLastTime}>Remove</Button>
          </TimeAction>
        </TimeActions>
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
  puzzle: PropTypes.string.isRequired,
  scramble: PropTypes.arrayOf(PropTypes.string).isRequired,
  time: PropTypes.number.isRequired,
  dnf: PropTypes.bool.isRequired,
  plus2: PropTypes.bool.isRequired,
  inspectionMode: PropTypes.bool.isRequired,
  showTimeActions: PropTypes.bool.isRequired,
  preparingForInspection: PropTypes.bool.isRequired,
  useManualTimeEntry: PropTypes.bool.isRequired,
  removeLastTime: PropTypes.func.isRequired,
  toggleDnfLastTime: PropTypes.func.isRequired,
  togglePlus2LastTime: PropTypes.func.isRequired,
  preparing: PropTypes.bool.isRequired,
  ready: PropTypes.bool.isRequired,
  timeInput: PropTypes.string.isRequired,
  submitTimeInput: PropTypes.func.isRequired,
  updateTimeInput: PropTypes.func.isRequired,
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

const TimeActions = styled.div`
  position: relative;
  top: 0;
`;

const TimeAction = styled.span`
  margin-right: ${props => props.theme.sizes.xs};
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
