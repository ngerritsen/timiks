import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import { transparentize } from 'polished';
import { Line } from 'react-chartjs-2';
import moment from 'moment';

import * as CustomPropTypes from '../../propTypes';
import { formatShortTime, formatTime, getMs } from '../../helpers/time';

import { AVAILABLE_STATS } from '../../constants/app';

const TimeGraph = ({ times, stats, theme }) => {
  const getLineConfig = (label, color, data) => ({
    label,
    borderWidth: 2,
    lineTension: 0.1,
    backgroundColor: transparentize(1, color),
    borderColor: color,
    pointBackgroundColor: color,
    pointHitRadius: 8,
    pointHoverRadius: 2,
    pointRadius: 0,
    data
  });

  const data = {
    labels: times.map(time => moment(time.date).format('lll')),
    datasets: [getLineConfig('single', theme.colors.blue, times.map(getMs))]
  };

  const statLines = AVAILABLE_STATS.filter(
    stat => stat.name !== 'mo3' && stats[stat.name] && stats[stat.name].all.length > 1
  ).map(stat => {
    const times = stats[stat.name].all.map(ms => getMs({ ms: Math.round(ms) }));
    const offset = data.labels.length - times.length;
    const paddedTimes = [...new Array(offset), ...times];

    return getLineConfig(stat.name, theme.colors[stat.color], paddedTimes);
  });

  data.datasets.push(...statLines);

  const options = {
    animation: {
      duration: 700
    },
    legend: {
      display: true,
      labels: {
        boxWidth: 30
      },
      position: 'bottom'
    },
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          const label = data.datasets[tooltipItem.datasetIndex].label;

          return label + ': ' + formatTime(tooltipItem.yLabel);
        }
      }
    },
    scales: {
      xAxes: [
        {
          display: false
        }
      ],
      yAxes: [
        {
          ticks: {
            callback: formatShortTime
          },
          gridLines: {
            color: theme.colors.subtleBg,
            tickMarkLength: 7,
            drawBorder: false
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
  showDateLabels: PropTypes.bool
};

export default withTheme(React.memo(TimeGraph));
