import { connect } from "react-redux";
import Scramble from "../../components/scramble/Scramble";
import { getScramble, getPuzzleForScramble } from "../../selectors/scramble";

function mapStateToProps(state) {
  return {
    scramble: getScramble(state),
    puzzle: getPuzzleForScramble(state),
    withDetails: true,
  };
}

export default connect(mapStateToProps)(Scramble);
