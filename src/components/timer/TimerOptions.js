import React from 'react';
import PropTypes from 'prop-types';
import faSyncAlt from '@fortawesome/fontawesome-pro-solid/faSyncAlt';
import styled from 'styled-components';

import InlineFontawesome from '../shared/InlineFontawesome';
import Select from '../shared/Select';
import Button from '../shared/Button';
import puzzles from '../../constants/puzzles';
import Shortcut from '../shared/Shortcut';
import { getSize } from '../../helpers/theme';
import { VisibleFrom, HiddenFrom } from '../shared/Visibility';

const TimerOptions = ({
  changeSetting,
  puzzle,
  refreshScramble,
  useInspectionTime,
  useManualTimeEntry
}) => (
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
    <VisibleFrom breakpoint="sm">
      <Toolbar>
        <Select
          label="Puzzle"
          onChange={puzzle => changeSetting('puzzle', puzzle)}
          options={puzzles.map(({ name, title }) => ({ label: title, value: name }))}
          value={puzzle}
        />
        <ButtonContainer>
          <Button size="sm" tag color="subtleBg" onClick={refreshScramble}>
            <InlineFontawesome fixedWidth icon={faSyncAlt} />
            Scramble
          </Button>
        </ButtonContainer>
      </Toolbar>
    </VisibleFrom>
    <HiddenFrom breakpoint="sm">
      <Toolbar>
        <Select
          onChange={puzzle => changeSetting('puzzle', puzzle)}
          options={puzzles.map(({ name, title }) => ({ label: title, value: name }))}
          value={puzzle}
        />
        <ButtonContainer>
          <Button size="sm" color="subtleBg" onClick={refreshScramble}>
            <InlineFontawesome fixedWidth icon={faSyncAlt} />
            Scramble
          </Button>
        </ButtonContainer>
      </Toolbar>
    </HiddenFrom>
  </>
);

const ButtonContainer = styled.span`
  margin-left: ${getSize('xs')};
  flex-grow: 1;
`;

const Toolbar = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
`;

TimerOptions.propTypes = {
  changeSetting: PropTypes.func.isRequired,
  puzzle: PropTypes.string.isRequired,
  refreshScramble: PropTypes.func.isRequired,
  useInspectionTime: PropTypes.bool.isRequired,
  useManualTimeEntry: PropTypes.bool.isRequired
};

export default React.memo(TimerOptions);
