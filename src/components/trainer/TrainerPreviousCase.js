import PropTypes from 'prop-types';
import React from 'react';

import * as CustomPropTypes from '../../propTypes';
import TrainerCaseDetails from './TrainerCaseDetails';

const TrainerPreviousCase = ({ trainingType, lastCase }) =>
  lastCase ? (
    <>
      <h3>Last case</h3>
      <TrainerCaseDetails trainingCase={lastCase} trainingType={trainingType} />
    </>
  ) : null;

TrainerPreviousCase.propTypes = {
  trainingType: PropTypes.string.isRequired,
  lastCase: CustomPropTypes.Case
};

export default TrainerPreviousCase;
