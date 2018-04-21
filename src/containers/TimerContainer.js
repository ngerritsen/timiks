import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { TIMER_INTERVAL } from '../constants/app';
import { obfuscateScramble } from '../helpers/scramble';
import { showScrambleDetails, hideScrambleDetails } from '../actions';
import Timer from '../components/Timer';

class TimerContainer extends React.Component {
  constructor() {
    super();

    this.state = { time: 0 };
    this._interval = null;
    this._updateTime = this._updateTime.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { stopped } = this.props;

    if (!stopped && nextProps.stopped) {
      clearInterval(this._interval);
    }

    if (stopped && !nextProps.stopped) {
      this._interval = setInterval(this._updateTime, TIMER_INTERVAL);
    }
  }

  _updateTime() {
    this.setState({
      time: Date.now() - this.props.startTime
    });
  }

  _getDisplayTime() {
    const { finalTime, startTime } = this.props;

    if (finalTime > 0) {
      return finalTime;
    }

    if (startTime > 0) {
      return this.state.time;
    }

    return 0;
  }

  render() {
    return <Timer time={this._getDisplayTime()} {...this.props}/>
  }
}

TimerContainer.propTypes = {
  startTime: PropTypes.number.isRequired,
  finalTime: PropTypes.number.isRequired,
  showScrambleDetails: PropTypes.func.isRequired,
  scrambleDetailsOpen: PropTypes.bool.isRequired,
  hideScrambleDetails: PropTypes.func.isRequired,
  puzzle: PropTypes.string.isRequired,
  scramble: PropTypes.arrayOf(PropTypes.string).isRequired,
  stopped: PropTypes.bool.isRequired
};

function mapStateToProps (state) {
  const { activation, timer, scramble } = state;
  const { stopped, startTime, finalTime } = timer;
  const preparing = activation.preparationStage > -1;

  return {
    finalTime,
    startTime,
    stopped,
    scramble: (stopped && !preparing) ? scramble : obfuscateScramble(scramble),
    puzzle: state.settings.puzzle,
    preparing,
    scrambleDetailsOpen: state.timer.scrambleDetailsOpen
  }
}

export default connect(
  mapStateToProps,
  { showScrambleDetails, hideScrambleDetails }
)(TimerContainer);
