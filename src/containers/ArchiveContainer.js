import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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
    archive: decorateArchive(sortedItems, expanded, times.timeDetailsShown)
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    expandArchiveItem,
    collapseArchiveItem,
    hideTimeDetails,
    removeArchiveItem,
    showTimeDetails
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Archive);
