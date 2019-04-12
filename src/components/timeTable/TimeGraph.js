import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import { transparentize } from 'polished';
import { Line } from 'react-chartjs-2';

import * as CustomPropTypes from '../../propTypes';
import { getMs } from '../../helpers/time';

const TimeGraph = ({ times, ao5s, ao12s, theme, zeroBased, forSession }) => {
  const getLineConfig = (color, data) => ({
    borderWidth: forSession ? 3 : 2,
    lineTension: 0.1,
    backgroundColor: transparentize(forSession ? 0.7 : 1, color),
    borderColor: color,
    pointBackgroundColor: color,
    pointHitRadius: 8,
    pointHoverRadius: forSession ? 4 : 2,
    pointRadius: forSession ? 2 : 0,
    data
  });

  const data = {
    labels: times.map((time, i) => forSession ? i : time.date),
    datasets: [
      getLineConfig(theme.colors.blue, times.map(getMs))
    ]
  }

  if (ao5s && ao5s.length > 1) {
    data.datasets.push(getLineConfig(theme.colors.orange, ao5s.map(ms => getMs({ ms }))));
  }

  if (ao12s && ao12s.length > 1) {
    data.datasets.push(getLineConfig(theme.colors.red, ao12s.map(ms => getMs({ ms }))));
  }

  const options = {
    animation: {
      duration: 700
    },
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        display: false
      }],
      yAxes: [{
        display: false,
        ticks: {
          beginAtZero: Boolean(zeroBased)
        }
      }]
    }
  }

  return <Line data={data} options={options}/>
};

TimeGraph.propTypes = {
  times: PropTypes.arrayOf(CustomPropTypes.Time).isRequired,
  ao5s: PropTypes.arrayOf(PropTypes.number),
  ao12s: PropTypes.arrayOf(PropTypes.number),
  theme: PropTypes.object,
  zeroBased: PropTypes.bool,
  forSession: PropTypes.bool
}

export default withTheme(TimeGraph);
