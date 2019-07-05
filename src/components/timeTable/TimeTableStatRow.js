import PropTypes from 'prop-types';
import React from 'react';

import Time from '../shared/Time';
import { Cell } from '../shared/Table';
import { SubtleText } from '../shared/Typography';
import * as CustomPropTypes from '../../propTypes';

const TimeTableStatRow = ({
  name,
  current,
  best,
  onHighlight,
  onUnhighlight,
  highlightedStatName,
  highlightedStatType
}) => {
  return (
    <tr key={name}>
      <Cell>
        <SubtleText>{name}</SubtleText>
      </Cell>
      {createStatCell(current, 'current', best ? 1 : 3)}
      {best && createStatCell(best, 'best', 2)}
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

    const isHighlighted = highlightedStatName === name && highlightedStatType === type;
    const highlight = () => onHighlight([name, type]);

    return (
      <Cell
        bold
        colSpan={2}
        highlighted={isHighlighted}
        onMouseEnter={highlight}
        onMouseLeave={onUnhighlight}
        onTouchStart={isHighlighted ? onUnhighlight : highlight}
      >
        <Time time={best} />
      </Cell>
    );
  }
};

TimeTableStatRow.propTypes = {
  name: PropTypes.string.isRequired,
  current: CustomPropTypes.StatTime.isRequired,
  best: CustomPropTypes.StatTime,
  onHighlight: PropTypes.func.isRequired,
  onUnhighlight: PropTypes.func.isRequired,
  highlightedStatName: PropTypes.string,
  highlightedStatType: PropTypes.string
};

export default React.memo(TimeTableStatRow);
