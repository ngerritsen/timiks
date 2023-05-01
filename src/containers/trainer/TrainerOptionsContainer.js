import { connect } from "react-redux";

import TrainerOptions from "../../components/trainer/TrainerOptions";
import {
  changeTrainingType,
  startRehearsal,
  stopRehearsal,
} from "../../actions";

import { getTrainingType, isInRehearsal } from "../../selectors/trainer";

function mapStateToProps(state) {
  return {
    trainingType: getTrainingType(state),
    inRehearsal: isInRehearsal(state),
  };
}

export default connect(mapStateToProps, {
  changeTrainingType,
  startRehearsal,
  stopRehearsal,
})(TrainerOptions);
