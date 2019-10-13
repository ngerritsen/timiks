import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/pro-regular-svg-icons/faCheckSquare';
import { faSquare } from '@fortawesome/pro-regular-svg-icons/faSquare';

import Button, { ButtonIcon } from '../shared/Button';

const TrainerActions = ({ availableCaseIds, selectedCaseIds, selectCases, deselectCases }) => {
  if (selectedCaseIds.length > 0) {
    return (
      <Button size="sm" color="subtleBg" tag onClick={() => deselectCases(selectedCaseIds)}>
        <ButtonIcon>
          <FontAwesomeIcon icon={faCheckSquare} />
        </ButtonIcon>
        Deselect all cases
      </Button>
    );
  }

  return (
    <Button size="sm" color="subtleBg" tag onClick={() => selectCases(availableCaseIds)}>
      <ButtonIcon>
        <FontAwesomeIcon icon={faSquare} />
      </ButtonIcon>
      Select all cases
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
