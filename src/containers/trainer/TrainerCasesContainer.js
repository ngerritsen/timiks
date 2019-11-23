import { connect } from 'react-redux';

import TrainerCases from '../../components/trainer/TrainerCases';
import { selectCase, deselectCase, selectCases, deselectCases } from '../../actions';

import { getGroupedSelectedCases, getTrainingType } from '../../selectors/trainer';

function mapStateToProps(state) {
  return {
    groupedCases: getGroupedSelectedCases(state),
    trainingType: getTrainingType(state)
  };
}

export default connect(mapStateToProps, { selectCase, deselectCase, selectCases, deselectCases })(
  TrainerCases
);
