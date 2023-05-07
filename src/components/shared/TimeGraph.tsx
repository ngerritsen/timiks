import React, { useRef, useState } from "react";
import { transparentize } from "polished";
import styled, { useTheme } from "styled-components";
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
  TooltipItem,
} from "chart.js";

import { formatShortTime, getMs, formatTime } from "../../helpers/time";
import TimeGraphLegend from "./TimeGraphLegend";
import { formatLocalDateTime } from "../../helpers/dateTime";
import { useSelector } from "react-redux";
import { shouldFixGraphYAxis } from "../../selectors/settings";
import { Stat, StatTime, Time } from "../../types";
import { Color, Theme } from "../../theme";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  LineController,
  Title,
  CategoryScale,
  Tooltip
);

type TimeGraphProps = {
  times: Time[];
  stats: Stat[];
  disabledLines: string[];
  setDisabledLines: (disabledLines: string[]) => void;
};

const TimeGraph = ({
  disabledLines,
  setDisabledLines,
  times,
  stats,
}: TimeGraphProps) => {
  const fixYAxis = useSelector(shouldFixGraphYAxis);
  const theme = useTheme() as Theme;

  if (!disabledLines || !setDisabledLines) {
    [disabledLines, setDisabledLines] = useState([]);
  }

  const chartRef = useRef(null);

  const disableLine = (name: string) =>
    setDisabledLines([...disabledLines, name]);
  const enableLine = (name: string) =>
    setDisabledLines(disabledLines.filter((lineName) => lineName !== name));
  const buildLine = (name: string, data: StatTime[], color: Color) => ({
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
          label: (tooltipItem: TooltipItem<"line">) =>
            `${formatTime(tooltipItem.raw)}  (${
              data.datasets[tooltipItem.datasetIndex].name
            })`,
          footer: (tooltipItems: TooltipItem<"line">[]) =>
            formatLocalDateTime(new Date(tooltipItems[0].label)),
          title: (): null => null,
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

const GraphWrapper = styled.div`
  position: relative;
`;

const LegendWrapper = styled.div`
  text-align: center;
`;

export default React.memo(TimeGraph);
