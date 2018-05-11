import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import { transparentize } from 'polished';
import { Line } from 'react-chartjs-2';

import { getMs } from '../../helpers/times';

const TimeGraph = ({ times, theme }) => {
  const data = {
    labels: times.map((_, i) => i),
    datasets: [
      {
        lineTension: 0,
        backgroundColor: transparentize(0.7, theme.colors.blue),
        borderColor: theme.colors.blue,
        pointBackgroundColor: theme.colors.blue,
        pointHitRadius: 10,
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
        display: false
      }]
    }
  }

  return <Line data={data} options={options}/>
};

TimeGraph.propTypes = {
  times: PropTypes.arrayOf(PropTypes.object).isRequired,
  theme: PropTypes.object
}

export default withTheme(TimeGraph);
