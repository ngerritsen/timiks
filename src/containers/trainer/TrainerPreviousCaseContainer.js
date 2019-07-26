import { connect } from 'react-redux';

import TrainerPreviousCase from '../../components/trainer/TrainerPreviousCase';
import { getTrainingType, getLastCase } from '../../selectors/trainer';

function mapStateToProps(state) {
  return {
    trainingType: getTrainingType(state),
    lastCase: getLastCase(state)
  };
}

export default connect(mapStateToProps)(TrainerPreviousCase);
