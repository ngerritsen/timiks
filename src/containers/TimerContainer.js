import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { TIMER_INTERVAL, INSPECTION_TIME, PREPARATION_STAGES } from '../constants/app';
import { obfuscateScramble } from '../helpers/scramble';
import { removeTime, updateTime, submitTimeInput, updateTimeInput } from '../actions';
import Timer from '../components/timer/Timer';

class TimerContainer extends React.Component {
  constructor() {
    super();

    this.state = { time: 0, inspectionTime: INSPECTION_TIME };
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
      this.setState({ inspectionTime: INSPECTION_TIME });
    }

    if (stopped && !nextProps.stopped) {
      this._interval = setInterval(this._updateTime, TIMER_INTERVAL);
    }

    if (!stopped && nextProps.stopped) {
      clearInterval(this._interval);
      this.setState({ time: 0 });
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
    const { lastTime, startTime, inspectionMode, preparingForInspection } = this.props;

    if (inspectionMode) {
      return this.state.inspectionTime;
    }

    if (preparingForInspection) {
      return INSPECTION_TIME;
    }

    if (startTime > 0) {
      return this.state.time;
    }

    if (lastTime > 0) {
      return lastTime;
    }

    return 0;
  }

  render() {
    return <Timer time={this._getDisplayTime()} {...this.props}/>
  }
}

TimerContainer.propTypes = {
  startTime: PropTypes.number.isRequired,
  lastTime: PropTypes.number.isRequired,
  inspectionStartTime: PropTypes.number.isRequired,
  inspectionMode: PropTypes.bool.isRequired,
  preparingForInspection: PropTypes.bool.isRequired,
  puzzle: PropTypes.string.isRequired,
  scramble: PropTypes.arrayOf(PropTypes.string).isRequired,
  stopped: PropTypes.bool.isRequired
};

function mapStateToProps (state) {
  const { activation, timer, scramble, times, settings } = state;
  const { stopped, startTime, lastTimeId, inspectionStartTime, inspectionMode, timeInput } = timer;
  const { preparingForInspection, preparationStage } = activation;
  const preparing = preparationStage > -1;

  const ready = preparationStage === PREPARATION_STAGES;
  const useManualTimeEntry = settings.useManualTimeEntry;
  const lastTime = times.current.find(time => time.id === lastTimeId);
  const showLastTime = Boolean(lastTime && startTime === 0 && !ready && !useManualTimeEntry);

  return {
    _lastTime: lastTime,
    useManualTimeEntry,
    lastTime: showLastTime ? lastTime.ms : 0,
    startTime,
    stopped,
    inspectionStartTime,
    inspectionMode,
    showTimeActions: showLastTime,
    dnf: showLastTime ? Boolean(lastTime.dnf) : false,
    plus2: showLastTime ? Boolean(lastTime.plus2) : false,
    ready,
    timeInput,
    preparingForInspection,
    scramble: (stopped && !preparing && !preparingForInspection && !inspectionMode) ? scramble : obfuscateScramble(scramble),
    puzzle: state.settings.puzzle,
    preparing
  }
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  const lastTime = stateProps._lastTime;

  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    removeLastTime() {
      return lastTime ?
        dispatchProps.removeTime(lastTime.id) :
        null
    },
    toggleDnfLastTime() {
      return lastTime ?
        dispatchProps.updateTime(lastTime.id, { dnf: !lastTime.dnf }) :
        null
    },
    togglePlus2LastTime() {
      return lastTime ?
        dispatchProps.updateTime(lastTime.id, { plus2: !lastTime.plus2 }) :
        null
    }
  }
}

export default connect(
  mapStateToProps,
  {
    updateTime,
    removeTime,
    submitTimeInput,
    updateTimeInput
  },
  mergeProps
)(TimerContainer);
