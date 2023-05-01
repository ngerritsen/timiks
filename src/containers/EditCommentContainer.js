import { connect } from "react-redux";

import EditComment from "../components/shared/EditComment";
import { updateTime } from "../actions";

function mergeProps(_, dispatchProps, ownProps) {
  return {
    ...ownProps,
    onSave: (comment) => {
      ownProps.onCancel();
      dispatchProps.updateTime(ownProps.time.id, { comment });
    },
  };
}

export default connect(undefined, { updateTime }, mergeProps)(EditComment);
