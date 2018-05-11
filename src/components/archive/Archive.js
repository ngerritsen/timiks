import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ArchiveItem from './ArchiveItem';
import ArchiveRefinementContainer from '../../containers/ArchiveRefinementContainer';
import Section from '../shared/Section';
import ArchiveExportContainer from '../../containers/ArchiveExportContainer';
import ArchiveImportContainer from '../../containers/ArchiveImportContainer';

import { Toolbar, ToolbarItem } from '../shared/Toolbar';

const Archive = ({ archive, collapseArchiveItem, expandArchiveItem, removeArchiveItem, isEmpty }) => {
  return (
    <div>
      {
        isEmpty &&
        <Message>The archive is empty!</Message>
      }
      {
        !isEmpty &&
        <div>
          <Section margin="sm">
            <ArchiveRefinementContainer/>
          </Section>
            {(() => {
              if (archive.length === 0) {
                return <Message>No items found.</Message>
              }

              return (
                <ArchiveList>
                  {archive.map((item, index) =>
                    <ArchiveListItem key={index}>
                      <ArchiveItem
                        {...item}
                        removeArchiveItem={removeArchiveItem}
                        onClick={() => item.collapsed ? expandArchiveItem(item.id) : collapseArchiveItem(item.id)}
                      />
                    </ArchiveListItem>
                  )}
                </ArchiveList>
              )
            })()}
          </div>
        }
      <Toolbar>
        {
          archive.length !== 0 &&
          <ToolbarItem>
            <ArchiveExportContainer/>
          </ToolbarItem>
        }
        <ToolbarItem>
          <ArchiveImportContainer/>
        </ToolbarItem>
      </Toolbar>
    </div>
  )
};

Archive.propTypes = {
  archive: PropTypes.arrayOf(PropTypes.object),
  collapseArchiveItem: PropTypes.func.isRequired,
  expandArchiveItem: PropTypes.func.isRequired,
  removeArchiveItem: PropTypes.func.isRequired,
  isEmpty: PropTypes.bool.isRequired
}

const ArchiveList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ArchiveListItem = styled.li`
  padding: 0;
  margin: 0 0 ${props => props.theme.sizes.xs};
`;

const Message = styled.p`
  margin: ${props => props.theme.sizes.xl} 0;
  text-align: center;
  color: ${props => props.theme.colors.subtleFg};
`

export default Archive;
