import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ChartistGraph from 'react-chartist';

import { default as allStats } from '../../constants/stats';
import * as CustomPropTypes from '../../propTypes';
import { formatShortTime, getMs } from '../../helpers/time';
import { getColor, getSize } from '../../helpers/theme';
import TimeGraphLegend from './TimeGraphLegend';

const lineColors = allStats.reduce(
  (colors, stat) => ({ ...colors, [stat.name]: stat.graphLineColor }),
  {}
);

const TimeGraph = ({ times, stats }) => {
  const [disabledLines, setDisabledLines] = useState([]);

  const disableLine = name => setDisabledLines([...disabledLines, name]);
  const enableLine = name => setDisabledLines(disabledLines.filter(lineName => lineName !== name));
  const buildLine = (name, data) => ({
    name,
    className: name,
    data,
    enabled: !disabledLines.includes(name),
    color: lineColors[name]
  });

  const statLines = stats
    .filter(stat => stat.showInGraph && stat.all.length > 1)
    .map(stat => {
      const statTimes = stat.all
        .filter(ms => ms < Infinity)
        .map(ms => getMs({ ms: Math.round(ms) }));
      const offset = times.length - statTimes.length;

      return buildLine(stat.name, [...new Array(Math.max(offset, 0)), ...statTimes]);
    });

  const lines = [...statLines];

  const data = {
    labels: times.map(time => time.date.toISOString()),
    series: lines.filter(line => line.enabled)
  };

  const options = {
    showPoint: false,
    axisX: {
      showLabel: false,
      showGrid: false
    },
    axisY: {
      labelInterpolationFnc: formatShortTime
    }
  };

  return (
    <>
      <StyledChartistGraph
        lineColors={lineColors}
        className="ct-perfect-fifth"
        data={data}
        options={options}
        type="Line"
      />
      <LegendWrapper>
        <TimeGraphLegend lines={lines} enableLine={enableLine} disableLine={disableLine} />
      </LegendWrapper>
    </>
  );
};

TimeGraph.propTypes = {
  times: PropTypes.arrayOf(CustomPropTypes.Time).isRequired,
  stats: PropTypes.arrayOf(CustomPropTypes.Stat).isRequired
};

const StyledChartistGraph = styled(ChartistGraph)`
  pointer-events: none;

  .ct-line {
    stroke-width: 2px;
  }

  .single .ct-line {
    stroke: ${getColor(lineColors.single)};
  }

  .ao5 .ct-line {
    stroke: ${getColor(lineColors.ao5)};
  }

  .ao12 .ct-line {
    stroke: ${getColor(lineColors.ao12)};
  }

  .ao25 .ct-line {
    stroke: ${getColor(lineColors.ao25)};
  }

  .ao50 .ct-line {
    stroke: ${getColor(lineColors.ao50)};
  }

  .ao100 .ct-line {
    stroke: ${getColor(lineColors.ao100)};
  }

  .ct-grid {
    stroke: ${getColor('grey')};
  }

  .ct-label {
    position: relative;
    font-size: 1.3rem;
    color: ${getColor('grey')};
    top: ${getSize('xxs')};
  }
`;

const LegendWrapper = styled.div`
  margin-top: -2rem;
  text-align: center;
`;

export default React.memo(TimeGraph);
