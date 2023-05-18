import React, { useState } from "react";
import styled from "styled-components";
import Input from "../shared/Input";
import ManualTimeEntryExplanation from "./ManualTimeEntryExplanation";
import { getColor, getSize, getFont } from "../../helpers/theme";
import { useDispatch } from "react-redux";
import { parseTimeInput } from "../../helpers/time";
import { submitTimeInput } from "../../slices/timer";

const TimeEntry = () => {
  const dispatch = useDispatch();
  const [timeInput, setTimeInput] = useState("");

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    const inputData = parseTimeInput(timeInput);

    if (e.key === "Enter" && inputData) {
      dispatch(submitTimeInput(inputData));
    }
  };

  return (
    <TimeInputContainer>
      <TimeInput
        type="text"
        placeholder="00:00.000"
        value={timeInput}
        onKeyDown={onKeyDown}
        onChange={(e) => setTimeInput(e.target.value)}
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
`;

export default TimeEntry;
