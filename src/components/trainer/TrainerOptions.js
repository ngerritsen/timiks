import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStepForward } from '@fortawesome/pro-solid-svg-icons/faStepForward';
import { faPlay } from '@fortawesome/pro-solid-svg-icons/faPlay';
import { faStop } from '@fortawesome/pro-solid-svg-icons/faStop';

import Select from '../shared/Select';
import { types } from '../../constants/trainer';
import { Toolbar, ToolbarItem } from '../shared/Toolbar';
import Button, { ButtonIcon } from '../shared/Button';
import Shortcut from '../shared/Shortcut';

const typeOptions = types.map(type => ({ label: type, value: type }));

const TrainerOptions = ({
  changeTrainingType,
  trainingType,
  requestNextCase,
  startRehearsal,
  stopRehearsal,
  inRehearsal
}) => (
  <Toolbar>
    <ToolbarItem>
      <Select
        onChange={type => changeTrainingType(type)}
        options={typeOptions}
        value={trainingType}
      />
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
    <ToolbarItem>
      {!inRehearsal && (
        <Button size="sm" onClick={startRehearsal} color="subtleBg">
          <ButtonIcon>
            <FontAwesomeIcon icon={faPlay} />
          </ButtonIcon>
          Rehearsal
        </Button>
      )}
      {inRehearsal && (
        <Button size="sm" onClick={stopRehearsal} color="orange">
          <ButtonIcon>
            <FontAwesomeIcon icon={faStop} />
          </ButtonIcon>
          Rehearsal
        </Button>
      )}
    </ToolbarItem>
  </Toolbar>
);

TrainerOptions.propTypes = {
  trainingType: PropTypes.string.isRequired,
  changeTrainingType: PropTypes.func.isRequired,
  requestNextCase: PropTypes.func.isRequired,
  startRehearsal: PropTypes.func.isRequired,
  inRehearsal: PropTypes.bool,
  stopRehearsal: PropTypes.func.isRequired
};

export default TrainerOptions;
