import React from "react";

import Time from "../shared/Time";
import { Cell } from "../shared/Table";
import { SubtleText } from "../shared/Typography";
import { StatTime } from "../../types";

type TimeTableStatRowProps = {
  name: string;
  current: StatTime;
  best?: StatTime;
  onHardHighlight: (params: string[]) => void;
  onSoftHighlight: (params: string[]) => void;
  hardHighlightedStatName?: string;
  hardHighlightedStatType?: string;
  softHighlightedStatName?: string;
  softHighlightedStatType?: string;
};

const TimeTableStatRow = ({
  name,
  current,
  best,
  onHardHighlight,
  onSoftHighlight,
  hardHighlightedStatName,
  hardHighlightedStatType,
  softHighlightedStatName,
  softHighlightedStatType,
}: TimeTableStatRowProps) => {
  return (
    <tr key={name}>
      <Cell>
        <SubtleText>{name}</SubtleText>
      </Cell>
      {createStatCell(current, "current", best ? 1 : 3)}
      {best && createStatCell(best, "best", 2)}
    </tr>
  );

  function createStatCell(statTime: StatTime, type: string, colSpan: number) {
    if (!current || !best) {
      return (
        <Cell bold colSpan={colSpan}>
          <Time time={statTime} />
        </Cell>
      );
    }

    const isHardHighlighted =
      hardHighlightedStatName === name && hardHighlightedStatType === type;
    const isSoftHighlighted =
      softHighlightedStatName === name && softHighlightedStatType === type;
    const softHighlight = () => onSoftHighlight([name, type]);
    const hardHighlight = () => onHardHighlight([name, type]);
    const softUnhighlight = () => onSoftHighlight([]);
    const hardUnhighlight = () => onHardHighlight([]);

    return (
      <Cell
        bold
        colSpan={colSpan}
        highlightColor={
          (isHardHighlighted && "blue") ||
          (isSoftHighlighted && "grey") ||
          undefined
        }
        onMouseEnter={softHighlight}
        onMouseLeave={softUnhighlight}
        onClick={isHardHighlighted ? hardUnhighlight : hardHighlight}
      >
        <Time time={statTime} />
      </Cell>
    );
  }
};

export default React.memo(TimeTableStatRow);
