import { connect } from 'react-redux';

import TrainerOptions from '../../components/trainer/TrainerOptions';
import { changeTrainingType, requestNextCase } from '../../actions';

import { getTrainingType } from '../../selectors/trainer';

function mapStateToProps(state) {
  return {
    type: getTrainingType(state)
  };
}

export default connect(
  mapStateToProps,
  { changeTrainingType, requestNextCase }
)(TrainerOptions);
