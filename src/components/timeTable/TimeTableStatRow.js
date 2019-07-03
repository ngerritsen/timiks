import PropTypes from 'prop-types';
import React from 'react';

import Time from '../shared/Time';
import { Cell } from '../shared/Table';
import { SubtleText } from '../shared/Typography';
import * as CustomPropTypes from '../../propTypes';

const TimeTableStatRow = ({ name, current, best, highlightIds }) => (
  <tr key={name}>
    <Cell>
      <SubtleText>{name}</SubtleText>
    </Cell>
    <Cell
      colSpan={best ? 1 : 3}
      onMouseEnter={() => current.ids && highlightIds(current.ids)}
      onMouseLeave={() => current.ids && highlightIds([])}
    >
      <strong>
        <Time time={current} />
      </strong>
    </Cell>
    {best && (
      <Cell
        colSpan={2}
        onMouseEnter={() => best.ids && highlightIds(best.ids)}
        onMouseLeave={() => best.ids && highlightIds([])}
      >
        <strong>
          <Time time={best} />
        </strong>
      </Cell>
    )}
  </tr>
);

TimeTableStatRow.propTypes = {
  name: PropTypes.string.isRequired,
  current: CustomPropTypes.StatTime.isRequired,
  best: CustomPropTypes.StatTime,
  highlightIds: PropTypes.func.isRequired
};

export default React.memo(TimeTableStatRow);
