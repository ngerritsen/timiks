import { connect } from "react-redux";

import TrainerStatus from "../../components/trainer/TrainerStatus";

import * as trainerSelectors from "../../selectors/trainer";

function mapStateToProps(state) {
  return {
    trainingType: trainerSelectors.getTrainingType(state),
    inRehearsal: trainerSelectors.isInRehearsal(state),
    enabledCases: trainerSelectors.getActiveEnabledCases(state).length,
    trainingCases: trainerSelectors.getSelectedCaseIds(state).length,
    remainingRehearsalCases:
      trainerSelectors.getRemainingRehearsalCaseIds(state).length,
  };
}

export default connect(mapStateToProps)(TrainerStatus);
