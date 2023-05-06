import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import TimerOptionsContainer from "../../containers/timer/TimerOptionsContainer";
import TimerContainer from "../../containers/timer/TimerContainer";
import ActivationContainer from "../../containers/timer/ActivationContainer";
import TimeBoardContainer from "../../containers/timer/TimeBoardContainer";
import ScrambleContainer from "../../containers/timer/ScrambleContainer";
import Section from "../shared/Section";
import { requireTimes } from "../../actions";

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
        <TimerOptionsContainer />
      </Section>
      <Section>
        <TimeBoardContainer />
      </Section>
    </>
  );
};

export default TimerView;
