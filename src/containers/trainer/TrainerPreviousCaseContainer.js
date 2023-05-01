import { connect } from "react-redux";

import TrainerPreviousCase from "../../components/trainer/TrainerPreviousCase";
import {
  getTrainingType,
  getLastCase,
  isInRehearsal,
  isQueued,
  getCurrentCaseId,
} from "../../selectors/trainer";
import { retryCase, reQueueCase } from "../../actions";

function mapStateToProps(state) {
  return {
    trainingType: getTrainingType(state),
    lastCase: getLastCase(state),
    isInRehearsal: isInRehearsal(state),
    isQueued: isQueued(state),
    currentCaseId: getCurrentCaseId(state),
  };
}

export default connect(mapStateToProps, { retryCase, reQueueCase })(
  TrainerPreviousCase
);
