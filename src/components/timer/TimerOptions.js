import React from 'react';
import PropTypes from 'prop-types';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons/faSyncAlt';

import InlineFontawesome from '../shared/InlineFontawesome';
import Select from '../shared/Select';
import Button from '../shared/Button';
import puzzles from '../../constants/puzzles';
import Shortcut from '../shared/Shortcut';
import { VisibleFrom, HiddenFrom } from '../shared/Visibility';
import { ToolbarItem, Toolbar } from '../shared/Toolbar';

const TimerOptions = ({
  changeSetting,
  puzzle,
  refreshScramble,
  useInspectionTime,
  useManualTimeEntry
}) => {
  const scrambleButton = (
    <Button size="sm" color="subtleBg" onClick={refreshScramble}>
      <InlineFontawesome fixedWidth icon={faSyncAlt} />
      Scramble
    </Button>
  );

  const puzzleSelector = (
    <Select
      onChange={puzzle => changeSetting('puzzle', puzzle)}
      options={puzzles.map(({ name, title }) => ({ label: title, value: name }))}
      value={puzzle}
    />
  );

  return (
    <>
      <Shortcut command="refreshScramble" action={refreshScramble} />
      <Shortcut
        command="toggleInspectionTime"
        action={() => changeSetting('useInspectionTime', !useInspectionTime)}
      />
      <Shortcut
        command="toggleManualTimeEntry"
        action={() => changeSetting('useManualTimeEntry', !useManualTimeEntry)}
      />
      <HiddenFrom breakpoint="sm">
        <Toolbar>
          <ToolbarItem grow>{puzzleSelector}</ToolbarItem>
          <ToolbarItem grow>{scrambleButton}</ToolbarItem>
        </Toolbar>
      </HiddenFrom>
      <VisibleFrom breakpoint="sm">
        <Toolbar>
          <ToolbarItem>{puzzleSelector}</ToolbarItem>
          <ToolbarItem shrink>{scrambleButton}</ToolbarItem>
        </Toolbar>
      </VisibleFrom>
    </>
  );
};

TimerOptions.propTypes = {
  changeSetting: PropTypes.func.isRequired,
  puzzle: PropTypes.string.isRequired,
  refreshScramble: PropTypes.func.isRequired,
  useInspectionTime: PropTypes.bool,
  useManualTimeEntry: PropTypes.bool
};

export default React.memo(TimerOptions);
