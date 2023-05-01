import PropTypes from "prop-types";
import React from "react";

import Time from "../shared/Time";
import { Cell } from "../shared/Table";
import { SubtleText } from "../shared/Typography";
import * as CustomPropTypes from "../../propTypes";

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
}) => {
  return (
    <tr key={name}>
      <Cell>
        <SubtleText>{name}</SubtleText>
      </Cell>
      {createStatCell(current, "current", best ? 1 : 3)}
      {best && createStatCell(best, "best", 2)}
    </tr>
  );

  function createStatCell(statTime, type, colSpan) {
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
          (isHardHighlighted && "blue") || (isSoftHighlighted && "grey")
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

TimeTableStatRow.propTypes = {
  name: PropTypes.string.isRequired,
  current: CustomPropTypes.StatTime.isRequired,
  best: CustomPropTypes.StatTime,
  onHardHighlight: PropTypes.func.isRequired,
  onSoftHighlight: PropTypes.func.isRequired,
  hardHighlightedStatName: PropTypes.string,
  hardHighlightedStatType: PropTypes.string,
  softHighlightedStatName: PropTypes.string,
  softHighlightedStatType: PropTypes.string,
};

export default React.memo(TimeTableStatRow);
