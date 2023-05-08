import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons/faEye";

import IconButton from "../shared/IconButton";
import Shortcut from "../shared/Shortcut";
import Modal from "../shared/Modal";
import ToggleContent from "../shared/ToggleContent";
import TrainerCaseDetails from "../trainer/TrainerCaseDetails";
import { buildFullCaseTitle } from "../../helpers/trainer";
import { Case, TrainingType } from "../../types";

type ScrambleCaseViewProps = {
  trainingCase: Case;
  trainingType: TrainingType;
};

const ScrambleCaseView = ({
  trainingCase,
  trainingType,
}: ScrambleCaseViewProps) => (
  <ToggleContent
    toggle={({ show, toggle }) => (
      <IconButton onClick={show}>
        <Shortcut command="showScramble" action={toggle} />
        <FontAwesomeIcon icon={faEye} />
      </IconButton>
    )}
    content={({ hide }) => (
      <Modal
        title={buildFullCaseTitle(trainingCase, trainingType)}
        onClose={hide}
      >
        <TrainerCaseDetails
          trainingCase={trainingCase}
          trainingType={trainingType}
        />
      </Modal>
    )}
  />
);

export default ScrambleCaseView;
