import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { startTimer, stopTimer, resetTime } from '../actions';
import Activation from '../components/Activation';

function mapStateToProps ({ timer, activation }) {
  const { stopped, time } = timer;
  const { preparing } = activation;

  return {
    time,
    stopped,
    preparing
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ startTimer, stopTimer, resetTime }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Activation);
