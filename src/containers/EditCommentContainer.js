import { connect } from "react-redux";

import EditComment from "../components/shared/EditComment";
import { updateTime } from "../slices/times";

function mergeProps(_, dispatchProps, ownProps) {
  return {
    ...ownProps,
    onSave: (comment) => {
      ownProps.onCancel();
      dispatchProps.updateTime({ id: ownProps.time.id, fields: { comment } });
    },
  };
}

export default connect(undefined, { updateTime }, mergeProps)(EditComment);
