import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import { transparentize } from 'polished';
import { Line } from 'react-chartjs-2';
import moment from 'moment';

import * as CustomPropTypes from '../../propTypes';
import { getMs } from '../../helpers/time';

import { AVAILABLE_STATS } from '../../constants/app';

const TimeGraph = ({ times, stats, theme, zeroBased, forSession }) => {
  const getLineConfig = (label, color, data) => ({
    label,
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
    labels: times.map((time, i) => (forSession ? i : moment(time.date).format("D/MM/YY'"))),
    datasets: [getLineConfig('single', theme.colors.blue, times.map(getMs))]
  };

  if (!forSession) {
    const statLines = AVAILABLE_STATS.filter(
      stat => stat.name !== 'mo3' && stats[stat.name] && stats[stat.name].all.length > 1
    ).map(stat => {
      const times = stats[stat.name].all.map(ms => getMs({ ms }));
      const offset = data.labels.length - times.length;
      const paddedTimes = [...new Array(offset), ...times];

      return getLineConfig(stat.name, theme.colors[stat.color], paddedTimes);
    });

    data.datasets.push(...statLines);
  }

  const options = {
    animation: {
      duration: 700
    },
    legend: {
      display: !forSession,
      labels: {
        boxWidth: 30
      },
      position: 'bottom'
    },
    scales: {
      xAxes: [
        {
          display: false
        }
      ],
      yAxes: [
        {
          display: false,
          ticks: {
            beginAtZero: Boolean(zeroBased)
          }
        }
      ]
    }
  };

  return <Line data={data} options={options} />;
};

TimeGraph.propTypes = {
  times: PropTypes.arrayOf(CustomPropTypes.Time).isRequired,
  stats: PropTypes.object,
  theme: PropTypes.object,
  zeroBased: PropTypes.bool,
  forSession: PropTypes.bool
};

export default withTheme(React.memo(TimeGraph));
