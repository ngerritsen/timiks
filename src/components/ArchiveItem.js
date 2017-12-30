import React from 'react';
import PropTypes from 'prop-types';
import { darken } from 'polished';
import styled from 'styled-components';
import FontAwesome from '@fortawesome/react-fontawesome';
import { faCaretRight, faCaretDown, faCalendarAlt, faCube } from '@fortawesome/fontawesome-pro-solid'

import Info, { InfoItem, InfoIcon } from './Info';
import TimeTable from './TimeTable';

const ArchiveItem = ({
  averageOfBestThree,
  average,
  collapsed,
  date,
  hideTimeDetails,
  onClick,
  puzzle,
  showTimeDetails,
  times,
  title
}) => (
  <ArchiveItemBox>
    <ArchiveItemHeader onClick={onClick}>
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
        <TimeTable
          average={average}
          averageOfBestThree={averageOfBestThree}
          hideTimeDetails={hideTimeDetails}
          showTimeDetails={showTimeDetails}
          times={times}
        />
      </ArchiveItemContent>
    }
  </ArchiveItemBox>
);

ArchiveItem.propTypes = {
  averageOfBestThree: PropTypes.number.isRequired,
  average: PropTypes.number.isRequired,
  collapsed: PropTypes.bool.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  hideTimeDetails: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  puzzle: PropTypes.string.isRequired,
  showTimeDetails: PropTypes.func.isRequired,
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
  padding: ${props => props.theme.sizes.sm};
  margin: -${props => props.theme.sizes.sm};
`;

const ArchiveItemContent = styled.div`
  margin-top: ${props => props.theme.sizes.sm};
`;

const CollapseIcon = styled.span`
  display: inline-block;
  color: ${props => props.theme.colors.subtleFg};
  width: 0.8em;
`;

export default ArchiveItem;
