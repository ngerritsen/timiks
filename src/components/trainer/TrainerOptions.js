import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStepForward } from '@fortawesome/pro-solid-svg-icons/faStepForward';

import Select from '../shared/Select';
import { types } from '../../constants/trainer';
import { Toolbar, ToolbarItem } from '../shared/Toolbar';
import Button, { ButtonIcon } from '../shared/Button';
import Shortcut from '../shared/Shortcut';

const typeOptions = types.map(type => ({ label: type, value: type }));

const TrainerOptions = ({ changeTrainingType, type, requestNextCase }) => (
  <Toolbar>
    <ToolbarItem>Train:</ToolbarItem>
    <ToolbarItem>
      <Select onChange={type => changeTrainingType(type)} options={typeOptions} value={type} />
    </ToolbarItem>
    <ToolbarItem>
      <Shortcut command="requestNextCase" action={requestNextCase} />
      <Button size="sm" onClick={requestNextCase} color="subtleBg">
        <ButtonIcon>
          <FontAwesomeIcon icon={faStepForward} />
        </ButtonIcon>
        Next case
      </Button>
    </ToolbarItem>
  </Toolbar>
);

TrainerOptions.propTypes = {
  type: PropTypes.string.isRequired,
  changeTrainingType: PropTypes.func.isRequired,
  requestNextCase: PropTypes.func.isRequired
};

export default TrainerOptions;
