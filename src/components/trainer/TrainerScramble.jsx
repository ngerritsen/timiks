import React from "react";
import { useSelector } from "react-redux";

import Scramble from "../../components/scramble/Scramble";
import {
  getCurrentScramble,
  getCurrentCase,
  getTrainingType,
} from "../../selectors/trainer";

const TrainerScramble = () => {
  const scramble = useSelector(getCurrentScramble);
  const currentCase = useSelector(getCurrentCase);
  const trainingType = useSelector(getTrainingType);

  return (
    <Scramble
      scramble={scramble}
      withTrainingCase={currentCase}
      trainingType={trainingType}
    />
  );
};

export default TrainerScramble;
