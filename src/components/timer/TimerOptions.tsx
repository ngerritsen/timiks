import React from "react";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons/faSyncAlt";
import { useDispatch, useSelector } from "react-redux";

import { getSettings } from "../../selectors/settings";
import Select from "../shared/Select";
import Button from "../shared/Button";
import puzzles from "../../constants/puzzles";
import Shortcut from "../shared/Shortcut";
import { VisibleFrom, HiddenFrom } from "../shared/Visibility";
import { ToolbarItem, Toolbar } from "../shared/Toolbar";
import { changeSetting } from "../../slices/settings";
import InlineFontawesome from "../shared/InlineFontawesome";
import { refreshScramble } from "../../slices/scramble";

const TimerOptions = () => {
  const { puzzle, useManualTimeEntry, useInspectionTime } =
    useSelector(getSettings);
  const dispatch = useDispatch();

  const scrambleButton = (
    <Button
      size="sm"
      color="subtleBg"
      onClick={() => dispatch(refreshScramble())}
    >
      <InlineFontawesome fixedWidth icon={faSyncAlt} />
      Scramble
    </Button>
  );

  const puzzleSelector = (
    <Select
      onChange={(puzzle) =>
        dispatch(changeSetting({ setting: "puzzle", value: puzzle }))
      }
      options={puzzles.map(({ name, title }) => ({
        label: title,
        value: name,
      }))}
      value={puzzle}
    />
  );

  return (
    <>
      <Shortcut
        command="refreshScramble"
        action={() => dispatch(refreshScramble())}
      />
      <Shortcut
        command="toggleInspectionTime"
        action={() =>
          changeSetting({
            setting: "useInspectionTime",
            value: !useInspectionTime,
          })
        }
      />
      <Shortcut
        command="toggleManualTimeEntry"
        action={() =>
          changeSetting({
            setting: "useManualTimeEntry",
            value: !useManualTimeEntry,
          })
        }
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

export default React.memo(TimerOptions);
