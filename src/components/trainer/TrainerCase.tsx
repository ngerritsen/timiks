import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import Tile from "../shared/Tile";
import LastLayerPreview from "../cube/LastLayerPreview";
import { getColor } from "../../helpers/theme";
import Section from "../shared/Section";
import ToggleContent from "../shared/ToggleContent";
import Modal from "../shared/Modal";
import TrainerCaseDetails from "./TrainerCaseDetails";
import Link from "../shared/Link";
import { buildFullCaseTitle } from "../../helpers/trainer";
import { deselectCase, selectCase } from "../../slices/trainer";
import { Case, TrainingType } from "../../types";

type TrainerCaseProps = {
  trainingCase: Case;
  trainingType: TrainingType;
};

const TrainerCase = ({ trainingCase, trainingType }: TrainerCaseProps) => {
  const dispatch = useDispatch();

  return (
    <Tile
      key={trainingCase.id}
      selected={trainingCase.selected}
      onClick={() =>
        dispatch(
          trainingCase.selected
            ? deselectCase(trainingCase.id)
            : selectCase(trainingCase.id)
        )
      }
    >
      <Section margin="xs">
        <LastLayerPreview
          previewString={trainingCase.preview}
          previewArrows={trainingCase.previewArrows}
        />
      </Section>
      <Section>
        <CaseName>
          <strong>{trainingCase.name}</strong>
          {trainingType === "OLL" && <CaseId> - #{trainingCase.id}</CaseId>}
        </CaseName>
      </Section>
      <ToggleContent
        toggle={({ show }) => (
          <Link
            href="#"
            onClick={(event) => {
              event.stopPropagation();
              event.preventDefault();
              show();
            }}
          >
            Show info
          </Link>
        )}
        content={({ hide }) => (
          <Modal
            onClose={hide}
            title={buildFullCaseTitle(trainingCase, trainingType)}
          >
            <TrainerCaseDetails
              trainingCase={trainingCase}
              trainingType={trainingType}
            />
          </Modal>
        )}
      />
    </Tile>
  );
};

const CaseName = styled.span`
  margin: 0;
  font-size: 1.4rem;
`;

const CaseId = styled.span`
  color: ${getColor("subtleFg")};
`;

export default React.memo(TrainerCase);
