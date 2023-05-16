import React from "react";

import Section from "../shared/Section";
import TimeTable from "../timeTable/TimeTable";
import TimeBoardActions from "./TimeBoardActions";
import { useSelector } from "react-redux";
import { getCurrentTimes } from "../../selectors/times";

const TimeBoard = () => {
  const times = useSelector(getCurrentTimes);
  return (
    <>
      <Section margin="sm">
        <TimeTable />
      </Section>

      {times.length > 0 && (
        <Section margin="sm">
          <TimeBoardActions />
        </Section>
      )}
    </>
  );
};

export default TimeBoard;
