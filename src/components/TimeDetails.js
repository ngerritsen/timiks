import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faStopwatch, faCube } from '@fortawesome/fontawesome-pro-solid';

import Button from './Button';
import Time from './Time';
import Section from './Section';
import ScrambleDetails from './ScrambleDetails';

const TimeDetails = ({ puzzle, date, ms, scramble, hideTimeDetails }) => (
  <div>
    <Section margin="sm">
        <FontAwesome icon={faStopwatch} /> &nbsp;
        <Time ms={ms} decimals={4} />
    </Section>
    <Section margin="sm">
        <FontAwesome icon={faCalendarAlt} /> &nbsp;
        {date.toLocaleString()}
    </Section>
    <Section margin="md">
        <FontAwesome icon={faCube} /> &nbsp;
        {puzzle || 'unknown'}
    </Section>
    <Section margin="md">
      <ScrambleDetails scramble={scramble} puzzle={puzzle} />
    </Section>
    <Button onClick={hideTimeDetails}>Close</Button>
  </div>
);

TimeDetails.propTypes = {
  date: PropTypes.instanceOf(Date),
  ms: PropTypes.number.isRequired,
  puzzle: PropTypes.string.isRequired,
  scramble: PropTypes.arrayOf(PropTypes.string).isRequired,
  hideTimeDetails: PropTypes.func.isRequired
};

export default TimeDetails;
