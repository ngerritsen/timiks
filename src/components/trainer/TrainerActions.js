import React from 'react';
import PropTypes from 'prop-types';
import Button from '../shared/Button';

const TrainerActions = ({ availableCaseIds, selectedCaseIds, selectCases, deselectCases }) => {
  if (selectedCaseIds.length > 0) {
    return (
      <Button size="sm" color="subtleBg" tag onClick={() => deselectCases(selectedCaseIds)}>
        Deselect all
      </Button>
    );
  }

  return (
    <Button size="sm" color="subtleBg" tag onClick={() => selectCases(availableCaseIds)}>
      Select all
    </Button>
  );
};

TrainerActions.propTypes = {
  availableCaseIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedCaseIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectCases: PropTypes.func.isRequired,
  deselectCases: PropTypes.func.isRequired
};

export default TrainerActions;
