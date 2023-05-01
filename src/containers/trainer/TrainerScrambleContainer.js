import { connect } from "react-redux";

import Scramble from "../../components/scramble/Scramble";
import {
  getCurrentScramble,
  getCurrentCase,
  getTrainingType,
} from "../../selectors/trainer";
import { DEFAULT_PUZZLE } from "../../constants/settings";

function mapStateToProps(state) {
  return {
    scramble: getCurrentScramble(state),
    puzzle: DEFAULT_PUZZLE,
    withTrainingCase: getCurrentCase(state),
    trainingType: getTrainingType(state),
  };
}

export default connect(mapStateToProps)(Scramble);
