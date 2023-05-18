import React, { useEffect, useState } from "react";

import Time from "../shared/Time";
import { TIMER_UPDATE_RATE } from "../../constants/timer";

type IncrementingTimerProps = {
  startTime: number;
};

const IncrementingTimer = ({ startTime }: IncrementingTimerProps) => {
  const [ms, setMs] = useState(Date.now() - startTime);

  useEffect(() => {
    const interval = setInterval(
      () => setMs(Date.now() - startTime),
      TIMER_UPDATE_RATE
    );
    return () => clearInterval(interval);
  }, [startTime]);

  return <Time time={{ ms }} showMilliseconds />;
};

export default IncrementingTimer;
