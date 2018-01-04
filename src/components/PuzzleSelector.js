import React from 'react';
import PropTypes from 'prop-types';

import Selector from './Selector';
import puzzles from '../constants/puzzles';

const PuzzleSelector = ({ changePuzzle, puzzle }) => (
  <Selector
    label="Puzzle"
    onChange={changePuzzle}
    options={puzzles.map(({ name }) => ({ label: name, value: name }))}
    value={puzzle}
  />
);

PuzzleSelector.propTypes = {
  changePuzzle: PropTypes.func.isRequired,
  puzzle: PropTypes.string.isRequired
};

export default PuzzleSelector;
