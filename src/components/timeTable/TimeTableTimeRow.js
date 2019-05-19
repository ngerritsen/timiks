import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Time from '../shared/Time';
import FontAwesome from '@fortawesome/react-fontawesome';
import { faInfoCircle, faThumbsUp, faTimes, faCloud, faCloudUpload } from '@fortawesome/fontawesome-pro-solid';
import ToggleContent from '../ToggleContent';
import Modal from '../shared/Modal';
import TimeDetails from './TimeDetails';
import * as CustomPropTypes from '../../propTypes';
import IconButton from '../shared/IconButton';
import { Cell } from '../shared/Tables';
import { SubtleText } from '../shared/Typography';
import WithAuthentication from '../../containers/WithAuthentication';

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
      <WithAuthentication>
        {({ isLoggedIn }) =>
          isLoggedIn ? (
            <SyncStatusIcon stored={time.stored}>
              <FontAwesome icon={time.stored && !time.dirty ? faCloud : faCloudUpload} size="sm" />
            </SyncStatusIcon>
          ) : null
        }
      </WithAuthentication>
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

const SyncStatusIcon = styled.span`
  margin-right: 0.8rem;
  color: ${props => (props.stored ? props.theme.colors.lightBlue : props.theme.colors.grey)};
`;

const RemoveItemIconButton = IconButton.extend`
  margin-left: 1rem;
  color: ${props => props.theme.colors.red};
`;

export default React.memo(TimeTableTimeRow);
