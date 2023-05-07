import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStopwatch } from "@fortawesome/free-solid-svg-icons/faStopwatch";
import { faFlask } from "@fortawesome/free-solid-svg-icons/faFlask";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import Time from "../shared/Time";
import Section from "../shared/Section";
import { getColor } from "../../helpers/theme";
import Button from "../shared/Button";
import ToggleContent from "../shared/ToggleContent";
import Modal from "../shared/Modal";
import { buildFullCaseTitle } from "../../helpers/trainer";
import { ButtonDuo, ButtonDuoItem } from "../shared/ButtonDuo";
import { removeTrainerTime } from "../../slices/trainer";
import { Case, TrainingTime, TrainingType } from "../../types";

type TrainerTimeProps = {
  trainingCase: Case;
  trainerTime: TrainingTime;
  trainingType: TrainingType;
};

const TrainerTime = ({
  trainerTime,
  trainingType,
  trainingCase,
}: TrainerTimeProps) => {
  const dispatch = useDispatch();

  return (
    <ToggleContent
      toggle={({ show }) => (
        <TrainerTimeTime onClick={show}>
          <Time time={trainerTime} />
        </TrainerTimeTime>
      )}
      content={({ hide }) => (
        <Modal title="Remove trainer time" onClose={hide}>
          <Section margin="md">
            <Section margin="sm">
              <FontAwesomeIcon icon={faFlask} fixedWidth />{" "}
              {buildFullCaseTitle(trainingCase, trainingType)}
            </Section>
            <Section margin="sm">
              <FontAwesomeIcon icon={faStopwatch} fixedWidth />{" "}
              <Time time={trainerTime} />
            </Section>
          </Section>
          <ButtonDuo>
            <ButtonDuoItem>
              <Button onClick={hide} outline color="subtleFg">
                Cancel
              </Button>
            </ButtonDuoItem>
            <ButtonDuoItem>
              <Button
                color="red"
                onClick={() => {
                  dispatch(removeTrainerTime(trainerTime.id));
                  hide();
                }}
              >
                Remove
              </Button>
            </ButtonDuoItem>
          </ButtonDuo>
        </Modal>
      )}
    />
  );
};

const TrainerTimeTime = styled.span`
  cursor: pointer;

  &:hover,
  &:focus {
    border-bottom: 1px solid ${getColor("fg")};
  }
`;

export default React.memo(TrainerTime);
