import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/pro-solid-svg-icons/faThumbsUp';
import { faSpaceShuttle } from '@fortawesome/pro-solid-svg-icons/faSpaceShuttle';
import * as CustomPropTypes from '../../propTypes';
import Section from '../shared/Section';
import Time from '../shared/Time';
import TimeActionsContainer from '../../containers/timer/TimeActionsContainer';
import TimeEntryContainer from '../../containers/timer/TimeEntryContainer';
import IncrementingTime from './IncrementingTime';
import DecrementingTime from './DecrementingTime';
import { INSPECTION_TIME } from '../../constants/timer';
import { getZIndex, getBreakpoint, getColor } from '../../helpers/theme';
import Tag from '../shared/Tag';
import TrainerStatusContainer from '../../containers/trainer/TrainerStatusContainer';
import TrainerPreviousCaseContainer from '../../containers/trainer/TrainerPreviousCaseContainer';

const Timer = ({
  inspecting,
  preparing,
  preparingForInspection,
  currentPuzzle,
  ready,
  showLastTime,
  inspectionStartTime,
  startTime,
  lastTime,
  useManualTimeEntry,
  useInspectionTime,
  showTimerTime,
  stopTime,
  isTraining
}) => (
  <TimerActivationContainer {...(useManualTimeEntry ? {} : { 'data-activation': true })}>
    <Section margin="xs">
      <TimerHeader>
        {isTraining && (
          <span data-no-activation>
            <TrainerStatusContainer />
          </span>
        )}
        {!isTraining && (
          <Tag color={showLastTime && lastTime.best ? 'green' : 'subtleBg'} data-no-activation>
            {showLastTime && lastTime.best ? (
              <>
                <FontAwesomeIcon icon={faThumbsUp} />
                &nbsp; {currentPuzzle} - Best session single
              </>
            ) : (
              currentPuzzle + (useInspectionTime ? '- With Inspection' : '')
            )}
          </Tag>
        )}
      </TimerHeader>
    </Section>
    <Section margin="sm">
      <TimerTime color={getTimeColor(preparing, preparingForInspection, ready)}>
        {(() => {
          switch (true) {
            case useManualTimeEntry:
              return <TimeEntryContainer />;
            case inspecting:
              return (
                <DecrementingTime
                  decrementFrom={INSPECTION_TIME}
                  startTime={inspectionStartTime}
                  belowZeroText="+2"
                  secondsOnly
                />
              );
            case preparingForInspection:
              return <Time time={{ ms: INSPECTION_TIME }} secondsOnly />;
            case startTime > 0 && stopTime > 0:
              return <Time time={{ ms: stopTime - startTime }} showMilliseconds />;
            case startTime > 0 && showTimerTime:
              return <IncrementingTime startTime={startTime} />;
            case startTime > 0 && !showTimerTime:
              return <FontAwesomeIcon icon={faSpaceShuttle} rotation={270} />;
            case showLastTime:
              return <Time time={lastTime} showMilliseconds />;
            default:
              return <Time time={{ ms: 0 }} showMilliseconds />;
          }
        })()}
      </TimerTime>
    </Section>
    <TimeFooter withManualEntry={useManualTimeEntry}>
      <TimeFooterClickArea data-no-activation>
        {isTraining && startTime > 0 && stopTime > 0 && <TrainerPreviousCaseContainer />}
        {!isTraining && showLastTime && <TimeActionsContainer lastTime={lastTime} />}
      </TimeFooterClickArea>
    </TimeFooter>
  </TimerActivationContainer>
);

Timer.propTypes = {
  currentPuzzle: PropTypes.string,
  inspecting: PropTypes.bool.isRequired,
  inspectionStartTime: PropTypes.number.isRequired,
  preparing: PropTypes.bool.isRequired,
  preparingForInspection: PropTypes.bool.isRequired,
  ready: PropTypes.bool.isRequired,
  showLastTime: PropTypes.bool.isRequired,
  startTime: PropTypes.number.isRequired,
  stopTime: PropTypes.number.isRequired,
  lastTime: CustomPropTypes.Time,
  useManualTimeEntry: PropTypes.bool.isRequired,
  useInspectionTime: PropTypes.bool.isRequired,
  showTimerTime: PropTypes.bool.isRequired,
  isTraining: PropTypes.bool
};

function getTimeColor(preparing, preparingForInspection, ready) {
  switch (true) {
    case (preparing && ready) || preparingForInspection:
      return 'green';
    case preparing && !ready:
      return 'red';
    default:
      return 'fg';
  }
}

const TimerActivationContainer = styled.div`
  position: relative;
  z-index: ${getZIndex('onFullScreenMask')};
`;

const TimerHeader = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  height: 5rem;

  @media screen and (min-width: ${getBreakpoint('lg')}) {
    height: 8rem;
  }
`;

const TimerTime = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 7rem;
  color: ${props => getColor(props.color)(props)};
  font-size: 5.4rem;
`;

const TimeFooter = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  height: 6.5rem;
  overflow: hidden;

  @media screen and (min-width: ${getBreakpoint('lg')}) {
    height: 9rem;
  }
`;

const TimeFooterClickArea = styled.span`
  display: inline-block;
`;

export default React.memo(Timer);
