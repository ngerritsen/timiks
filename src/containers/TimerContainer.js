import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { TIMER_INTERVAL, INSPECTION_TIME } from '../constants/app';
import { obfuscateScramble } from '../helpers/scramble';
import { showScrambleDetails, hideScrambleDetails } from '../actions';
import Timer from '../components/Timer';

class TimerContainer extends React.Component {
  constructor() {
    super();

    this.state = { time: 0, inspectionTime: 0 };
    this._interval = null;
    this._inpectionInterval = null;
    this._updateTime = this._updateTime.bind(this);
    this._updateInspectionTime = this._updateInspectionTime.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { stopped, inspectionMode } = this.props;

    if (!inspectionMode && nextProps.inspectionMode) {
      this._inpectionInterval = setInterval(this._updateInspectionTime, TIMER_INTERVAL);
    }

    if (inspectionMode && !nextProps.inspectionMode) {
      clearInterval(this._inpectionInterval);
    }

    if (stopped && !nextProps.stopped) {
      this._interval = setInterval(this._updateTime, TIMER_INTERVAL);
    }

    if (!stopped && nextProps.stopped) {
      clearInterval(this._interval);
    }
  }

  _updateTime() {
    this.setState({
      time: Date.now() - this.props.startTime
    });
  }

  _updateInspectionTime() {
    this.setState({
      inspectionTime: INSPECTION_TIME - (Date.now() - this.props.inspectionStartTime)
    });
  }

  _getDisplayTime() {
    const { finalTime, startTime, inspectionMode, preparingForInspection } = this.props;

    if (inspectionMode) {
      return this.state.inspectionTime;
    }

    if (preparingForInspection) {
      return INSPECTION_TIME;
    }

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
  inspectionStartTime: PropTypes.number.isRequired,
  inspectionMode: PropTypes.bool.isRequired,
  showScrambleDetails: PropTypes.func.isRequired,
  scrambleDetailsOpen: PropTypes.bool.isRequired,
  preparingForInspection: PropTypes.bool.isRequired,
  hideScrambleDetails: PropTypes.func.isRequired,
  puzzle: PropTypes.string.isRequired,
  scramble: PropTypes.arrayOf(PropTypes.string).isRequired,
  stopped: PropTypes.bool.isRequired
};

function mapStateToProps (state) {
  const { activation, timer, scramble } = state;
  const { stopped, startTime, finalTime, inspectionStartTime, inspectionMode, dnf } = timer;
  const { preparingForInspection, preparationStage } = activation;
  const preparing = preparationStage > -1;

  return {
    finalTime,
    startTime,
    stopped,
    inspectionStartTime,
    inspectionMode,
    dnf,
    preparingForInspection,
    scramble: (stopped && !preparing && !preparingForInspection && !inspectionMode) ? scramble : obfuscateScramble(scramble),
    puzzle: state.settings.puzzle,
    preparing,
    scrambleDetailsOpen: state.timer.scrambleDetailsOpen
  }
}

export default connect(
  mapStateToProps,
  { showScrambleDetails, hideScrambleDetails }
)(TimerContainer);
