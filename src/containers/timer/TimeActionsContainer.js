import { connect } from 'react-redux';

import TimeActions from '../../components/timer/TimeActions';
import { removeTime, updateTime } from '../../actions';
import { getLastTime } from '../../selectors/times';

function mapStateToProps(state) {
  return { lastTime: getLastTime(state) }
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { lastTime } = stateProps;
  const { id, dnf, plus2 } = lastTime;
  const { removeTime, updateTime } = dispatchProps;

  return {
    ...ownProps,
    dnf,
    plus2,
    removeLastTime: () => lastTime && removeTime(id),
    toggleDnfLastTime: () => lastTime && updateTime(id, { dnf: !dnf }),
    togglePlus2LastTime: () => lastTime && updateTime(id, { plus2: !plus2 })
  }
}

export default connect(
  mapStateToProps,
  { removeTime, updateTime },
  mergeProps
)(TimeActions);
