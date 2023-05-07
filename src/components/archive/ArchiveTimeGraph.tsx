import React from "react";
import TimeGraph from "../../components/shared/TimeGraph";
import { useDispatch, useSelector } from "react-redux";
import { getDisabledArchiveGraphLines } from "../../selectors/settings";
import { changeSetting } from "../../slices/settings";
import {
  getArchivedTimes,
  getStatsForArchivedTimesForPuzzle,
} from "../../selectors/times";

const ArchiveTimeGraph = () => {
  const disabledLines = useSelector(getDisabledArchiveGraphLines);
  const dispatch = useDispatch();
  const times = useSelector(getArchivedTimes);
  const stats = useSelector(getStatsForArchivedTimesForPuzzle);

  return (
    <TimeGraph
      times={times}
      stats={stats}
      disabledLines={disabledLines}
      setDisabledLines={(lines) => {
        dispatch(
          changeSetting({
            setting: "disabledArchiveGraphLines",
            value: lines,
          })
        );
      }}
    />
  );
};

export default ArchiveTimeGraph;
