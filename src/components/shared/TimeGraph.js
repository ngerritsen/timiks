import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { transparentize } from 'polished';
import styled, { withTheme } from 'styled-components';
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-zoom';
import FontAwesome from '@fortawesome/react-fontawesome';
import faSearchMinus from '@fortawesome/fontawesome-pro-solid/faSearchMinus';

import Button from './Button';
import * as CustomPropTypes from '../../propTypes';
import { formatShortTime, getMs, formatTime } from '../../helpers/time';
import TimeGraphLegend from './TimeGraphLegend';
import { formatLocalDateTime } from '../../helpers/dateTime';

const TimeGraph = ({ times, stats, theme, enableZoom }) => {
  const [disabledLines, setDisabledLines] = useState([]);
  const chartRef = useRef(null);

  const resetZoom = () => chartRef.current && chartRef.current.chartInstance.resetZoom();
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
    spanGaps: true,
    data
  });

  const lines = stats
    .filter(stat => stat.showInGraph && stat.all.length > 1)
    .map(stat => {
      const statTimes = stat.all.map(ms =>
        ms === Infinity ? null : getMs({ ms: Math.round(ms) })
      );

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
    aspectRatio: 1.5,
    animation: {
      duration: 0
    },
    legend: {
      display: false
    },
    tooltips: {
      backgroundColor: theme.colors.dark,
      footerFontFamily: theme.fonts.default,
      footerFontSize: 14,
      footerFontStyle: 'normal',
      bodyFontFamily: theme.fonts.default,
      bodyFontStyle: 'bold',
      bodyFontSize: 15,
      xPadding: 12,
      yPadding: 12,
      caretSize: 7,
      caretPadding: 5,
      footerMarginTop: 8,
      displayColors: false,
      callbacks: {
        label: tooltipItem =>
          `${formatTime(tooltipItem.value)}  (${data.datasets[tooltipItem.datasetIndex].name})`,
        footer: tooltipItem => formatLocalDateTime(new Date(tooltipItem[0].label)),
        title: () => null
      }
    },
    pan: {
      enabled: enableZoom,
      mode: 'x'
    },
    zoom: {
      enabled: enableZoom,
      mode: 'x',
      sensitivity: 0.5
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
      <GraphWrapper>
        <Line data={data} options={options} ref={chartRef} height={null} width={null} />
        {enableZoom && (
          <ResetZoomButton onClick={resetZoom} size="sm" color="subtleBg" tag>
            <FontAwesome icon={faSearchMinus} />
          </ResetZoomButton>
        )}
      </GraphWrapper>
      <LegendWrapper>
        <TimeGraphLegend lines={lines} enableLine={enableLine} disableLine={disableLine} />
      </LegendWrapper>
    </>
  );
};

TimeGraph.propTypes = {
  times: PropTypes.arrayOf(CustomPropTypes.Time).isRequired,
  stats: PropTypes.arrayOf(CustomPropTypes.Stat).isRequired,
  theme: PropTypes.object.isRequired,
  enableZoom: PropTypes.bool
};

const GraphWrapper = styled.div`
  position: relative;
`;

const ResetZoomButton = Button.extend`
  position: absolute;
  top: 0;
  right: 0;
`;

const LegendWrapper = styled.div`
  text-align: center;
`;

export default React.memo(withTheme(TimeGraph));
