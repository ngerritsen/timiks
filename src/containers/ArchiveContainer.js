import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as times from '../helpers/times';
import { expandArchiveItem, collapseArchiveItem, hideTimeDetails, showTimeDetails } from '../actions';
import Archive from '../components/Archive';

function mapStateToProps(state) {
  return {
    archive: state.archive.items
      .map(item => ({
        ...item,
        collapsed: state.archive.expanded !== item.id,
        times: times.markShowDetails(times.markBestTime(item.times), state.times.timeDetailsShown),
        average: times.calculateAverageTime(item.times),
        averageOfBestThree: times.calculateAverageTimeOfBestThree(item.times),
        date: times.getFirstDate(item.times)
      }))
      .sort((a, b) => a.date.getTime() - b.date.getTime())
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    expandArchiveItem,
    collapseArchiveItem,
    hideTimeDetails,
    showTimeDetails
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Archive);
