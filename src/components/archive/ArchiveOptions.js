import React from 'react';
import PropTypes from 'prop-types';

import Selector from '../shared/Selector';
import puzzles from '../../constants/puzzles';

const ArchiveOptions = ({ changePuzzle, puzzle }) => (
  <div>
    <Selector
      label="Puzzle"
      onChange={changePuzzle}
      options={puzzles.map(({ name }) => ({ label: name, value: name }))}
      value={puzzle}
    />
  </div>
);

ArchiveOptions.propTypes = {
  changePuzzle: PropTypes.func.isRequired,
  puzzle: PropTypes.string.isRequired
};

export default ArchiveOptions;
