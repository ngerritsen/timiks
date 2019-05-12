import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Time from '../shared/Time';
import FontAwesome from '@fortawesome/react-fontawesome';
import { faInfoCircle, faThumbsUp, faTimes } from '@fortawesome/fontawesome-pro-solid';
import ToggleContent from '../ToggleContent';
import Modal from '../shared/Modal';
import TimeDetails from './TimeDetails';
import * as CustomPropTypes from '../../propTypes';
import IconButton from '../shared/IconButton';
import { Cell } from '../shared/Tables';
import { SubtleText } from '../shared/Typography';

const TimeTableTimeRow = ({ index, time, removeTime }) => (
  <tr>
    <Cell>
      <SubtleText>{index + 1}.</SubtleText>
    </Cell>
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
      <ToggleContent
        toggle={({ show }) => (
          <InfoIconButton onClick={show}>
            <FontAwesome icon={faInfoCircle} size="sm" />
          </InfoIconButton>
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
      <RemoveItemIconButton onClick={() => removeTime(time.id)}>
        <FontAwesome icon={faTimes} size="sm" />
      </RemoveItemIconButton>
    </Cell>
  </tr>
);

TimeTableTimeRow.propTypes = {
  time: CustomPropTypes.Time.isRequired,
  index: PropTypes.number.isRequired,
  removeTime: PropTypes.func.isRequired
};

const TimeInfo = styled.small`
  padding-left: ${props => props.theme.sizes.xs};
  color: ${props => props.theme.colors.subtleFg};
  font-size: 1.5rem;
`;

const BestTimeIcon = styled.span`
  color: ${props => props.theme.colors.green};
`;

const InfoIconButton = IconButton.extend`
  color: ${props => props.theme.colors.blue};
`;

const RemoveItemIconButton = IconButton.extend`
  margin-left: 1rem;
  color: ${props => props.theme.colors.red};
`;

export default React.memo(TimeTableTimeRow);
