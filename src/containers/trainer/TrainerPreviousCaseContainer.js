import { connect } from 'react-redux';

import TrainerPreviousCase from '../../components/trainer/TrainerPreviousCase';
import { getTrainingType, getLastCase, isInRehearsal } from '../../selectors/trainer';
import { retryCase, reQueueCase } from '../../actions';

function mapStateToProps(state) {
  return {
    trainingType: getTrainingType(state),
    lastCase: getLastCase(state),
    isInRehearsal: isInRehearsal(state)
  };
}

export default connect(mapStateToProps, { retryCase, reQueueCase })(TrainerPreviousCase);
