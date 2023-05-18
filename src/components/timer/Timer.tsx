import React from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons/faThumbsUp";
import { faSpaceShuttle } from "@fortawesome/free-solid-svg-icons/faSpaceShuttle";

import Section from "../shared/Section";
import Time from "../shared/Time";
import IncrementingTime from "./IncrementingTime";
import DecrementingTime from "./DecrementingTime";
import { INSPECTION_TIME } from "../../constants/timer";
import {
  getZIndex,
  getBreakpoint,
  getColor,
  getSize,
} from "../../helpers/theme";
import Tag from "../shared/Tag";
import TrainerStatus from "../trainer/TrainerStatus";
import TrainerPreviousCase from "../trainer/TrainerPreviousCase";
import TimeActions from "./TimeActions";
import { useSelector } from "react-redux";
import {
  getTimerState,
  isPreparing,
  isPreparingForInspection,
  isReady,
} from "../../selectors/timer";
import {
  getPuzzleInfo,
  shouldShowTimerTime,
  shouldUseInspectionTime,
  shouldUseManualTimeEntry,
} from "../../selectors/settings";
import { getLastTime } from "../../selectors/times";
import TimeEntry from "./TimeEntry";
import { Color } from "../../theme";

type TimerTimeProps = {
  color: Color;
};

const Timer = () => {
  const { startTime, stopTime, isTraining, inspecting, inspectionStartTime } =
    useSelector(getTimerState);
  const currentPuzzle = useSelector(getPuzzleInfo).title;
  const useManualTimeEntry = useSelector(shouldUseManualTimeEntry);
  const ready = useSelector(isReady);
  const useInspectionTime = useSelector(shouldUseInspectionTime);
  const showTimerTime = useSelector(shouldShowTimerTime);
  const preparing = useSelector(isPreparing);
  const preparingForInspection = useSelector(isPreparingForInspection);
  const lastTime = useSelector(getLastTime);

  const showLastTime =
    startTime === 0 &&
    !ready &&
    !useManualTimeEntry &&
    !inspecting &&
    Boolean(lastTime);

  return (
    <TimerActivationContainer
      {...(useManualTimeEntry ? {} : { "data-activation": true })}
    >
      <Section margin="xs">
        <TimerHeader>
          {isTraining && (
            <span data-no-activation>
              <TrainerStatus />
            </span>
          )}
          {!isTraining && (
            <Tag
              color={showLastTime && lastTime.best ? "green" : "subtleBg"}
              data-no-activation
            >
              {showLastTime && lastTime.best ? (
                <>
                  <FontAwesomeIcon icon={faThumbsUp} />
                  &nbsp; {currentPuzzle} - Best session single
                </>
              ) : (
                currentPuzzle + (useInspectionTime ? "- With Inspection" : "")
              )}
            </Tag>
          )}
        </TimerHeader>
      </Section>
      <Section margin="sm">
        <TimerTime
          color={getTimeColor(preparing, preparingForInspection, ready)}
        >
          {(() => {
            switch (true) {
              case useManualTimeEntry:
                return <TimeEntry />;
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
                return (
                  <Time time={{ ms: stopTime - startTime }} showMilliseconds />
                );
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
      <TimeFooter>
        <TimeFooterClickArea data-no-activation>
          {isTraining && startTime > 0 && stopTime > 0 && (
            <TrainerPreviousCase />
          )}
          {!isTraining && showLastTime && (
            <TimeFooterActionsClickArea>
              <TimeActions />
            </TimeFooterActionsClickArea>
          )}
        </TimeFooterClickArea>
      </TimeFooter>
    </TimerActivationContainer>
  );
};

function getTimeColor(
  preparing: boolean,
  preparingForInspection: boolean,
  ready: boolean
) {
  switch (true) {
    case (preparing && ready) || preparingForInspection:
      return "green";
    case preparing && !ready:
      return "red";
    default:
      return "fg";
  }
}

const TimerActivationContainer = styled.div`
  position: relative;
  z-index: ${getZIndex("onFullScreenMask")};
`;

const TimerHeader = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  height: 5rem;

  @media screen and (min-width: ${getBreakpoint("lg")}) {
    height: 8rem;
  }
`;

const TimerTime = styled.div<TimerTimeProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 7rem;
  color: ${(props) => getColor(props.color)(props)};
  font-size: 5.4rem;
`;

const TimeFooter = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  height: 6.5rem;
  overflow: hidden;

  @media screen and (min-width: ${getBreakpoint("lg")}) {
    height: 9rem;
  }
`;

const TimeFooterClickArea = styled.div`
  display: inline-block;
`;

const TimeFooterActionsClickArea = styled.div`
  display: inline-block;
  padding: ${getSize("xs")};
`;

export default React.memo(Timer);
