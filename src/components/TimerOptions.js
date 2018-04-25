import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Selector from './Selector';
import puzzles from '../constants/puzzles';

const TimerOptions = ({ changePuzzle, puzzle, toggleInspectionTime, useInspectionTime }) => (
  <div>
    <PuzzleOption>
      <Selector
        label="Puzzle"
        onChange={changePuzzle}
        options={puzzles.map(({ name }) => ({ label: name, value: name }))}
        value={puzzle}
      />
    </PuzzleOption>

    <InspectionOption>
      <InspectionCheck type="checkbox" onChange={toggleInspectionTime} checked={useInspectionTime}/>
      Inspection time
    </InspectionOption>
  </div>
);

const PuzzleOption = styled.span`
  display: inline-block;
  margin-bottom: ${props => props.theme.sizes.xs};
  margin-right: ${props => props.theme.sizes.md};
`;

const InspectionOption = styled.span`
  display: inline-block;
`;

const InspectionCheck = styled.input`
  margin-right: ${props => props.theme.sizes.xs};
  cursor: pointer;
`;


TimerOptions.propTypes = {
  changePuzzle: PropTypes.func.isRequired,
  puzzle: PropTypes.string.isRequired,
  toggleInspectionTime: PropTypes.func.isRequired,
  useInspectionTime: PropTypes.bool.isRequired
};

export default TimerOptions;
