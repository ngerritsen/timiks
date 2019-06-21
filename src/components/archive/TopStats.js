import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import * as CustomPropTypes from '../../propTypes';
import { getBreakpoint, getSize, getColor } from '../../helpers/theme';
import Time from '../shared/Time';

const TopStats = ({ stats }) => (
  <TopStatsContainer>
    {stats.map(stat => (
      <div key={stat.name}>
        <TopStatTitle>
          <TopStatColor color={stat.color} />
          {stat.name}:
        </TopStatTitle>
        <strong>
          <Time time={{ ms: stat.best || stat.current }} />
        </strong>
      </div>
    ))}
  </TopStatsContainer>
);

TopStats.propTypes = {
  stats: PropTypes.arrayOf(CustomPropTypes.Stat).isRequired
};

const TopStatsContainer = styled.div`
  padding: ${getSize('sm')} ${getSize('xxs')};
  border-top: 1px solid ${getColor('subtleBg')};
  border-bottom: 1px solid ${getColor('subtleBg')};
  border-radius: 0.3rem;
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

const TopStatTitle = styled.span`
  display: inline-block;
  width: 6.75rem;
`;

const TopStatColor = styled.span`
  display: inline-block;
  font-weight: bold;
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 0.5rem;
  background-color: ${props => getColor(props.color || 'grey')(props)};
  margin-right: ${getSize('xs')};
`;

export default TopStats;
