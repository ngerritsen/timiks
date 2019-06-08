import React from 'react';
import PropTypes from 'prop-types';

import Select from '../shared/Select';
import puzzles from '../../constants/puzzles';

const ArchiveOptions = ({ changeSetting, puzzle }) => (
  <Select
    label="Puzzle"
    onChange={puzzle => changeSetting('archivePuzzle', puzzle)}
    options={puzzles.map(({ name, title }) => ({ label: title, value: name }))}
    value={puzzle}
  />
);

ArchiveOptions.propTypes = {
  changeSetting: PropTypes.func.isRequired,
  puzzle: PropTypes.string.isRequired
};

export default ArchiveOptions;
