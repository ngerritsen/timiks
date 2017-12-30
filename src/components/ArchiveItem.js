import React from 'react';
import PropTypes from 'prop-types';
import { darken } from 'polished';
import styled from 'styled-components';
import FontAwesome from '@fortawesome/react-fontawesome';
import { faCaretRight, faCaretDown, faCalendarAlt, faCube } from '@fortawesome/fontawesome-pro-solid'

import TimeTable from './TimeTable';

const ArchiveItem = ({ averageOfBestThree, average, collapsed, date, onClick, puzzle, times, title }) => (
  <ArchiveItemBox onClick={onClick}>
    <ArchiveItemHeader>
      <strong>{title}</strong>
      <Info>
        <InfoItem>
          <InfoIcon><FontAwesome icon={faCube}/></InfoIcon> {puzzle}
        </InfoItem>
        <InfoItem>
          <InfoIcon><FontAwesome icon={faCalendarAlt}/></InfoIcon> {date.toLocaleDateString()}
        </InfoItem>
        <CollapseIcon>
          <FontAwesome icon={collapsed ? faCaretRight : faCaretDown}/>
        </CollapseIcon>
      </Info>
    </ArchiveItemHeader>
    {
      !collapsed &&
      <ArchiveItemContent>
        <TimeTable times={times} average={average} averageOfBestThree={averageOfBestThree}/>
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
  times: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string.isRequired
};

const ArchiveItemBox = styled.div`
  width: 100%;
  font-size: 1.6rem;
  border: 1px solid ${props => props.theme.colors.grey};
  border-radius: 4px;
  padding: ${props => props.theme.sizes.sm};
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
  margin-top: ${props => props.theme.sizes.sm};
`;

const CollapseIcon = styled.span`
  display: inline-block;
  color: ${props => props.theme.colors.subtleFg};
  width: 0.8em;
`;

const Info = styled.span`
  font-size: 1.4rem;
  color: ${props => props.theme.colors.subtleFg};
`;

const InfoItem = styled.span`
  margin-right: ${props => props.theme.sizes.sm};
`

const InfoIcon = styled.span`
  margin-right: ${props => props.theme.sizes.xxs};

`;

export default ArchiveItem;
