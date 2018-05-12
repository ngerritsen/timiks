import React from 'react';
import FontAwesome from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faStopwatch, faCube } from '@fortawesome/fontawesome-pro-solid';

import * as CustomPropTypes from '../../propTypes';
import Time from '../shared/Time';
import Section from '../shared/Section';
import ScrambleDetails from '../scramble/ScrambleDetails';

const TimeDetails = ({ time }) => (
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
  </div>
);

TimeDetails.propTypes = {
  time: CustomPropTypes.Time.isRequired
};

export default TimeDetails;
