import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Time from '../shared/Time';
import FontAwesome from '@fortawesome/react-fontawesome';
import faEllipsisH from '@fortawesome/fontawesome-pro-solid/faEllipsisH';
import faThumbsUp from '@fortawesome/fontawesome-pro-solid/faThumbsUp';
import faTimes from '@fortawesome/fontawesome-pro-solid/faTimes';
import ToggleContent from '../shared/ToggleContent';
import Modal from '../shared/Modal';
import TimeDetails from '../shared/TimeDetails';
import * as CustomPropTypes from '../../propTypes';
import IconButton from '../shared/IconButton';
import { Cell } from '../shared/Table';
import { SubtleText } from '../shared/Typography';
import CloudSyncIcon from '../shared/CloudSyncIcon';
import { getColor, getSize } from '../../helpers/theme';

const TimeTableTimeRow = ({ index, time, removeTime }) => (
  <tr>
    <TimeIndexCell>
      <SubtleText>{index + 1}.</SubtleText>
    </TimeIndexCell>
    <Cell>
      <Time time={time} />
      {time.best && (
        <TimeInfo>
          <BestTimeIcon>
            <FontAwesome icon={faThumbsUp} />
          </BestTimeIcon>
        </TimeInfo>
      )}
    </Cell>
    <Cell rightAlign>
      {time.stored && <CloudSyncIcon time={time} fixedWidth size="sm" />}
      <RemoveItemIconButton color="red" onClick={() => removeTime(time.id)}>
        <FontAwesome icon={faTimes} fixedWidth size="sm" />
      </RemoveItemIconButton>
      <ToggleContent
        toggle={({ show }) => (
          <ShowTimeButton onClick={show} color="subtleFg">
            <FontAwesome icon={faEllipsisH} fixedWidth size="sm" />
          </ShowTimeButton>
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
    </Cell>
  </tr>
);

TimeTableTimeRow.propTypes = {
  time: CustomPropTypes.Time.isRequired,
  index: PropTypes.number.isRequired,
  removeTime: PropTypes.func.isRequired
};

const TimeIndexCell = Cell.extend`
  width: 3rem;
`;

const TimeInfo = styled.span`
  padding-left: 1rem;
  color: ${getColor('subtleFg')};
  font-size: 1.5rem;
`;

const BestTimeIcon = styled.span`
  color: ${getColor('green')};
`;

const ShowTimeButton = IconButton.extend`
  margin-left: ${getSize('xs')};
`;

const RemoveItemIconButton = IconButton.extend`
  margin-left: ${getSize('xs')};
`;

export default React.memo(TimeTableTimeRow);
