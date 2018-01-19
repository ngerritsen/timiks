import { connect } from 'react-redux';

import { decorateArchive, sortArchive, filterArchive } from '../helpers/archive';

import Archive from '../components/Archive';
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

  const filteredItems = filterArchive(items, puzzle);
  const sortedItems = sortArchive(filteredItems, sortBy);

  return {
    archive: decorateArchive(sortedItems, expanded, times.timeDetailsShown),
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
