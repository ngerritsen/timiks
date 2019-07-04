import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Time from '../shared/Time';
import { TIMER_UPDATE_RATE } from '../../constants/timer';

const IncrementingTimer = ({ startTime }) => {
  const [ms, setMs] = useState(Date.now() - startTime);

  useEffect(() => {
    const interval = setInterval(() => setMs(Date.now() - startTime), TIMER_UPDATE_RATE);
    return () => clearInterval(interval);
  }, [startTime]);

  return <Time time={{ ms }} />;
};

IncrementingTimer.propTypes = {
  startTime: PropTypes.number.isRequired
};

export default IncrementingTimer;
