import React from "react";

import Select from "../shared/Select";
import puzzles from "../../constants/puzzles";
import { VisibleFrom, HiddenFrom } from "../shared/Visibility";
import Export from "./Export";
import Section from "../shared/Section";
import { ARCHIVE_DAYS_OPTIONS } from "../../constants/settings";
import { Toolbar, ToolbarItem } from "../shared/Toolbar";
import Import from "./Import";
import { useDispatch, useSelector } from "react-redux";
import { getSortedFilteredArchivedTimes } from "../../selectors/times";
import { getArchiveDays, getArchivePuzzle } from "../../selectors/settings";
import { changeSetting } from "../../slices/settings";

const puzzleOptions = puzzles.map(({ name, title }) => ({
  label: title,
  value: name,
}));

const ArchiveOptions = () => {
  const times = useSelector(getSortedFilteredArchivedTimes);
  const puzzle = useSelector(getArchivePuzzle);
  const days = useSelector(getArchiveDays);
  const dispatch = useDispatch();

  const puzzleSelector = (
    <Select
      onChange={(puzzle) =>
        dispatch(changeSetting({ setting: "archivePuzzle", value: puzzle }))
      }
      options={puzzleOptions}
      value={puzzle}
    />
  );
  const daySelector = (
    <Select
      onChange={(days) =>
        dispatch(changeSetting({ setting: "archiveDays", value: days }))
      }
      numeric
      options={ARCHIVE_DAYS_OPTIONS}
      value={days}
    />
  );
  const exportButton = <Export puzzle={puzzle} times={times} />;
  const importButton = <Import />;

  return (
    <>
      <HiddenFrom breakpoint="md">
        <Section margin="xs">
          <Toolbar>
            <ToolbarItem grow>{puzzleSelector}</ToolbarItem>
            <ToolbarItem grow>{daySelector}</ToolbarItem>
          </Toolbar>
        </Section>
        <Toolbar>
          <ToolbarItem grow>{exportButton}</ToolbarItem>
          <ToolbarItem grow>{importButton}</ToolbarItem>
        </Toolbar>
      </HiddenFrom>
      <VisibleFrom breakpoint="md">
        <Toolbar>
          <ToolbarItem>{puzzleSelector}</ToolbarItem>
          <ToolbarItem>{daySelector}</ToolbarItem>
          <ToolbarItem shrink>{exportButton}</ToolbarItem>
          <ToolbarItem shrink>{importButton}</ToolbarItem>
        </Toolbar>
      </VisibleFrom>
    </>
  );
};

export default ArchiveOptions;
