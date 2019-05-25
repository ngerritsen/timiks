import React from 'react';
import PropTypes from 'prop-types';
import { faSyncAlt } from '@fortawesome/fontawesome-pro-solid';

import InlineFontawesome from '../shared/InlineFontawesome';
import Select from '../shared/Select';
import Button from '../shared/Button';
import puzzles from '../../constants/puzzles';
import Shortcut from '../shared/Shortcut';

const TimerOptions = ({ changePuzzle, puzzle, refreshScramble }) => (
  <div>
    <Select
      label="Puzzle"
      onChange={changePuzzle}
      options={puzzles.map(({ name }) => ({ label: name, value: name }))}
      value={puzzle}
    />
    &nbsp; &nbsp;
    <Button tiny tag onClick={refreshScramble}>
      <Shortcut command="refreshScramble" action={refreshScramble} />
      <InlineFontawesome fixedWidth icon={faSyncAlt} />
      scramble
    </Button>
  </div>
);

TimerOptions.propTypes = {
  changePuzzle: PropTypes.func.isRequired,
  puzzle: PropTypes.string.isRequired,
  refreshScramble: PropTypes.func.isRequired
};

export default React.memo(TimerOptions);
