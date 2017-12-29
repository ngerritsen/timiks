import React from 'react';
import PropTypes from 'prop-types';
import { darken } from 'polished';
import styled from 'styled-components';
import FontAwesome from '@fortawesome/react-fontawesome';
import { faCaretRight, faCaretDown } from '@fortawesome/fontawesome-pro-solid'

import Time from './Time';

const ArchiveItem = ({ averageOfBestThree, average, collapsed, date, onClick, puzzle, title }) => (
  <ArchiveItemBox onClick={onClick}>
    <ArchiveItemHeader>
      <strong>{title}</strong>
      <div>
        <Time  fontSize={1.6} ms={averageOfBestThree}/>
        <AverageTime>
          <Time fontSize={1.6} ms={average}/>
        </AverageTime>
        <CollapseIcon>
          <FontAwesome icon={collapsed ? faCaretRight : faCaretDown}/>
        </CollapseIcon>
      </div>
    </ArchiveItemHeader>
    {
      !collapsed &&
      <ArchiveItemContent>
        <Info>{puzzle} - {date.toLocaleDateString()}</Info>
      </ArchiveItemContent>
    }
  </ArchiveItemBox>
);

ArchiveItem.propTypes = {
  averageOfBestThree: PropTypes.number.isRequired,
  average: PropTypes.number.isRequired,
  collapsed: PropTypes.bool.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  onClick: PropTypes.func.isRequired,
  puzzle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

const ArchiveItemBox = styled.div`
  width: 100%;
  font-size: 1.6rem;
  border: 1px solid ${props => props.theme.colors.grey};
  border-radius: 4px;
  padding: ${props => props.theme.sizes.xs};
  margin-bottom: ${props => props.theme.sizes.xs};

  &:hover {
    cursor: pointer;
    border: 1px solid ${props => darken(0.15, props.theme.colors.grey)};
  }
`;

const ArchiveItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ArchiveItemContent = styled.div`
  margin-top: ${props => props.theme.sizes.xs};
`;

const CollapseIcon = styled.span`
  display: inline-block;
  color: ${props => props.theme.colors.grey};
  margin-left: ${props => props.theme.sizes.sm};
  width: 0.8em;
`;

const AverageTime = styled.strong`
  font-weight: bold;
  margin-left: ${props => props.theme.sizes.sm};
`;

const Info = styled.p`
  color: ${props => props.theme.colors.subtleFg};
  margin: 0;
`;

export default ArchiveItem;
