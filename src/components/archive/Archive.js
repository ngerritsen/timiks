import React from 'react';
import PropTypes from 'prop-types';

import ArchiveList from './ArchiveList';
import Message from '../shared/Message';
import ArchiveRefinementContainer from '../../containers/archive/ArchiveRefinementContainer';
import Section from '../shared/Section';
import ArchiveExportContainer from '../../containers/archive/ArchiveExportContainer';
import ArchiveImportContainer from '../../containers/archive/ArchiveImportContainer';

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
          <ArchiveList {...{archive, collapseArchiveItem, expandArchiveItem, removeArchiveItem}}/>
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

export default Archive;
