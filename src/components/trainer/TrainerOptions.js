import React from 'react';
import PropTypes from 'prop-types';

import Select from '../shared/Select';
import { types } from '../../constants/trainer';
import { Toolbar, ToolbarItem } from '../shared/Toolbar';

const typeOptions = types.map(type => ({ label: type, value: type }));

const TrainerOptions = ({ changeTrainingType, type }) => (
  <Toolbar>
    <ToolbarItem>Train: </ToolbarItem>
    <ToolbarItem>
      <Select onChange={type => changeTrainingType(type)} options={typeOptions} value={type} />
    </ToolbarItem>
  </Toolbar>
);

TrainerOptions.propTypes = {
  type: PropTypes.string.isRequired,
  changeTrainingType: PropTypes.func.isRequired
};

export default TrainerOptions;
