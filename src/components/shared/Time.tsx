import React from "react";
import styled from "styled-components";

import { fillZeroes } from "../../helpers/formatting";
import { breakUpTime, getMs } from "../../helpers/time";
import { getColor } from "../../helpers/theme";
import { Time as TimeType } from "../../types";

type TimeProps = {
  time: Pick<TimeType, "ms" | "dnf" | "plus2">;
  secondsOnly?: boolean;
  showMilliseconds?: boolean;
};

const Time = ({
  secondsOnly,
  showMilliseconds,
  time: { ms, dnf, plus2 },
}: TimeProps) => {
  if (dnf || ms === Infinity) {
    return <>{monospace("DNF")}</>;
  }

  if (secondsOnly) {
    return <span>{formatPart(Math.ceil(ms / 1000))}</span>;
  }

  const { minutes, seconds, milliseconds } = breakUpTime(getMs({ ms, plus2 }));
  const showMinute = minutes > 0;

  return (
    <>
      {showMinute && formatPart(minutes, 2)}
      {showMinute && ":"}
      {formatPart(seconds, 2)}.
      {!showMilliseconds && formatPart(Math.floor(milliseconds / 10), 2)}
      {showMilliseconds && formatPart(milliseconds, 3)}
      {plus2 && <Plus2>(+2)</Plus2>}
    </>
  );
};

function formatPart(number: number, minChars?: number) {
  return monospace(
    minChars ? fillZeroes(String(number), minChars) : String(number)
  );
}

function monospace(string: string) {
  return string
    .split("")
    .map((char, i) => <TimeNumber key={i}>{char}</TimeNumber>);
}

const Plus2 = styled.span`
  position: relative;
  top: -0.6em;
  border-radius: 3em;
  font-size: 0.5em;
  color: ${getColor("subtleFg")};
  margin-left: 0.3em;
`;

const TimeNumber = styled.span`
  display: inline-block;
  width: 0.55em;
  text-align: center;
`;

export default Time;
