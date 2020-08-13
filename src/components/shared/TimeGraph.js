import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { transparentize } from 'polished';
import styled, { withTheme } from 'styled-components';
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-zoom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchMinus } from '@fortawesome/free-solid-svg-icons/faSearchMinus';

import Button from './Button';
import * as CustomPropTypes from '../../propTypes';
import { formatShortTime, getMs, formatTime } from '../../helpers/time';
import TimeGraphLegend from './TimeGraphLegend';
import { formatLocalDateTime } from '../../helpers/dateTime';

const TimeGraph = ({
  disabledLines,
  setDisabledLines,
  times,
  stats,
  theme,
  enableZoom,
  fixYAxis
}) => {
  if (!disabledLines || !setDisabledLines) {
    [disabledLines, setDisabledLines] = useState([]);
  }

  const chartRef = useRef(null);

  let minYAxis, maxYAxis;
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

  if (fixYAxis) {
    const allMs = stats
      .filter(stat => stat.all)
      .reduce((allTimes, stat) => [...allTimes, ...stat.all], [])
      .map(time => time.ms)
      .filter(ms => ms && ms > 0 && ms < Infinity);

    minYAxis = Math.min(...allMs);
    maxYAxis = Math.max(...allMs);
  }

  const lines = stats
    .filter(stat => stat.showInGraph && stat.all.length > 1)
    .map(stat => {
      const statTimes = stat.all.map(stat => (stat.ms === Infinity ? null : getMs(stat)));
      const offset = times.length - statTimes.length;

      return buildLine(stat.name, [...new Array(Math.max(offset, 0)), ...statTimes], stat.color);
    });

  const data = {
    labels: times.map(time => time.date),
    datasets: lines.filter(line => line.enabled).reverse()
  };

  const options = {
    aspectRatio: 1.5,
    animation: {
      duration: 500
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
            callback: formatShortTime,
            suggestedMin: minYAxis,
            suggestedMax: maxYAxis
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
            <FontAwesomeIcon icon={faSearchMinus} />
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
  disabledLines: PropTypes.arrayOf(PropTypes.string),
  setDisabledLines: PropTypes.func,
  theme: PropTypes.object.isRequired,
  enableZoom: PropTypes.bool,
  fixYAxis: PropTypes.bool
};

const GraphWrapper = styled.div`
  position: relative;
`;

const ResetZoomButton = styled(Button)`
  position: absolute;
  top: 0;
  right: 0;
`;

const LegendWrapper = styled.div`
  text-align: center;
`;

export default React.memo(withTheme(TimeGraph));
