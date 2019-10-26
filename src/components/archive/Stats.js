import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import * as CustomPropTypes from '../../propTypes';
import { getBreakpoint, getSize, getColor } from '../../helpers/theme';
import Time from '../shared/Time';

const Stats = ({ stats, solves, showLast }) => (
  <StatsContainer>
    <div>
      <StatTitle>
        <StatColor color="subtleFg" />
        solves:
      </StatTitle>
      <strong>{solves}</strong>
    </div>
    {stats.map(stat => (
      <div key={stat.name}>
        <StatTitle>
          <StatColor color={stat.color} />
          {stat.name}:
        </StatTitle>
        <strong>
          <Time time={showLast ? stat.current : stat.best || stat.current} />
        </strong>
      </div>
    ))}
  </StatsContainer>
);

Stats.propTypes = {
  stats: PropTypes.arrayOf(CustomPropTypes.Stat).isRequired,
  solves: PropTypes.number.isRequired,
  showLast: PropTypes.bool
};

const StatsContainer = styled.div`
  padding: ${getSize('sm')} ${getSize('xxs')};
  border-top: 1px solid ${getColor('subtleBg')};
  border-bottom: 1px solid ${getColor('subtleBg')};
  display: grid;
  grid-column-gap: ${getSize('xs')};
  grid-row-gap: ${getSize('xs')};
  grid-template-columns: 1fr 1fr;

  @media screen and (min-width: ${getBreakpoint('sm')}) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media screen and (min-width: ${getBreakpoint('lg')}) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

const StatTitle = styled.span`
  display: inline-block;
  width: 8rem;
`;

const StatColor = styled.span`
  display: inline-block;
  font-weight: bold;
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 0.5rem;
  background-color: ${props => getColor(props.color || 'grey')(props)};
  margin-right: ${getSize('xs')};
`;

export default Stats;
