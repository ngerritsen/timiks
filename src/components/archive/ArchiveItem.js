import React from 'react';
import { darken, lighten } from 'polished';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { formatLocalTime } from '../../helpers/dateTime';
import ToggleContent from '../shared/ToggleContent';
import Time from '../shared/Time';
import TimeDetails from '../shared/TimeDetails';
import * as CustomPropTypes from '../../propTypes';
import Modal from '../shared/Modal';
import CloudSyncIcon from '../shared/CloudSyncIcon';
import { getSize, getColor, isDark } from '../../helpers/theme';

const ArchiveItem = ({ time, removeTime }) => (
  <ToggleContent
    key={time.id}
    toggle={({ show }) => (
      <TimeTile onClick={show}>
        <TimeTileTime>
          <Time time={time} />
        </TimeTileTime>
        <DateTag>{formatLocalTime(time.date)}</DateTag>
        {time.stored && (
          <SyncStatusIcon>
            <CloudSyncIcon time={time} size="xs" />
          </SyncStatusIcon>
        )}
      </TimeTile>
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

const SyncStatusIcon = styled.span`
  position: absolute;
  font-size: 0.9em;
  top: 0.2rem;
  right: 0.5rem;
`;

const TimeTile = styled.div`
  position: relative;
  text-align: center;
  border: 1px solid ${getColor('grey')};
  padding: ${getSize('sm')};
  border-radius: 3px;
  cursor: pointer;

  :hover {
    background-color: ${props => (isDark(props) ? lighten : darken)(0.075, getColor('bg')(props))};
  }
`;

export default ArchiveItem;
