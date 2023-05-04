import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons/faPlay";
import { faStop } from "@fortawesome/free-solid-svg-icons/faStop";

import Select from "../shared/Select";
import { types } from "../../constants/trainer";
import { Toolbar, ToolbarItem } from "../shared/Toolbar";
import Button, { ButtonIcon } from "../shared/Button";
import { getTrainingType, isInRehearsal } from "../../selectors/trainer";
import {
  changeTrainingType,
  startRehearsal,
  stopRehearsal,
} from "../../actions";

const TrainerOptions = () => {
  const dispatch = useDispatch();
  const trainingType = useSelector(getTrainingType);
  const inRehearsal = useSelector(isInRehearsal);
  const typeOptions = useMemo(
    () => types.map((type) => ({ label: type, value: type })),
    [types]
  );

  return (
    <>
      <Toolbar>
        <ToolbarItem>Train:</ToolbarItem>
        <ToolbarItem>
          <Select
            onChange={(type) => dispatch(changeTrainingType(type))}
            options={typeOptions}
            value={trainingType}
          />
        </ToolbarItem>
        <ToolbarItem>
          {inRehearsal ? (
            <Button
              size="sm"
              onClick={() => dispatch(stopRehearsal())}
              color="orange"
            >
              <ButtonIcon>
                <FontAwesomeIcon icon={faStop} />
              </ButtonIcon>
              Stop Rehearsal
            </Button>
          ) : (
            <Button
              size="sm"
              onClick={() => dispatch(startRehearsal())}
              color="subtleBg"
            >
              <ButtonIcon>
                <FontAwesomeIcon icon={faPlay} />
              </ButtonIcon>
              Start Rehearsal
            </Button>
          )}
        </ToolbarItem>
      </Toolbar>
    </>
  );
};

export default TrainerOptions;
