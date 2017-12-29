import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ArchiveItem from './ArchiveItem';

const Archive = ({ archive, collapseArchiveItem, expandArchiveItem }) => (
  <div>
    <ArchiveTitle>Archive</ArchiveTitle>
    <ArchiveList>
      {archive.map((item, index) =>
        <ArchiveItem
          key={index}
          {...item}
          onClick={() => item.collapsed ? expandArchiveItem(item.id) : collapseArchiveItem(item.id)}
        />
      )}
    </ArchiveList>
  </div>
);

Archive.propTypes = {
  archive: PropTypes.arrayOf(PropTypes.object),
  collapseArchiveItem: PropTypes.func.isRequired,
  expandArchiveItem: PropTypes.func.isRequired
}

const ArchiveTitle = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin: 0 0 ${props => props.theme.sizes.sm};
`;

const ArchiveList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default Archive;
