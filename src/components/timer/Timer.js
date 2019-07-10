import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import FontAwesome from '@fortawesome/react-fontawesome';
import faThumbsUp from '@fortawesome/fontawesome-pro-solid/faThumbsUp';
import faSpaceShuttle from '@fortawesome/fontawesome-pro-solid/faSpaceShuttle';
import * as CustomPropTypes from '../../propTypes';
import Section from '../shared/Section';
import Time from '../shared/Time';
import TimeActionsContainer from '../../containers/timer/TimeActionsContainer';
import TimeEntryContainer from '../../containers/timer/TimeEntryContainer';
import IncrementingTime from './IncrementingTime';
import DecrementingTime from './DecrementingTime';
import { INSPECTION_TIME } from '../../constants/timer';
import { getZIndex } from '../../helpers/theme';
import Tag from '../shared/Tag';

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
  showTimerTime,
  stopTime
}) => (
  <div>
    <Section margin="sm">
      <TimerTimeContainer withManualEntry={useManualTimeEntry}>
        {showLastTime && lastTime.best && (
          <RecordMessageContainer>
            <Tag color="green">
              <FontAwesome icon={faThumbsUp} />
              &nbsp; Best session single
            </Tag>
          </RecordMessageContainer>
        )}
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
                    belowZeroText="+2"
                    secondsOnly
                  />
                );
              case preparingForInspection:
                return <Time time={{ ms: INSPECTION_TIME }} secondsOnly />;
              case startTime > 0 && stopTime > 0:
                return <Time time={{ ms: stopTime - startTime }} />;
              case startTime > 0 && showTimerTime:
                return <IncrementingTime startTime={startTime} />;
              case startTime > 0 && !showTimerTime:
                return <FontAwesome icon={faSpaceShuttle} rotation={270} />;
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
      {showLastTime && <TimeActionsContainer lastTime={lastTime} />}
    </TimeFooter>
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
  stopTime: PropTypes.number.isRequired,
  lastTime: CustomPropTypes.Time,
  useManualTimeEntry: PropTypes.bool.isRequired,
  showTimerTime: PropTypes.bool.isRequired
};

const TimeFooter = styled.div`
  height: ${props => (props.withManualEntry ? '9.3rem' : '6.4rem')};
  text-align: center;
`;

const RecordMessageContainer = styled.div`
  position: absolute;
  text-align: center;
  width: 100%;
  top: -2.6rem;
  left: 0;
`;

const TimerTime = styled.span`
  position: relative;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  z-index: ${getZIndex('onFullScreenMask')};
`;

const TimerTimeContainer = styled.div`
  text-align: center;
  padding: ${props => (props.withManualEntry ? '6rem' : '5.2rem')} 0 0;
  font-size: 5.4rem;
  position: relative;
`;

export default React.memo(Timer);
