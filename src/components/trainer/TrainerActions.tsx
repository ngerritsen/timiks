import React from "react";
import Button from "../shared/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  getActiveEnabledCases,
  getAvailableCaseIds,
} from "../../selectors/trainer";
import { deselectCases, selectCases } from "../../slices/trainer";

const TrainerActions = () => {
  const dispatch = useDispatch();
  const selectedCaseIds = useSelector(getActiveEnabledCases);
  const availableCaseIds = useSelector(getAvailableCaseIds);

  if (selectedCaseIds.length > 0) {
    return (
      <Button
        size="sm"
        color="subtleBg"
        tag
        onClick={() => dispatch(deselectCases(selectedCaseIds))}
      >
        Deselect all
      </Button>
    );
  }

  return (
    <Button
      size="sm"
      color="subtleBg"
      tag
      onClick={() => dispatch(selectCases(availableCaseIds))}
    >
      Select all
    </Button>
  );
};

export default TrainerActions;
