import React from 'react';
import PropTypes from 'prop-types';

import Select from '../shared/Select';
import puzzles from '../../constants/puzzles';
import { VisibleFrom, HiddenFrom } from '../shared/Visibility';
import * as CustomPropTypes from '../../propTypes';
import Export from './Export';
import Section from '../shared/Section';
import { ARCHIVE_DAYS_OPTIONS } from '../../constants/app';
import { Toolbar, ToolbarItem } from '../shared/Toolbar';

const puzzleOptions = puzzles.map(({ name, title }) => ({ label: title, value: name }));

const ArchiveOptions = ({ changeSetting, puzzle, times, days }) => {
  const puzzleSelector = (
    <Select
      onChange={puzzle => changeSetting('archivePuzzle', puzzle)}
      options={puzzleOptions}
      value={puzzle}
    />
  );
  const daySelector = (
    <Select
      onChange={days => changeSetting('archiveDays', days)}
      numeric
      options={ARCHIVE_DAYS_OPTIONS}
      value={days}
    />
  );
  const exportButton = <Export puzzle={puzzle} times={times} />;

  return (
    <>
      <HiddenFrom breakpoint="sm">
        <Section margin="xs">
          <Toolbar>
            <ToolbarItem grow>{puzzleSelector}</ToolbarItem>
            <ToolbarItem grow>{daySelector}</ToolbarItem>
          </Toolbar>
        </Section>
        {exportButton}
      </HiddenFrom>
      <VisibleFrom breakpoint="sm">
        <Toolbar>
          <ToolbarItem>{puzzleSelector}</ToolbarItem>
          <ToolbarItem>{daySelector}</ToolbarItem>
          <ToolbarItem shrink>{exportButton}</ToolbarItem>
        </Toolbar>
      </VisibleFrom>
    </>
  );
};

ArchiveOptions.propTypes = {
  changeSetting: PropTypes.func.isRequired,
  puzzle: PropTypes.string.isRequired,
  times: PropTypes.arrayOf(CustomPropTypes.Time).isRequired,
  days: PropTypes.number
};

export default ArchiveOptions;
