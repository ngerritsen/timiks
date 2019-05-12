import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TimeBoard from '../../components/timer/TimeBoard';
import { hasCurrentTimes } from '../../selectors/times';

const TimeBoardContainer = ({ hasTimes }) => (hasTimes ? <TimeBoard /> : null);

TimeBoardContainer.propTypes = {
  hasTimes: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    hasTimes: hasCurrentTimes(state)
  };
}

export default connect(mapStateToProps)(TimeBoardContainer);
