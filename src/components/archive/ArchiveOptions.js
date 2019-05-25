import React from 'react';
import PropTypes from 'prop-types';

import Select from '../shared/Select';
import puzzles from '../../constants/puzzles';

const ArchiveOptions = ({ changePuzzle, puzzle }) => (
  <Select
    label="Puzzle"
    onChange={changePuzzle}
    options={puzzles.map(({ name }) => ({ label: name, value: name }))}
    value={puzzle}
  />
);

ArchiveOptions.propTypes = {
  changePuzzle: PropTypes.func.isRequired,
  puzzle: PropTypes.string.isRequired
};

export default ArchiveOptions;
