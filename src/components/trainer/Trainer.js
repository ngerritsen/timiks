import React, { useEffect } from "react";

import Section from "../shared/Section";
import TimerContainer from "../../containers/timer/TimerContainer";
import ActivationContainer from "../../containers/timer/ActivationContainer";
import TrainerActions from "./TrainerActions";
import TrainerCases from "./TrainerCases";
import { useDispatch, useSelector } from "react-redux";
import { shouldHideTrainerTimes } from "../../selectors/settings";
import TrainerOptions from "./TrainerOptions";
import TrainerTimeTable from "./TrainerTimeTable";
import TrainerScramble from "./TrainerScramble";
import { setIsTraining } from "../../actions";

const Trainer = () => {
  const dispatch = useDispatch();
  const shouldShowTrainerTimes = !useSelector(shouldHideTrainerTimes);

  useEffect(() => {
    dispatch(setIsTraining(true));
    return () => setIsTraining(false);
  }, []);

  return (
    <>
      <Section margin="lg">
        <TimerContainer showFinalTime />
      </Section>
      <Section margin="sm">
        <TrainerScramble />
      </Section>
      <Section margin="md">
        <ActivationContainer />
      </Section>
      <Section margin="md">
        <TrainerOptions />
      </Section>
      {shouldShowTrainerTimes && (
        <Section margin="lg">
          <TrainerTimeTable />
        </Section>
      )}
      <Section margin="md">
        <TrainerActions />
      </Section>
      <Section margin="md">
        <TrainerCases />
      </Section>
      <Section margin="md">
        <TrainerActions />
      </Section>
    </>
  );
};

export default React.memo(Trainer);
