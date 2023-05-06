import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { transparentize } from "polished";
import styled, { withTheme } from "styled-components";
import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  LineController,
  CategoryScale,
  Tooltip,
  Title,
} from "chart.js";

import * as CustomPropTypes from "../../propTypes";
import { formatShortTime, getMs, formatTime } from "../../helpers/time";
import TimeGraphLegend from "./TimeGraphLegend";
import { formatLocalDateTime } from "../../helpers/dateTime";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  LineController,
  Title,
  CategoryScale,
  Tooltip
);

const TimeGraph = ({
  disabledLines,
  setDisabledLines,
  times,
  stats,
  theme,
  fixYAxis,
}) => {
  if (!disabledLines || !setDisabledLines) {
    [disabledLines, setDisabledLines] = useState([]);
  }

  const chartRef = useRef(null);

  const disableLine = (name) => setDisabledLines([...disabledLines, name]);
  const enableLine = (name) =>
    setDisabledLines(disabledLines.filter((lineName) => lineName !== name));
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
    data,
  });

  const lines = stats
    .filter((stat) => stat.showInGraph && stat.all.length > 1)
    .map((stat) => {
      const statTimes = stat.all.map((stat) =>
        stat.ms === Infinity ? null : getMs(stat)
      );
      const offset = times.length - statTimes.length;

      return buildLine(
        stat.name,
        [...new Array(Math.max(offset, 0)), ...statTimes],
        stat.color
      );
    });

  const data = {
    labels: times.map((time) => time.date),
    datasets: lines.filter((line) => line.enabled).reverse(),
  };

  const options = {
    aspectRatio: 1.5,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: theme.colors.dark,
        footerFont: {
          size: 14,
          family: theme.fonts.default,
          weight: "normal",
        },
        bodyFont: {
          size: 14,
          family: theme.fonts.default,
          weight: "bold",
        },
        padding: {
          y: 8,
          x: 12,
        },
        caretSize: 6,
        caretPadding: 6,
        footerMarginTop: 4,
        displayColors: false,
        callbacks: {
          label: (tooltipItem) =>
            `${formatTime(tooltipItem.raw)}  (${
              data.datasets[tooltipItem.datasetIndex].name
            })`,
          footer: (tooltipItem) =>
            formatLocalDateTime(new Date(tooltipItem[0].label)),
          title: () => null,
        },
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        min: fixYAxis ? 0 : undefined,
        ticks: {
          callback: formatShortTime,
        },
        grid: {
          color: theme.colors.subtleBg,
          tickLength: 7,
          drawBorder: false,
        },
      },
    },
  };

  return (
    <>
      <GraphWrapper>
        <Chart type="line" data={data} options={options} ref={chartRef} />
      </GraphWrapper>
      <LegendWrapper>
        <TimeGraphLegend
          lines={lines}
          enableLine={enableLine}
          disableLine={disableLine}
        />
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
  fixYAxis: PropTypes.bool,
};

const GraphWrapper = styled.div`
  position: relative;
`;

const LegendWrapper = styled.div`
  text-align: center;
`;

export default React.memo(withTheme(TimeGraph));
