import { connect } from 'react-redux';

import TimerOptions from '../../components/timer/TimerOptions';
import { changeSetting, refreshScramble } from '../../actions';
import * as settingSelectors from '../../selectors/settings';

function mapStateToProps(state) {
  return {
    puzzle: settingSelectors.getPuzzle(state),
    useInspectionTime: settingSelectors.shouldUseInspectionTime(state),
    useManualTimeEntry: settingSelectors.shouldUseManualTimeEntry(state)
  };
}

export default connect(
  mapStateToProps,
  { changeSetting, refreshScramble }
)(TimerOptions);
