import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Message from '../shared/Message';
import ArchiveItem from './ArchiveItem';

const ArchiveList = ({ archive, removeArchiveItem, expandArchiveItem, collapseArchiveItem }) => {
  if (archive.length === 0) {
    return <Message>No items found.</Message>
  }

  return (
    <StyledArchiveList>
      {archive.map((item, index) =>
        <ArchiveListItem key={index}>
          <ArchiveItem
            {...item}
            removeArchiveItem={removeArchiveItem}
            onClick={() => item.collapsed ? expandArchiveItem(item.id) : collapseArchiveItem(item.id)}
          />
        </ArchiveListItem>
      )}
    </StyledArchiveList>
  )
};

ArchiveList.propTypes = {
  archive: PropTypes.arrayOf(PropTypes.object),
  collapseArchiveItem: PropTypes.func.isRequired,
  expandArchiveItem: PropTypes.func.isRequired,
  removeArchiveItem: PropTypes.func.isRequired
}

const StyledArchiveList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ArchiveListItem = styled.li`
  padding: 0;
  margin: 0 0 ${props => props.theme.sizes.xs};
`;

export default ArchiveList;
