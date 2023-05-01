import { connect } from "react-redux";

import NetworkStatusBar from "../components/NetworkStatusBar";
import { isOnline } from "../selectors/network";

function mapStateToProps(state) {
  return {
    isOnline: isOnline(state),
  };
}

export default connect(mapStateToProps)(NetworkStatusBar);
