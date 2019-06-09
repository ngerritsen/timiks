import React from 'react';
import PropTypes from 'prop-types';
import faSyncAlt from '@fortawesome/fontawesome-pro-solid/faSyncAlt';
import styled from 'styled-components';

import InlineFontawesome from '../shared/InlineFontawesome';
import Select from '../shared/Select';
import Button from '../shared/Button';
import puzzles from '../../constants/puzzles';
import Shortcut from '../shared/Shortcut';

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
    <Desktop>
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
    </Desktop>
    <Mobile>
      <Select
        onChange={puzzle => changeSetting('puzzle', puzzle)}
        options={puzzles.map(({ name, title }) => ({ label: title, value: name }))}
        value={puzzle}
      />
      <ButtonContainer>
        <Button size="sm" color="dark" onClick={refreshScramble}>
          <InlineFontawesome fixedWidth icon={faSyncAlt} />
          Scramble
        </Button>
      </ButtonContainer>
    </Mobile>
  </>
);

const ButtonContainer = styled.span`
  margin-left: ${props => props.theme.sizes.xs};
  flex-grow: 1;
`;

const Desktop = styled.div`
  display: none;

  @media screen and (min-width: 420px) {
    display: flex;
    align-items: center;
  }
`;

const Mobile = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;

  @media screen and (min-width: 420px) {
    display: none;
  }
`;

TimerOptions.propTypes = {
  changeSetting: PropTypes.func.isRequired,
  puzzle: PropTypes.string.isRequired,
  refreshScramble: PropTypes.func.isRequired,
  useInspectionTime: PropTypes.bool.isRequired,
  useManualTimeEntry: PropTypes.bool.isRequired
};

export default React.memo(TimerOptions);
