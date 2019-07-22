import { connect } from 'react-redux';

import TrainerTimeTable from '../../components/trainer/TrainerTimeTable';
import { clearTrainerTimes, removeTrainerTime } from '../../actions';

import { getTrainerTimesPerCase, getTrainingType } from '../../selectors/trainer';

function mapStateToProps(state) {
  return {
    cases: getTrainerTimesPerCase(state),
    trainingType: getTrainingType(state)
  };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    clearTrainerTimes: () => dispatchProps.clearTrainerTimes(stateProps.trainingType)
  };
}

export default connect(
  mapStateToProps,
  { clearTrainerTimes, removeTrainerTime },
  mergeProps
)(TrainerTimeTable);
