import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { TIMER_INTERVAL } from '../constants/app';
import { obfuscateScramble } from '../helpers/scramble';
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
      time: new Date().getTime() - this.props.startTime
    });
  }

  render() {
    const { scramble, startTime } = this.props;
    const time = startTime === 0 ? startTime : this.state.time;

    return <Timer time={time} scramble={scramble}/>
  }
}

TimerContainer.propTypes = {
  startTime: PropTypes.number.isRequired,
  scramble: PropTypes.arrayOf(PropTypes.string).isRequired,
  stopped: PropTypes.bool.isRequired
};

function mapStateToProps ({ timer, scramble }) {
  const { stopped, startTime } = timer;

  return {
    startTime,
    stopped,
    scramble: stopped ? scramble : obfuscateScramble(scramble)
  }
}

export default connect(mapStateToProps)(TimerContainer);
