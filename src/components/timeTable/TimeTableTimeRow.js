import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Time from '../shared/Time';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons/faEllipsisH';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons/faThumbsUp';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import ToggleContent from '../shared/ToggleContent';
import Modal from '../shared/Modal';
import TimeDetails from '../shared/TimeDetails';
import * as CustomPropTypes from '../../propTypes';
import IconButton from '../shared/IconButton';
import { Cell } from '../shared/Table';
import { SubtleText } from '../shared/Typography';
import CloudSyncIcon from '../shared/CloudSyncIcon';
import { getColor, getSize } from '../../helpers/theme';

const TimeTableTimeRow = ({ index, time, removeTime, isIncluded, isExcluded }) => {
  const highlightColor = isIncluded ? 'blue' : isExcluded ? 'orange' : '';
  return (
    <tr>
      <Cell width="3rem" highlightColor={highlightColor}>
        <SubtleText>{index + 1}.</SubtleText>
      </Cell>
      <Cell highlightColor={highlightColor}>
        <Time time={time} />
        {time.best && (
          <TimeInfo>
            <BestTimeIcon>
              <FontAwesomeIcon icon={faThumbsUp} />
            </BestTimeIcon>
          </TimeInfo>
        )}
      </Cell>
      <Cell rightAlign highlightColor={highlightColor}>
        {time.stored && <CloudSyncIcon time={time} fixedWidth size="sm" />}
        <RemoveItemIconButton color="red" onClick={() => removeTime(time.id)}>
          <FontAwesomeIcon icon={faTimes} fixedWidth size="sm" />
        </RemoveItemIconButton>
        <ToggleContent
          toggle={({ show }) => (
            <ShowTimeButton onClick={show} color="subtleFg">
              <FontAwesomeIcon icon={faEllipsisH} fixedWidth size="sm" />
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
};

TimeTableTimeRow.propTypes = {
  time: CustomPropTypes.Time.isRequired,
  index: PropTypes.number.isRequired,
  removeTime: PropTypes.func.isRequired,
  isIncluded: PropTypes.bool,
  isExcluded: PropTypes.bool
};

const TimeInfo = styled.span`
  padding-left: 1rem;
  color: ${getColor('subtleFg')};
  font-size: 1.5rem;
`;

const BestTimeIcon = styled.span`
  color: ${getColor('green')};
`;

const ShowTimeButton = styled(IconButton)`
  margin-left: ${getSize('xs')};
`;

const RemoveItemIconButton = styled(IconButton)`
  margin-left: ${getSize('xs')};
`;

export default React.memo(TimeTableTimeRow);
