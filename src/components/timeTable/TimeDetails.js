import React from 'react';
import FontAwesome from '@fortawesome/react-fontawesome';
import {
  faCalendarAlt,
  faStopwatch,
  faCube,
  faEye,
  faEyeSlash
} from '@fortawesome/fontawesome-pro-solid';
import PropTypes from 'prop-types';
import moment from 'moment';

import * as CustomPropTypes from '../../propTypes';
import Time from '../shared/Time';
import Section from '../shared/Section';
import ScrambleDetails from '../scramble/ScrambleDetails';
import Button from '../shared/Button';
import { ButtonDuo, ButtonDuoItem } from '../shared/ButtonDuo';
import CloudSyncIcon from '../shared/CloudSyncIcon';
import ToggleContent from '../ToggleContent';

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
      {moment(time.date).format('LLL')}
    </Section>
    <Section margin="sm">
      <FontAwesome fixedWidth icon={faCube} /> &nbsp;
      {time.puzzle || 'unknown'}
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
        content={() => <ScrambleDetails small scramble={time.scramble} puzzle={time.puzzle} />}
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
