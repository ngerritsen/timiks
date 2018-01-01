import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import puzzles from '../constants/puzzles';

const Settings = ({ changePuzzle, puzzle }) => (
  <span>
    <label>Puzzle:</label>
    <Select value={puzzle} onChange={event => changePuzzle(event.target.value)}>
      {puzzles.map(({ name: puzzle }) =>
        <option key={puzzle} value={puzzle}>
          {puzzle}
        </option>
      )}
    </Select>
  </span>
);

Settings.propTypes = {
  changePuzzle: PropTypes.func.isRequired,
  closeSettings: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  openSettings: PropTypes.func.isRequired,
  puzzle: PropTypes.string.isRequired
};

const Select = styled.select`
  font-size: 1.6rem;
  margin-left: ${props => props.theme.sizes.sm};
`

export default Settings;
