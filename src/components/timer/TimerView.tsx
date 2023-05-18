import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import Timer from "./Timer";
import Activation from "./Activation";
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
        <Timer />
      </Section>
      <Section margin="sm">
        <TimerScramble />
      </Section>
      <Section margin="sm">
        <Activation />
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
