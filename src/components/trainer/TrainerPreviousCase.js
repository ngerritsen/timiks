import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo } from "@fortawesome/free-solid-svg-icons/faUndo";
import { faHistory } from "@fortawesome/free-solid-svg-icons/faHistory";
import { transparentize } from "polished";
import { useDispatch, useSelector } from "react-redux";

import TrainerCaseDetails from "./TrainerCaseDetails";
import ToggleContent from "../shared/ToggleContent";
import LastLayerPreview from "../cube/LastLayerPreview";
import Modal from "../shared/Modal";
import { buildFullCaseTitle } from "../../helpers/trainer";
import { getSize, getColor } from "../../helpers/theme";
import Section from "../shared/Section";
import Link from "../shared/Link";
import Shortcut from "../shared/Shortcut";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { retryCase, reQueueCase } from "../../actions";
import {
  getTrainingType,
  getLastCase,
  isInRehearsal as getIsInRehearsal,
  isQueued as getIsQueued,
  getCurrentCaseId,
} from "../../selectors/trainer";

const TrainerPreviousCase = () => {
  const dispatch = useDispatch();
  const trainingType = useSelector(getTrainingType);
  const lastCase = useSelector(getLastCase);
  const isInRehearsal = useSelector(getIsInRehearsal);
  const isQueued = useSelector(getIsQueued);
  const currentCaseId = useSelector(getCurrentCaseId);

  return lastCase ? (
    <ToggleContent
      toggle={({ show }) => (
        <PreviousCase>
          <PreviousCasePreview onClick={show}>
            <LastLayerPreview
              previewArrows={lastCase.previewArrows}
              previewString={lastCase.preview}
            />
          </PreviousCasePreview>
          <PreviousCaseContent>
            <Section>
              Last case: <strong>{lastCase.name}</strong>
            </Section>
            <Section>
              {!isInRehearsal &&
                (!lastCase || lastCase.id !== currentCaseId) && (
                  <>
                    <Shortcut
                      command="retryCase"
                      action={() =>
                        dispatch(retryCase(trainingType, lastCase.id))
                      }
                    />
                    <Link
                      href="#"
                      onClick={(event) => {
                        event.preventDefault();
                        dispatch(retryCase(trainingType, lastCase.id));
                      }}
                    >
                      <FontAwesomeIcon size="sm" icon={faUndo} /> Retry
                    </Link>
                  </>
                )}
              {!isInRehearsal && lastCase && lastCase.id === currentCaseId && (
                <Confirmation>
                  <FontAwesomeIcon size="sm" icon={faCheck} /> Retrying
                </Confirmation>
              )}
              {isInRehearsal && !isQueued && (
                <>
                  <Shortcut
                    command="reQueueCase"
                    action={() =>
                      dispatch(reQueueCase(trainingType, lastCase.id))
                    }
                  />
                  <Link
                    href="#"
                    onClick={(event) => {
                      event.preventDefault();
                      dispatch(reQueueCase(trainingType, lastCase.id));
                    }}
                  >
                    <FontAwesomeIcon size="sm" icon={faHistory} /> Re-queue
                  </Link>
                </>
              )}
              {isInRehearsal && isQueued && (
                <Confirmation>
                  <FontAwesomeIcon size="sm" icon={faCheck} /> Queued
                </Confirmation>
              )}
            </Section>
          </PreviousCaseContent>
        </PreviousCase>
      )}
      content={({ hide }) => (
        <Modal
          onClose={hide}
          title={buildFullCaseTitle(lastCase, trainingType)}
        >
          <TrainerCaseDetails
            trainingType={trainingType}
            trainingCase={lastCase}
          />
        </Modal>
      )}
    />
  ) : null;
};

const Confirmation = styled.span`
  font-size: 1.4rem;
  margin: ${getSize("xs")} 0 0;
  color: ${getColor("subtleFg")};
`;

const PreviousCaseContent = styled.div`
  text-align: left;
  padding-right: ${getSize("xxs")};
`;

const PreviousCase = styled.div`
  display: inline-flex;
  padding: ${getSize("xs")};
  border: 1px solid ${getColor("subtleBg")};
  border-radius: 0.3rem;
`;

const PreviousCasePreview = styled.div`
  width: 4.6rem;
  height: 4.6rem;
  margin-right: ${getSize("sm")};
  cursor: pointer;
  border-radius: 0.3rem;
  padding: 2px;

  &:hover,
  &:focus {
    background-color: ${(props) =>
      transparentize(0.5, getColor("subtleBg")(props))};
  }
`;

export default TrainerPreviousCase;
