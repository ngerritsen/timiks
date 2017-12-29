import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    clearTimes,
    openArchiveModal,
    inputTimesTitle,
    closeArchiveModal,
    archiveCurrentTimes,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeBoardActions);
