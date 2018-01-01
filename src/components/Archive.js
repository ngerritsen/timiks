import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ArchiveItem from './ArchiveItem';
import ArchiveRefinementContainer from '../containers/ArchiveRefinementContainer';
import Section from './Section';

const Archive = ({
  archive,
  collapseArchiveItem,
  expandArchiveItem,
  hideTimeDetails,
  removeArchiveItem,
  showTimeDetails
}) => (
  <div>
    <Section>
      <ArchiveRefinementContainer/>
    </Section>
    <ArchiveList>
      {archive.map((item, index) =>
        <ArchiveListItem key={index}>
          <ArchiveItem
            {...item}
            hideTimeDetails={hideTimeDetails}
            showTimeDetails={showTimeDetails}
            removeArchiveItem={removeArchiveItem}
            onClick={() => item.collapsed ? expandArchiveItem(item.id) : collapseArchiveItem(item.id)}
          />
        </ArchiveListItem>
      )}
    </ArchiveList>
  </div>
);

Archive.propTypes = {
  archive: PropTypes.arrayOf(PropTypes.object),
  collapseArchiveItem: PropTypes.func.isRequired,
  expandArchiveItem: PropTypes.func.isRequired,
  hideTimeDetails: PropTypes.func.isRequired,
  removeArchiveItem: PropTypes.func.isRequired,
  showTimeDetails: PropTypes.func.isRequired
}

const ArchiveList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ArchiveListItem = styled.li`
  padding: 0;
  margin: 0 0 ${props => props.theme.sizes.xs};
`;

export default Archive;
