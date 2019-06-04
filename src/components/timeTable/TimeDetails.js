import React from 'react';
import FontAwesome from '@fortawesome/react-fontawesome';
import faCalendarAlt from '@fortawesome/fontawesome-pro-solid/faCalendarAlt';
import faStopwatch from '@fortawesome/fontawesome-pro-solid/faStopwatch';
import faCube from '@fortawesome/fontawesome-pro-solid/faCube';
import faEye from '@fortawesome/fontawesome-pro-solid/faEye';
import faEyeSlash from '@fortawesome/fontawesome-pro-solid/faEyeSlash';
import PropTypes from 'prop-types';

import * as CustomPropTypes from '../../propTypes';
import Time from '../shared/Time';
import Section from '../shared/Section';
import Scramble from '../scramble/Scramble';
import Button from '../shared/Button';
import { ButtonDuo, ButtonDuoItem } from '../shared/ButtonDuo';
import CloudSyncIcon from '../shared/CloudSyncIcon';
import ToggleContent from '../ToggleContent';
import { getPuzzle } from '../../helpers/puzzle';
import { formatLocalDateTime } from '../../helpers/dateTime';

const TimeDetails = ({ time, onRemoveTime, onClose }) => (
  <div>
    {time.stored && (
      <Section margin="sm">
        <CloudSyncIcon fixedWidth time={time} /> &nbsp;
        {time.dirty ? 'Out of date' : 'Stored'}
      </Section>
    )}
    <Section margin="sm">
      <FontAwesome fixedWidth icon={faStopwatch} /> &nbsp;
      <Time time={time} />
    </Section>
    <Section margin="sm">
      <FontAwesome fixedWidth icon={faCalendarAlt} /> &nbsp;
      {formatLocalDateTime(time.date)}
    </Section>
    <Section margin="md">
      <FontAwesome fixedWidth icon={faCube} /> &nbsp;
      {getPuzzle(time.puzzle).title || 'Unknown'}
    </Section>
    <Section margin="sm">
      <ToggleContent
        toggle={({ show, hide, isShown }) => (
          <Section margin={isShown ? 'sm' : ''}>
            <Button empty neutral onClick={isShown ? hide : show}>
              <FontAwesome fixedWidth icon={isShown ? faEyeSlash : faEye} /> &nbsp;
              {isShown ? 'Hide' : 'Show'} scramble
            </Button>
          </Section>
        )}
        content={() => <Scramble small scramble={time.scramble} puzzle={time.puzzle} withPreview />}
      />
    </Section>
    <Section>
      <ButtonDuo>
        <ButtonDuoItem>
          <Button onClick={onRemoveTime} danger>
            Remove
          </Button>
        </ButtonDuoItem>
        <ButtonDuoItem>
          <Button onClick={onClose}>Close</Button>
        </ButtonDuoItem>
      </ButtonDuo>
    </Section>
  </div>
);

TimeDetails.propTypes = {
  time: CustomPropTypes.Time.isRequired,
  onRemoveTime: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

export default TimeDetails;
