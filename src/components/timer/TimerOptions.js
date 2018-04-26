import React from 'react';
import PropTypes from 'prop-types';

import Selector from '../shared/Selector';
import puzzles from '../../constants/puzzles';

const TimerOptions = ({ changePuzzle, puzzle }) => (
  <div>
    <Selector
      label="Puzzle"
      onChange={changePuzzle}
      options={puzzles.map(({ name }) => ({ label: name, value: name }))}
      value={puzzle}
    />
  </div>
);

TimerOptions.propTypes = {
  changePuzzle: PropTypes.func.isRequired,
  puzzle: PropTypes.string.isRequired,
  toggleInspectionTime: PropTypes.func.isRequired,
  useInspectionTime: PropTypes.bool.isRequired
};

export default TimerOptions;
