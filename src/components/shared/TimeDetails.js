import React from 'react';
import FontAwesome from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import faCalendarAlt from '@fortawesome/fontawesome-pro-solid/faCalendarAlt';
import faStopwatch from '@fortawesome/fontawesome-pro-solid/faStopwatch';
import faCube from '@fortawesome/fontawesome-pro-solid/faCube';
import faEye from '@fortawesome/fontawesome-pro-solid/faEye';
import faPencil from '@fortawesome/fontawesome-pro-solid/faPencil';
import faCommentAltLines from '@fortawesome/fontawesome-pro-solid/faCommentAltLines';
import faEyeSlash from '@fortawesome/fontawesome-pro-solid/faEyeSlash';
import PropTypes from 'prop-types';

import * as CustomPropTypes from '../../propTypes';
import Time from './Time';
import Section from './Section';
import Scramble from '../scramble/Scramble';
import Button from './Button';
import { ButtonDuo, ButtonDuoItem } from './ButtonDuo';
import CloudSyncIcon from './CloudSyncIcon';
import ToggleContent from './ToggleContent';
import { getPuzzle } from '../../helpers/puzzle';
import { formatLocalDateTime } from '../../helpers/dateTime';
import { getSize, getBreakpoint } from '../../helpers/theme';
import EditCommentContainer from '../../containers/EditCommentContainer';
import IconButton from './IconButton';

const TimeDetails = ({ time, onRemoveTime, onClose }) => {
  return (
    <div>
      <Section margin="md">
        <InfoItemGrid>
          {time.stored && (
            <InfoItem margin="sm">
              <InfoItemIcon>
                <CloudSyncIcon fixedWidth time={time} />
              </InfoItemIcon>
              {time.dirty ? 'Out of date' : 'Stored'}
            </InfoItem>
          )}
          <InfoItem margin="sm">
            <InfoItemIcon>
              <FontAwesome fixedWidth icon={faStopwatch} />
            </InfoItemIcon>
            <Time time={time} />
          </InfoItem>
          <InfoItem margin="sm">
            <InfoItemIcon>
              <FontAwesome fixedWidth icon={faCalendarAlt} />
            </InfoItemIcon>
            {formatLocalDateTime(time.date)}
          </InfoItem>
          <InfoItem margin="sm">
            <InfoItemIcon>
              <FontAwesome fixedWidth icon={faCube} />
            </InfoItemIcon>
            {getPuzzle(time.puzzle).title || 'Unknown'}
          </InfoItem>
        </InfoItemGrid>

        <ToggleContent
          toggle={({ show }) => (
            <InfoItem margin="md">
              <InfoItemIcon>
                <FontAwesome fixedWidth icon={faCommentAltLines} />
              </InfoItemIcon>
              {time.comment && (
                <>
                  {time.comment} &nbsp;
                  <IconButton color="subtleFg" onClick={show}>
                    <FontAwesome fixedWidth size="sm" icon={faPencil} />
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
          content={({ hide }) => <EditCommentContainer onCancel={hide} time={time} />}
        />
      </Section>
      <Section margin="md">
        <ToggleContent
          toggle={({ show, hide, isShown }) => (
            <Section margin={isShown ? 'sm' : ''}>
              <Button outline color="subtleFg" onClick={isShown ? hide : show}>
                <FontAwesome fixedWidth icon={isShown ? faEyeSlash : faEye} /> &nbsp;
                {isShown ? 'Hide' : 'Show'} scramble
              </Button>
            </Section>
          )}
          content={() => (
            <Scramble small scramble={time.scramble} puzzle={time.puzzle} withPreview />
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
    </div>
  );
};

const InfoItemGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  @media screen and (min-width: ${getBreakpoint('md')}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const InfoItem = styled.div`
  display: flex;
  margin-bottom: 1.2rem;
`;

const InfoItemIcon = styled.span`
  margin-right: ${getSize('xs')};
`;

TimeDetails.propTypes = {
  time: CustomPropTypes.Time.isRequired,
  onRemoveTime: PropTypes.func,
  onClose: PropTypes.func.isRequired
};

export default TimeDetails;
