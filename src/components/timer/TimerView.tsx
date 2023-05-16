import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import TimerContainer from "../../containers/timer/TimerContainer";
import ActivationContainer from "../../containers/timer/ActivationContainer";
import Section from "../shared/Section";
import TimerOptions from "./TimerOptions";
import TimerScramble from "./TimerScramble";
import TimeBoard from "./TimeBoard";
import { requireTimes } from "../../slices/times";

const TimerView = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requireTimes({ current: true }));
  }, []);

  return (
    <>
      <Section margin="lg">
        <TimerContainer />
      </Section>
      <Section margin="sm">
        <TimerScramble />
      </Section>
      <Section margin="sm">
        <ActivationContainer />
      </Section>
      <Section margin="sm">
        <TimerOptions />
      </Section>
      <Section>
        <TimeBoard />
      </Section>
    </>
  );
};

export default TimerView;
