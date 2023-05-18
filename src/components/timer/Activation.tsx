import React from "react";
import styled from "styled-components";

import FullScreenMask from "./FullScreenMask";
import PrepartionCircles from "./PreparationCircles";
import Button from "../shared/Button";
import { getZIndex, getColor, getSize } from "../../helpers/theme";
import { VisibleFrom, HiddenFrom } from "../shared/Visibility";
import { useDispatch, useSelector } from "react-redux";
import {
  getButtonColor,
  shouldUseInspectionTime,
  shouldUseManualTimeEntry,
} from "../../selectors/settings";
import {
  getTimeInputTime,
  getTimerState,
  isPreparing,
  isPreparingForInspection,
  isReady,
  isTimeInputValid,
} from "../../selectors/timer";
import { submitTimeInput } from "../../slices/timer";
import { useTheme } from "../../hooks/useTheme";
import { RootState } from "../../store";

const Activation = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const buttonColor = useSelector((state: RootState) =>
    getButtonColor(state, theme === "dark")
  );
  const useManualTimeEntry = useSelector(shouldUseManualTimeEntry);
  const useInspectionTime = useSelector(shouldUseInspectionTime);
  const validTimeInput = useSelector(isTimeInputValid);
  const timeInputTime = useSelector(getTimeInputTime);
  const preparingForInspection = useSelector(isPreparingForInspection);
  const preparing = useSelector(isPreparing);
  const ready = useSelector(isReady);
  const { stopped, preparationStage, inspecting } = useSelector(getTimerState);

  return (
    <ActivationContainer>
      <Button
        size="lg"
        color={buttonColor}
        {...(useManualTimeEntry ? {} : { "data-activation": true })}
        disabled={useManualTimeEntry && !validTimeInput}
        type="button"
        onClick={() => {
          if (useManualTimeEntry) {
            dispatch(submitTimeInput(timeInputTime));
          }
        }}
      >
        {(() => {
          switch (true) {
            case useManualTimeEntry:
              return "Submit";
            case !stopped:
              return "Stop";
            case preparingForInspection:
              return "Ready";
            case preparing || ready:
              return <PrepartionCircles preparationStage={preparationStage} />;
            default:
              return (
                "Start" +
                (useInspectionTime && !inspecting ? " inspection" : "")
              );
          }
        })()}
      </Button>

      <Explain>
        {(() => {
          switch (true) {
            case useManualTimeEntry:
              return "Enter a time and press enter or click submit.";
            case preparingForInspection:
              return "Release to start inspection.";
            case preparing && ready:
              return "Release to start!";
            case preparing && !ready:
              return "Hold on...";
            case !stopped:
              return (
                <>
                  <VisibleFrom breakpoint="md">
                    Click, touch or smash any key to stop.
                  </VisibleFrom>
                  <HiddenFrom breakpoint="md">
                    Touch anywhere to stop.
                  </HiddenFrom>
                </>
              );
            default:
              return (
                <>
                  <VisibleFrom breakpoint="md">
                    Click, touch or hold spacebar and release to start.
                  </VisibleFrom>
                  <HiddenFrom breakpoint="md">
                    Hold and release to start.
                  </HiddenFrom>
                </>
              );
          }
        })()}
      </Explain>

      {(!stopped || preparing || preparingForInspection || inspecting) && (
        <FullScreenMask />
      )}
    </ActivationContainer>
  );
};

const ActivationContainer = styled.div`
  position: relative;
  z-index: ${getZIndex("onFullScreenMask")};
`;

const Explain = styled.div`
  font-size: 1.5rem;
  color: ${getColor("subtleFg")};
  text-align: center;
  margin: ${getSize("sm")} 0 0;
  position: relative;
  top: -${getSize("xxs")};
  z-index: 102;
`;

export default React.memo(Activation);
