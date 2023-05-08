import React from "react";
import { useSelector } from "react-redux";

import Scramble from "../scramble/Scramble";
import { getScramble, getPuzzleForScramble } from "../../selectors/scramble";

const TimerScramble = () => {
  const scramble = useSelector(getScramble);
  const puzzle = useSelector(getPuzzleForScramble);

  return <Scramble puzzle={puzzle} scramble={scramble} withDetails />;
};

export default TimerScramble;
