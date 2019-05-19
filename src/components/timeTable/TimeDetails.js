import React from 'react';
import FontAwesome from '@fortawesome/react-fontawesome';
import {
  faCalendarAlt,
  faStopwatch,
  faCube,
  faCloud,
  faCloudUpload
} from '@fortawesome/fontawesome-pro-solid';
import PropTypes from 'prop-types';
import moment from 'moment';

import * as CustomPropTypes from '../../propTypes';
import Time from '../shared/Time';
import Section from '../shared/Section';
import ScrambleDetails from '../scramble/ScrambleDetails';
import Button from '../shared/Button';
import { ButtonDuo, ButtonDuoItem } from '../shared/ButtonDuo';
import WithAuthentication from '../../containers/WithAuthentication';

const TimeDetails = ({ time, onRemoveTime, onClose }) => (
  <div>
    <Section margin="sm">
      <FontAwesome icon={faStopwatch} /> &nbsp;
      <Time time={time} />
    </Section>
    <Section margin="sm">
      <FontAwesome icon={faCalendarAlt} /> &nbsp;
      {moment(time.date).format('LLL')}
    </Section>
    <Section margin="sm">
      <FontAwesome icon={faCube} /> &nbsp;
      {time.puzzle || 'unknown'}
    </Section>
    <WithAuthentication>
      {({ isLoggedIn }) =>
        isLoggedIn ? (
          <Section margin="sm">
            <FontAwesome icon={time.stored ? faCloud : faCloudUpload} /> &nbsp;
            {time.stored ? (time.dirty ? 'Out of date' : 'Stored') : 'Not stored'}
          </Section>
        ) : null
      }
    </WithAuthentication>
    <Section margin="sm" />
    <Section margin="md">
      <ScrambleDetails scramble={time.scramble} puzzle={time.puzzle} />
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
