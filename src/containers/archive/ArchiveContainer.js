import { connect } from 'react-redux';

import TimeTableContainer from '../../containers/timeTable/TimeTableContainer';

function mapStateToProps(state) {
  return {
    times: state.times.archived
  }
}

export default connect(
  mapStateToProps
)(TimeTableContainer);
