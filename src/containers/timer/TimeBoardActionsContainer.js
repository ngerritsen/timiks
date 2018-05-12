import { connect } from 'react-redux';

import TimeBoardActions from '../../components/timer/TimeBoardActions';
import * as actions from '../../actions';

function mapStateToProps(state) {
  return {
    titleInput: state.archive.titleInput,
    isModalOpen: state.archive.isModalOpen
  };
}

export default connect(
  mapStateToProps,
  {
    clearTimes: actions.clearTimes,
    openArchiveModal: actions.openArchiveModal,
    inputTimesTitle: actions.inputTimesTitle,
    closeArchiveModal: actions.closeArchiveModal,
    archiveCurrentTimes: actions.archiveCurrentTimes
  }
)(TimeBoardActions);
