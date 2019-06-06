import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ChartistGraph from 'react-chartist';

import * as CustomPropTypes from '../../propTypes';
import { formatShortTime, getMs } from '../../helpers/time';

import { AVAILABLE_STATS } from '../../constants/app';

const TimeGraph = ({ times, stats }) => {
  const data = {
    labels: times.map(time => time.date.toISOString()),
    series: [
      {
        name: 'single',
        data: times.map(getMs)
      }
    ]
  };

  const statLines = AVAILABLE_STATS.filter(
    stat => stat.name !== 'mo3' && stats[stat.name] && stats[stat.name].all.length > 1
  ).map(stat => {
    const times = stats[stat.name].all.map(ms => getMs({ ms: Math.round(ms) }));
    const offset = data.labels.length - times.length;

    return {
      name: stat.name,
      data: [...new Array(offset), ...times]
    };
  });

  data.series.push(...statLines);

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
    <StyledChartistGraph className="ct-perfect-fifth" data={data} options={options} type="Line" />
  );
};

const StyledChartistGraph = styled(ChartistGraph)`
  .ct-line {
    stroke-width: 2px;
  }

  .ct-series-a .ct-line {
    stroke: ${props => props.theme.colors.lightBlue};
  }

  .ct-series-b .ct-line {
    stroke: ${props => props.theme.colors.green};
  }

  .ct-series-c .ct-line {
    stroke: ${props => props.theme.colors.yellow};
  }

  .ct-series-d .ct-line {
    stroke: ${props => props.theme.colors.orange};
  }

  .ct-series-e .ct-line {
    stroke: ${props => props.theme.colors.fluoRed};
  }

  .ct-series-f .ct-line {
    stroke: ${props => props.theme.colors.purple};
  }

  .ct-grid {
    stroke: ${props => props.theme.colors.grey};
  }

  .ct-label {
    position: relative;
    font-size: 1.3rem;
    color: ${props => props.theme.colors.grey};
    top: ${props => props.theme.sizes.xxs};
  }
`;

TimeGraph.propTypes = {
  times: PropTypes.arrayOf(CustomPropTypes.Time).isRequired,
  stats: PropTypes.object,
  theme: PropTypes.object,
  showDateLabels: PropTypes.bool
};

export default React.memo(TimeGraph);
