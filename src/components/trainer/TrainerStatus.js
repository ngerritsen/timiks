import React from "react";

import {
  getTrainingType,
  isInRehearsal,
  getActiveEnabledCases,
  getSelectedCaseIds,
  getRemainingRehearsalCaseIds,
} from "../../selectors/trainer";
import Tag from "../shared/Tag";
import { useSelector } from "react-redux";

const TrainerStatus = () => {
  const trainingType = useSelector(getTrainingType);
  const inRehearsal = useSelector(isInRehearsal);
  const enabledCases = useSelector(getActiveEnabledCases).length;
  const trainingCases = useSelector(getSelectedCaseIds).length;
  const remainingRehearsalCases = useSelector(
    getRemainingRehearsalCaseIds
  ).length;

  return (
    <Tag color={inRehearsal ? "blue" : "subtleBg"}>
      {!inRehearsal &&
        (() => {
          switch (enabledCases) {
            case 0:
              return `${trainingType} - Training all cases`;
            case 1:
              return `${trainingType} - Training 1 case`;
            default:
              return `${trainingType} - Training ${enabledCases} cases`;
          }
        })()}
      {inRehearsal &&
        `${trainingType} - Rehearsing ${
          trainingCases - remainingRehearsalCases
        } / ${trainingCases} cases`}
    </Tag>
  );
};

export default TrainerStatus;
