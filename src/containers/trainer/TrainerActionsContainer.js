import { connect } from 'react-redux';

import TrainerActions from '../../components/trainer/TrainerActions';
import { selectCases, deselectCases } from '../../actions';

import { getActiveEnabledCases, getAvailableCaseIds } from '../../selectors/trainer';

function mapStateToProps(state) {
  return {
    selectedCaseIds: getActiveEnabledCases(state),
    availableCaseIds: getAvailableCaseIds(state)
  };
}

export default connect(mapStateToProps, { selectCases, deselectCases })(TrainerActions);
