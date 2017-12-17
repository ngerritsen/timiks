import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TimeBoardActions from '../components/TimeBoardActions';
import { clearTimes, saveTimes, openSaveTimesModal, closeSaveTimesModal } from '../actions';

function mapStateToProps(state) {
  return {
    isModalOpen: state.times.isModalOpen
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    clearTimes,
    openSaveTimesModal,
    closeSaveTimesModal,
    saveTimes
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeBoardActions);
