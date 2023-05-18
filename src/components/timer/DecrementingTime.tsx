import React, { useEffect, useState } from "react";

import Time from "../shared/Time";
import { TIMER_UPDATE_RATE } from "../../constants/timer";

type DecrementingTimeProps = {
  decrementFrom: number;
  startTime: number;
  secondsOnly?: boolean;
  belowZeroText?: string;
};

const DecrementingTime = ({
  decrementFrom,
  startTime,
  secondsOnly,
  belowZeroText,
}: DecrementingTimeProps) => {
  const [ms, setMs] = useState(decrementFrom);

  useEffect(() => {
    const interval = setInterval(
      () => setMs(decrementFrom - (Date.now() - startTime)),
      TIMER_UPDATE_RATE
    );
    return () => clearInterval(interval);
  }, [startTime]);

  if (belowZeroText && ms <= 0) {
    return <>{belowZeroText}</>;
  }

  return <Time time={{ ms, plus2: ms < 0 }} secondsOnly={secondsOnly} />;
};

export default DecrementingTime;
