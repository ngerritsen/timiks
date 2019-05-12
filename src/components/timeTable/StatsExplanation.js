import React from 'react';

const StatsExplanation = () => (
  <>
    <p>After 2 valid solves (excluding DNF{`'`}s) a trend graph will be shown.</p>

    <p>
      When a minimum of 3 solves are present the mean of 3 (<strong>mo3</strong>) will be shown
      (best average of 3 consecutive solves).
    </p>

    <p>
      After 5 solves the average of the <i>last</i> 5 solves (without the best and the worst solve)
      will be shown (<strong>ao5</strong>). After that it will continue with:{' '}
      <strong>ao12, ao25, ao50* and ao100*</strong>.
    </p>

    <i>*The a50 will exclude the best and worst 3 solves, the ao100 will exclude 5.</i>
  </>
);

export default StatsExplanation;
