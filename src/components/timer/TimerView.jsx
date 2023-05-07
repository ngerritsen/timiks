import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import TimerContainer from "../../containers/timer/TimerContainer";
import ActivationContainer from "../../containers/timer/ActivationContainer";
import TimeBoardContainer from "../../containers/timer/TimeBoardContainer";
import ScrambleContainer from "../../containers/timer/ScrambleContainer";
import Section from "../shared/Section";
import { requireTimes } from "../../actions";
import TimerOptions from "./TimerOptions";

const TimerView = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requireTimes(true));
  }, []);

  return (
    <>
      <Section margin="lg">
        <TimerContainer />
      </Section>
      <Section margin="sm">
        <ScrambleContainer />
      </Section>
      <Section margin="sm">
        <ActivationContainer />
      </Section>
      <Section margin="sm">
        <TimerOptions />
      </Section>
      <Section>
        <TimeBoardContainer />
      </Section>
    </>
  );
};

export default TimerView;
