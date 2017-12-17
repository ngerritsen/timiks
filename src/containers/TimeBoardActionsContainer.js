import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TimeBoardActions from '../components/TimeBoardActions';
import {
  clearTimes,
  saveTimes,
  openSaveTimesModal,
  closeSaveTimesModal,
  inputTimesTitle
} from '../actions';

function mapStateToProps(state) {
  return {
    titleInput: state.times.titleInput,
    isModalOpen: state.times.isModalOpen
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    clearTimes,
    openSaveTimesModal,
    inputTimesTitle,
    closeSaveTimesModal,
    saveTimes
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeBoardActions);
