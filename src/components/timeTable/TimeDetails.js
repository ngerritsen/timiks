import React from 'react';
import FontAwesome from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faStopwatch, faCube } from '@fortawesome/fontawesome-pro-solid';
import PropTypes from 'prop-types';

import * as CustomPropTypes from '../../propTypes';
import Time from '../shared/Time';
import Section from '../shared/Section';
import ScrambleDetails from '../scramble/ScrambleDetails';
import Button from '../shared/Button';

const TimeDetails = ({ time, onRemoveTime }) => (
  <div>
    <Section margin="sm">
        <FontAwesome icon={faStopwatch} /> &nbsp;
        <Time time={time} decimals={4} />
    </Section>
    <Section margin="sm">
        <FontAwesome icon={faCalendarAlt} /> &nbsp;
        {time.date.toLocaleString()}
    </Section>
    <Section margin="md">
        <FontAwesome icon={faCube} /> &nbsp;
        {time.puzzle || 'unknown'}
    </Section>
    <Section margin="md">
      <ScrambleDetails scramble={time.scramble} puzzle={time.puzzle} />
    </Section>
    <Section>
      <Button onClick={onRemoveTime} danger>Remove</Button>
    </Section>
  </div>
);

TimeDetails.propTypes = {
  time: CustomPropTypes.Time.isRequired,
  onRemoveTime: PropTypes.func.isRequired
};

export default TimeDetails;
