import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { transparentize } from 'polished';
import styled, { withTheme } from 'styled-components';
import { Line } from 'react-chartjs-2';
import * as zoom from 'chartjs-plugin-zoom';

import * as CustomPropTypes from '../../propTypes';
import { formatShortTime, getMs, formatTime } from '../../helpers/time';
import TimeGraphLegend from './TimeGraphLegend';

const TimeGraph = ({ times, stats, theme }) => {
  const [disabledLines, setDisabledLines] = useState([]);

  const disableLine = name => setDisabledLines([...disabledLines, name]);
  const enableLine = name => setDisabledLines(disabledLines.filter(lineName => lineName !== name));
  const buildLine = (name, data, color) => ({
    name,
    color,
    label: name,
    borderWidth: 2,
    lineTension: 0.2,
    backgroundColor: transparentize(1, theme.colors[color]),
    borderColor: theme.colors[color],
    pointBackgroundColor: theme.colors[color],
    pointHitRadius: 8,
    pointHoverRadius: 3,
    pointRadius: 0,
    enabled: !disabledLines.includes(name),
    data
  });

  const lines = stats
    .filter(stat => stat.showInGraph && stat.all.length > 1)
    .map(stat => {
      const statTimes = stat.all
        .filter(ms => ms < Infinity)
        .map(ms => getMs({ ms: Math.round(ms) }));

      const offset = times.length - statTimes.length;

      return buildLine(
        stat.name,
        [...new Array(Math.max(offset, 0)), ...statTimes],
        stat.graphLineColor
      );
    });

  const data = {
    labels: times.map(time => time.date),
    datasets: lines.filter(line => line.enabled)
  };

  const options = {
    animation: {
      duration: 0
    },
    legend: {
      display: false
    },
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          const label = data.datasets[tooltipItem.datasetIndex].label;
          return label + ': ' + formatTime(tooltipItem.value);
        }
      }
    },
    pan: {
      enabled: true,
      mode: 'x'
    },
    zoom: {
      enabled: true,
      mode: 'x'
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

  return (
    <>
      <Line data={data} options={options} plugins={[zoom]} />
      <LegendWrapper>
        <TimeGraphLegend lines={lines} enableLine={enableLine} disableLine={disableLine} />
      </LegendWrapper>
    </>
  );
};

TimeGraph.propTypes = {
  times: PropTypes.arrayOf(CustomPropTypes.Time).isRequired,
  stats: PropTypes.arrayOf(CustomPropTypes.Stat).isRequired,
  theme: PropTypes.object.isRequired
};

const LegendWrapper = styled.div`
  text-align: center;
`;

export default React.memo(withTheme(TimeGraph));
