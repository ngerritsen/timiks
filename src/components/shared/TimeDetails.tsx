import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons/faCalendarAlt";
import { faStopwatch } from "@fortawesome/free-solid-svg-icons/faStopwatch";
import { faCube } from "@fortawesome/free-solid-svg-icons/faCube";
import { faEye } from "@fortawesome/free-solid-svg-icons/faEye";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons/faPencilAlt";
import { faCommentAlt } from "@fortawesome/free-solid-svg-icons/faCommentAlt";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons/faEyeSlash";

import Time from "./Time";
import Section from "./Section";
import Scramble from "../scramble/Scramble";
import Button from "./Button";
import { ButtonDuo, ButtonDuoItem } from "./ButtonDuo";
import CloudSyncIcon from "./CloudSyncIcon";
import ToggleContent from "./ToggleContent";
import { getPuzzle } from "../../helpers/puzzle";
import { formatLocalDateTime } from "../../helpers/dateTime";
import { getSize, getBreakpoint } from "../../helpers/theme";
import EditComment from "../shared/EditComment";
import IconButton from "./IconButton";
import { Time as TimeType } from "../../types";

type TimeDetailsProps = {
  time: TimeType;
  onRemoveTime?: () => void;
  onClose: () => void;
};

const TimeDetails = ({ time, onRemoveTime, onClose }: TimeDetailsProps) => {
  return (
    <>
      <Section margin="md">
        <InfoItemGrid>
          {time.stored && (
            <InfoItem>
              <InfoItemIcon>
                <CloudSyncIcon fixedWidth time={time} />
              </InfoItemIcon>
              {time.dirty ? "Out of date" : "Stored"}
            </InfoItem>
          )}
          <InfoItem>
            <InfoItemIcon>
              <FontAwesomeIcon fixedWidth icon={faStopwatch} />
            </InfoItemIcon>
            <Time time={time} />
          </InfoItem>
          <InfoItem>
            <InfoItemIcon>
              <FontAwesomeIcon fixedWidth icon={faCalendarAlt} />
            </InfoItemIcon>
            {formatLocalDateTime(time.date)}
          </InfoItem>
          <InfoItem>
            <InfoItemIcon>
              <FontAwesomeIcon fixedWidth icon={faCube} />
            </InfoItemIcon>
            {getPuzzle(time.puzzle).title || "Unknown"}
          </InfoItem>
        </InfoItemGrid>

        <ToggleContent
          toggle={({ show }) => (
            <InfoItem>
              <InfoItemIcon>
                <FontAwesomeIcon fixedWidth icon={faCommentAlt} />
              </InfoItemIcon>
              {time.comment && (
                <>
                  {time.comment} &nbsp;
                  <IconButton color="subtleFg" onClick={show}>
                    <FontAwesomeIcon fixedWidth size="sm" icon={faPencilAlt} />
                  </IconButton>
                </>
              )}
              {!time.comment && (
                <>
                  <Button onClick={show} size="sm" tag color="subtleBg">
                    Add comment
                  </Button>
                </>
              )}
            </InfoItem>
          )}
          content={({ hide }) => <EditComment onCancel={hide} time={time} />}
        />
      </Section>
      <Section margin="md">
        <ToggleContent
          toggle={({ show, hide, isShown }) => (
            <Section margin={isShown ? "sm" : undefined}>
              <Button outline color="subtleFg" onClick={isShown ? hide : show}>
                <FontAwesomeIcon
                  fixedWidth
                  icon={isShown ? faEyeSlash : faEye}
                />{" "}
                &nbsp;
                {isShown ? "Hide" : "Show"} scramble
              </Button>
            </Section>
          )}
          content={() => (
            <Scramble
              small
              scramble={time.scramble}
              puzzle={time.puzzle}
              withPreview
            />
          )}
        />
      </Section>
      <Section>
        {onRemoveTime && (
          <ButtonDuo>
            <ButtonDuoItem>
              <Button onClick={onRemoveTime} color="red">
                Remove
              </Button>
            </ButtonDuoItem>
            <ButtonDuoItem>
              <Button onClick={onClose}>Close</Button>
            </ButtonDuoItem>
          </ButtonDuo>
        )}
        {!onRemoveTime && <Button onClick={onClose}>Close</Button>}
      </Section>
    </>
  );
};

const InfoItemGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  @media screen and (min-width: ${getBreakpoint("md")}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const InfoItem = styled.div`
  display: flex;
  margin-bottom: 1.2rem;
`;

const InfoItemIcon = styled.span`
  margin-right: ${getSize("xs")};
`;

export default TimeDetails;
