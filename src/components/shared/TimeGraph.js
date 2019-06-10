import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ChartistGraph from 'react-chartist';

import FontAwesome from '@fortawesome/react-fontawesome';
import faCircle from '@fortawesome/fontawesome-pro-solid/faCircle';

import * as CustomPropTypes from '../../propTypes';
import { formatShortTime, getMs } from '../../helpers/time';

import { AVAILABLE_STATS } from '../../constants/app';

const lineColors = AVAILABLE_STATS.reduce(
  (colors, stat) => ({ ...colors, [stat.name]: stat.color }),
  { single: 'blue' }
);

const TimeGraph = ({ times, stats }) => {
  const [disabledLines, setDisabledLines] = useState([]);

  const disableLine = name => setDisabledLines([...disabledLines, name]);
  const enableLine = name => setDisabledLines(disabledLines.filter(lineName => lineName !== name));

  const statsToShow = AVAILABLE_STATS.filter(
    stat => stat.name !== 'mo3' && stats[stat.name] && stats[stat.name].all.length > 1
  );

  const statLines = statsToShow.map(stat => {
    const statTimes = stats[stat.name].all.map(ms => getMs({ ms: Math.round(ms) }));
    const offset = times.length - statTimes.length;

    return {
      name: stat.name,
      className: stat.name,
      enabled: !disabledLines.includes(stat.name),
      data: [...new Array(offset), ...statTimes]
    };
  });

  const lines = [
    {
      name: 'single',
      className: 'single',
      data: times.map(getMs),
      enabled: !disabledLines.includes('single')
    },
    ...statLines
  ];

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
      <Legend>
        {lines.map(line => (
          <LegendItem
            key={line.name}
            onClick={() => {
              line.enabled ? disableLine(line.name) : enableLine(line.name);
            }}
          >
            <LegendItemIcon color={lineColors[line.name]}>
              <FontAwesome size="sm" icon={faCircle} />
            </LegendItemIcon>
            <LegendItemLabel enabled={line.enabled}>{line.name}</LegendItemLabel>
          </LegendItem>
        ))}
      </Legend>
    </>
  );
};

TimeGraph.propTypes = {
  times: PropTypes.arrayOf(CustomPropTypes.Time).isRequired,
  stats: PropTypes.object,
  theme: PropTypes.object,
  showDateLabels: PropTypes.bool
};

const StyledChartistGraph = styled(ChartistGraph)`
  pointer-events: none;

  .ct-line {
    stroke-width: 2px;
  }

  .single .ct-line {
    stroke: ${props => props.theme.colors[lineColors.single]};
  }

  .ao5 .ct-line {
    stroke: ${props => props.theme.colors[lineColors.ao5]};
  }

  .ao12 .ct-line {
    stroke: ${props => props.theme.colors[lineColors.ao12]};
  }

  .ao25 .ct-line {
    stroke: ${props => props.theme.colors[lineColors.ao25]};
  }

  .ao50 .ct-line {
    stroke: ${props => props.theme.colors[lineColors.ao50]};
  }

  .ao100 .ct-line {
    stroke: ${props => props.theme.colors[lineColors.ao100]};
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

const Legend = styled.div`
  margin-top: -2rem;
  text-align: center;
`;

const LegendItemIcon = styled.span`
  position; relative;
  top: 0.1rem;
  color: ${props => props.theme.colors[props.color]};
  margin-right: ${props => props.theme.sizes.xxs};
`;

const LegendItemLabel = styled.span`
  text-decoration: ${props => (props.enabled ? 'none' : 'line-through')};
`;

const LegendItem = styled.span`
  cursor: pointer;
  display: inline-block;
  color: ${props => props.theme.colors.subtleFg};
  font-size: 1.3rem;
  margin-right: ${props => props.theme.sizes.sm};
  margin-bottom: ${props => props.theme.sizes.xs};

  &:last-child {
    margin-right: 0;
  }
`;

export default React.memo(TimeGraph);
