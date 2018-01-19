import { connect } from 'react-redux';

import TimeBoardActions from '../components/TimeBoardActions';
import {
  clearTimes,
  archiveCurrentTimes,
  openArchiveModal,
  closeArchiveModal,
  inputTimesTitle
} from '../actions';

function mapStateToProps(state) {
  return {
    titleInput: state.archive.titleInput,
    isModalOpen: state.archive.isModalOpen
  };
}

export default connect(
  mapStateToProps,
  {
    clearTimes,
    openArchiveModal,
    inputTimesTitle,
    closeArchiveModal,
    archiveCurrentTimes,
  }
)(TimeBoardActions);
