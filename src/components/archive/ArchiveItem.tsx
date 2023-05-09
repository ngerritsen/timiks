import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentAlt } from "@fortawesome/free-solid-svg-icons/faCommentAlt";

import { formatLocalTime } from "../../helpers/dateTime";
import ToggleContent from "../shared/ToggleContent";
import Time from "../shared/Time";
import Tile from "../shared/Tile";
import TimeDetails from "../shared/TimeDetails";
import Modal from "../shared/Modal";
import CloudSyncIcon from "../shared/CloudSyncIcon";
import { getColor } from "../../helpers/theme";
import { Time as TimeType } from "../../types";
import { useDispatch } from "react-redux";
import { removeTime } from "../../actions";

type ArchiveItemProps = {
  time: TimeType;
};

const ArchiveItem = ({ time }: ArchiveItemProps) => {
  const dispatch = useDispatch();

  return (
    <ToggleContent
      key={time.id}
      toggle={({ show }) => (
        <Tile onClick={show}>
          <TimeTileTime>
            <Time time={time} />
          </TimeTileTime>
          <DateTag>{formatLocalTime(time.date)}</DateTag>
          {time.stored && (
            <SyncStatusIcon>
              <CloudSyncIcon time={time} size="xs" />
            </SyncStatusIcon>
          )}
          {time.comment && (
            <CommentIcon>
              <FontAwesomeIcon icon={faCommentAlt} fixedWidth size="xs" />
            </CommentIcon>
          )}
        </Tile>
      )}
      content={({ hide }) => (
        <Modal title="Details" onClose={hide}>
          <TimeDetails
            time={time}
            onClose={hide}
            onRemoveTime={() => {
              hide();
              dispatch(removeTime(time.id));
            }}
          />
        </Modal>
      )}
    />
  );
};

const TimeTileTime = styled.strong`
  position: relative;
  top: 0.3rem;
`;

const DateTag = styled.div`
  font-size: 0.7em;
  opacity: 0.7;
  margin-top: 0.3rem;
`;

const CommentIcon = styled.span`
  position: absolute;
  font-size: 0.9em;
  bottom: 0.2rem;
  right: 0.5rem;
  color: ${getColor("subtleFg")};
`;

const SyncStatusIcon = styled.span`
  position: absolute;
  font-size: 0.9em;
  top: 0.2rem;
  right: 0.5rem;
`;

export default ArchiveItem;
