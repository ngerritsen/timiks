import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Time from '../shared/Time';
import { TIMER_UPDATE_RATE } from '../../constants/app';

const IncrementingTimer = ({ startTime, secondsOnly }) => {
  const [ms, setMs] = useState(Date.now() - startTime);

  useEffect(() => {
    const interval = setInterval(() => setMs(Date.now() - startTime), TIMER_UPDATE_RATE);
    return () => clearInterval(interval);
  });

  return <Time time={{ ms }} secondsOnly={secondsOnly} />;
};

IncrementingTimer.propTypes = {
  startTime: PropTypes.number.isRequired,
  secondsOnly: PropTypes.bool
};

export default IncrementingTimer;
