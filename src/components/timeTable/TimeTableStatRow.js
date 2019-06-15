import PropTypes from 'prop-types';
import React from 'react';

import Time from '../shared/Time';
import { Cell } from '../shared/Table';
import { SubtleText } from '../shared/Typography';

const TimeTableStatRow = ({ name, current, best }) => (
  <tr key={name}>
    <Cell>
      <SubtleText>{name}</SubtleText>
    </Cell>
    <Cell>
      <strong>
        <Time
          time={{
            ms: current === 'DNF' ? Infinity : current,
            dnf: current === 'DNF'
          }}
        />
      </strong>
    </Cell>
    <Cell colSpan="2">
      {best && (
        <strong>
          <Time
            time={{
              ms: best === 'DNF' ? Infinity : best,
              dnf: best === 'DNF'
            }}
          />
        </strong>
      )}
    </Cell>
  </tr>
);

TimeTableStatRow.propTypes = {
  name: PropTypes.string.isRequired,
  current: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  best: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default React.memo(TimeTableStatRow);
