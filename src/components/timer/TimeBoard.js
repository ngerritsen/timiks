import React from "react";

import Section from "../shared/Section";
import TimeBoardActionsContainer from "../../containers/timer/TimeBoardActionsContainer";
import TimeTable from "../timeTable/TimeTable";

const TimeBoard = () => (
  <>
    <Section margin="sm">
      <TimeTable />
    </Section>

    <Section margin="sm">
      <TimeBoardActionsContainer />
    </Section>
  </>
);

export default TimeBoard;
