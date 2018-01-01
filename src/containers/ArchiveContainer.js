import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as times from '../helpers/times';
import { sortArchive } from '../helpers/archive';

import Archive from '../components/Archive';
import {
  expandArchiveItem,
  collapseArchiveItem,
  hideTimeDetails,
  removeArchiveItem,
  showTimeDetails
} from '../actions';

function mapStateToProps(state) {
  return {
    archive: sortArchive(state.archive.items
      .map(item => ({
        ...item,
        collapsed: state.archive.expanded !== item.id,
        times: times.markShowDetails(times.markBestTime(item.times), state.times.timeDetailsShown),
        average: times.calculateAverageTime(item.times),
        averageOfBestThree: times.calculateAverageTimeOfBestThree(item.times),
        date: times.getFirstDate(item.times)
      })), state.archive.sortBy)
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
