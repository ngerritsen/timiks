import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAltLines } from '@fortawesome/pro-solid-svg-icons/faCommentAltLines';

import { formatLocalTime } from '../../helpers/dateTime';
import ToggleContent from '../shared/ToggleContent';
import Time from '../shared/Time';
import Tile from '../shared/Tile';
import TimeDetails from '../shared/TimeDetails';
import * as CustomPropTypes from '../../propTypes';
import Modal from '../shared/Modal';
import CloudSyncIcon from '../shared/CloudSyncIcon';
import { getColor } from '../../helpers/theme';

const ArchiveItem = ({ time, removeTime }) => (
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
            <FontAwesomeIcon icon={faCommentAltLines} fixedWidth size="xs" />
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
            removeTime(time.id);
          }}
        />
      </Modal>
    )}
  />
);

ArchiveItem.propTypes = {
  time: CustomPropTypes.Time.isRequired,
  removeTime: PropTypes.func.isRequired
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
  color: ${getColor('subtleFg')};
`;

const SyncStatusIcon = styled.span`
  position: absolute;
  font-size: 0.9em;
  top: 0.2rem;
  right: 0.5rem;
`;

export default ArchiveItem;
