import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TimeBoard from '../components/TimeBoard';

const TimeBoardContainer = ({ hasTimes }) => hasTimes ? <TimeBoard/> : null;

TimeBoardContainer.propTypes = {
  hasTimes: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    hasTimes: state.times.times.length > 0
  };
}

export default connect(mapStateToProps)(TimeBoardContainer);
