import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faStopwatch } from '@fortawesome/fontawesome-pro-solid';

import Button from './Button';
import Time from './Time';
import Section from './Section';
import Scramble from './Scramble';

const TimeDetails = ({ date, ms, scramble, hideTimeDetails }) => (
  <div>
    <Section>
        <FontAwesome icon={faStopwatch} /> &nbsp;
        <Time ms={ms} decimals={4} />
    </Section>
    <Section margin="md">
        <FontAwesome icon={faCalendarAlt} /> &nbsp;
        {date.toLocaleString()}
    </Section>
    <Section margin="md">
      <Scramble scramble={scramble} small />
    </Section>
    <Button onClick={hideTimeDetails}>Close</Button>
  </div>
);

TimeDetails.propTypes = {
  date: PropTypes.instanceOf(Date),
  ms: PropTypes.number.isRequired,
  scramble: PropTypes.arrayOf(PropTypes.string).isRequired,
  hideTimeDetails: PropTypes.func.isRequired
};

export default TimeDetails;
