import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as CustomPropTypes from '../../propTypes';
import { TIMER_INTERVAL, INSPECTION_TIME, PREPARATION_STAGES } from '../../constants/app';
import { submitTimeInput, updateTimeInput } from '../../actions';
import { getLastTime } from '../../selectors/timesSelectors';
import Timer from '../../components/timer/Timer';

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
    const { lastTime, showLastTime, startTime, stopTime, inspectionMode, preparingForInspection } = this.props;

    switch(true) {
      case inspectionMode:
        return { ms: this.state.inspectionTime };
      case preparingForInspection:
        return { ms: INSPECTION_TIME };
      case startTime > 0 && stopTime > 0:
        return { ms: stopTime - startTime };
      case startTime > 0:
        return { ms: this.state.time };
      case showLastTime:
        return lastTime;
      default:
        return { ms: 0 };
    }
  }

  render() {
    return <Timer time={this._getDisplayTime()} {...this.props}/>
  }
}

TimerContainer.propTypes = {
  inspectionMode: PropTypes.bool.isRequired,
  inspectionStartTime: PropTypes.number.isRequired,
  lastTime: CustomPropTypes.Time,
  preparingForInspection: PropTypes.bool.isRequired,
  showLastTime: PropTypes.bool.isRequired,
  startTime: PropTypes.number.isRequired,
  stopTime: PropTypes.number.isRequired,
  stopped: PropTypes.bool.isRequired
};

function mapStateToProps (state) {
  const { activation, timer, settings } = state;
  const { stopped, startTime, inspectionStartTime, inspectionMode, stopTime } = timer;
  const { preparingForInspection, preparationStage } = activation;
  const preparing = preparationStage > -1;

  const ready = preparationStage === PREPARATION_STAGES;
  const useManualTimeEntry = settings.useManualTimeEntry;
  const lastTime = getLastTime(state);
  const showLastTime = startTime === 0 && !ready && !useManualTimeEntry && Boolean(lastTime);

  return {
    inspectionMode,
    inspectionStartTime,
    lastTime,
    preparing,
    preparingForInspection,
    ready,
    showLastTime,
    startTime,
    stopTime,
    stopped,
    useManualTimeEntry
  }
}

export default connect(
  mapStateToProps,
  {
    submitTimeInput,
    updateTimeInput
  }
)(TimerContainer);
