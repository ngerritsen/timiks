import React from 'react';
import PropTypes from 'prop-types';

import Selector from './Selector';
import puzzles from '../constants/puzzles';

const Settings = ({ changePuzzle, puzzle }) => (
  <Selector
    label="Puzzle"
    onChange={changePuzzle}
    options={puzzles.map(({ name }) => ({ label: name, value: name }))}
    value={puzzle}
  />
);

Settings.propTypes = {
  changePuzzle: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  puzzle: PropTypes.string.isRequired
};

export default Settings;
