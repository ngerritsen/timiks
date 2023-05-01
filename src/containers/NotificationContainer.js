import { connect } from "react-redux";

import Notification from "../components/Notification";
import { getMessage, isError, shouldShow } from "../selectors/notifications";
import { hideNotification } from "../actions";

function mapStateToProps(state) {
  return {
    message: getMessage(state),
    isError: isError(state),
    show: shouldShow(state),
  };
}

export default connect(mapStateToProps, { hideNotification })(Notification);
