import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import Input from "../shared/Input";
import ManualTimeEntryExplanation from "./ManualTimeEntryExplanation";
import { getColor, getSize, getFont } from "../../helpers/theme";
import { useDispatch, useSelector } from "react-redux";
import { submitTimeInput } from "../../slices/timer";
import { getTimeInput, isTimeInputValid } from "../../selectors/timer";
import { getTimeInputTime } from "../../selectors/timer";
import { updateTimeInput } from "../../slices/timer";
import { refreshScramble } from "../../slices/scramble";

const FOCUS_KEYS = ["Enter", " "];

const TimeEntry = () => {
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>();
  const timeInput = useSelector(getTimeInput);
  const timeInputTime = useSelector(getTimeInputTime);
  const isValid = useSelector(isTimeInputValid);
  const isEmpty = timeInput.trim() === "";

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Escape") {
      inputRef.current.blur();
    }

    if (e.key !== "Enter") {
      return;
    }

    if (isValid) {
      dispatch(submitTimeInput(timeInputTime));
      return;
    }

    dispatch(refreshScramble());
  };

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (
        String(Number(event.key)) === event.key ||
        FOCUS_KEYS.includes(event.key)
      ) {
        inputRef.current.focus();
      }
    };

    window.addEventListener("keydown", listener);

    return () => window.removeEventListener("keydown", listener);
  });

  return (
    <TimeInputContainer>
      <TimeInput
        error={!isValid && !isEmpty}
        ref={inputRef}
        type="text"
        placeholder="00:00.000"
        value={timeInput}
        onKeyDown={onKeyDown}
        onChange={(e) => dispatch(updateTimeInput(e.target.value))}
      />
      <HelperText>
        Append <strong>+2</strong> for plus 2; enter <strong>dnf</strong> for a
        DNF &nbsp;
        <ManualTimeEntryExplanation />
      </HelperText>
    </TimeInputContainer>
  );
};

const TimeInputContainer = styled.div`
  position: relative;
`;

const HelperText = styled.p`
  position: absolute;
  font-size: 1.5rem;
  top: 7.2rem;
  margin: 0;
  color: ${getColor("subtleFg")};
  width: 100%;
  text-align: center;
  font-size: 1.5rem;
`;

const TimeInput = styled(Input)`
  display: block;
  font-size: 5.4rem;
  text-align: center;
  -webkit-appearance: none;
  height: 6rem;
  font-family: ${getFont("default")};
  padding: 0 ${getSize("xs")};
  border-radius: 1rem;
`;

export default TimeEntry;
