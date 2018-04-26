import { connect } from 'react-redux';

import { decorateArchive, sortArchive, filterArchive } from '../helpers/archive';

import Archive from '../components/archive/Archive';
import {
  expandArchiveItem,
  collapseArchiveItem,
  hideTimeDetails,
  removeArchiveItem,
  showTimeDetails
} from '../actions';

function mapStateToProps(state) {
  const { archive, times } = state;
  const { items, puzzle, sortBy, expanded } = archive;

  const decoratedArchive = decorateArchive(items, expanded, times.timeDetailsShown);
  const filteredItems = filterArchive(decoratedArchive, puzzle);
  const sortedItems = sortArchive(filteredItems, sortBy);

  return {
    archive: sortedItems,
    isEmpty: items.length === 0
  }
}

export default connect(
  mapStateToProps,
  {
    expandArchiveItem,
    collapseArchiveItem,
    hideTimeDetails,
    removeArchiveItem,
    showTimeDetails
  }
)(Archive);
