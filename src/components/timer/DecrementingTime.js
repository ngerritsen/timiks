import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Time from '../shared/Time';
import { TIMER_UPDATE_RATE } from '../../constants/timer';

const DecrementingTime = ({ decrementFrom, startTime, secondsOnly }) => {
  const [ms, setMs] = useState(decrementFrom);

  useEffect(() => {
    const interval = setInterval(
      () => setMs(decrementFrom - (Date.now() - startTime)),
      TIMER_UPDATE_RATE
    );
    return () => clearInterval(interval);
  }, [startTime]);

  return <Time time={{ ms }} secondsOnly={secondsOnly} />;
};

DecrementingTime.propTypes = {
  decrementFrom: PropTypes.number.isRequired,
  startTime: PropTypes.number.isRequired,
  secondsOnly: PropTypes.bool
};

export default DecrementingTime;
