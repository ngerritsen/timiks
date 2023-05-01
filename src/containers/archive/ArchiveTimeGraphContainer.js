import TimeGraph from "../../components/shared/TimeGraph";
import { changeSetting } from "../../actions";
import { connect } from "react-redux";
import { getDisabledArchiveGraphLines } from "../../selectors/settings";

function mapStateToProps(state) {
  return {
    disabledLines: getDisabledArchiveGraphLines(state),
  };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return {
    ...stateProps,
    setDisabledLines: (lines) =>
      dispatchProps.changeSetting("disabledArchiveGraphLines", lines),
    ...ownProps,
  };
}

export default connect(
  mapStateToProps,
  { changeSetting },
  mergeProps
)(TimeGraph);
