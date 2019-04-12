import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import { transparentize } from 'polished';
import { Line } from 'react-chartjs-2';

import * as CustomPropTypes from '../../propTypes';
import { getMs } from '../../helpers/time';

const TimeGraph = ({ times, theme, zeroBased, forSession }) => {
  const data = {
    labels: times.map((time, i) => forSession ? i : time.date),
    datasets: [
      {
        lineTension: 0.1,
        backgroundColor: transparentize(0.7, theme.colors.blue),
        borderColor: theme.colors.blue,
        pointBackgroundColor: theme.colors.blue,
        pointHitRadius: 10,
        pointRadius: times.length > 25 ? 1 : 3,
        data: times.map(getMs)
      }
    ]
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
  theme: PropTypes.object,
  zeroBased: PropTypes.bool,
  forSession: PropTypes.bool
}

export default withTheme(TimeGraph);
