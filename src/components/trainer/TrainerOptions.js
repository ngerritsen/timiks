import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/pro-solid-svg-icons/faPlay';
import { faStop } from '@fortawesome/pro-solid-svg-icons/faStop';

import Select from '../shared/Select';
import { types } from '../../constants/trainer';
import { Toolbar, ToolbarItem } from '../shared/Toolbar';
import Button, { ButtonIcon } from '../shared/Button';

const typeOptions = types.map(type => ({ label: type, value: type }));

const TrainerOptions = ({
  changeTrainingType,
  trainingType,
  startRehearsal,
  stopRehearsal,
  inRehearsal
}) => {
  return (
    <>
      <Toolbar>
        <ToolbarItem>Train:</ToolbarItem>
        <ToolbarItem>
          <Select
            onChange={type => changeTrainingType(type)}
            options={typeOptions}
            value={trainingType}
          />
        </ToolbarItem>
        <ToolbarItem>
          {inRehearsal ? (
            <Button size="sm" onClick={stopRehearsal} color="orange">
              <ButtonIcon>
                <FontAwesomeIcon icon={faStop} />
              </ButtonIcon>
              Stop Rehearsal
            </Button>
          ) : (
            <Button size="sm" onClick={startRehearsal} color="subtleBg">
              <ButtonIcon>
                <FontAwesomeIcon icon={faPlay} />
              </ButtonIcon>
              Start Rehearsal
            </Button>
          )}
        </ToolbarItem>
      </Toolbar>
    </>
  );
};

TrainerOptions.propTypes = {
  trainingType: PropTypes.string.isRequired,
  changeTrainingType: PropTypes.func.isRequired,
  startRehearsal: PropTypes.func.isRequired,
  inRehearsal: PropTypes.bool,
  stopRehearsal: PropTypes.func.isRequired
};

export default TrainerOptions;
