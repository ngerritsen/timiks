import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/fontawesome-pro-solid'

import { ACTIVATION_DURATION_OPTIONS } from '../constants/app';
import IconButton from './shared/IconButton';
import ModalContainer from '../containers/ModalContainer';
import Section from './shared/Section';
import Selector from './shared/Selector';
import Button from './shared/Button';

const Settings = ({
  changeActivationDuration,
  activationDuration,
  toggleInspectionTime,
  useInspectionTime,
  changeTheme,
  theme
}) => (
  <span>
    <ModalContainer
      title="Settings"
      id="settings"
      toggle={openModal => (
        <IconButton onClick={openModal}><FontAwesome icon={faCog}/></IconButton>
      )}
      content={closeModal => (
        <div>
          <Section margin="sm">
              <Selector
                label="Activation delay*"
                onChange={changeActivationDuration}
                options={ACTIVATION_DURATION_OPTIONS}
                value={activationDuration}
                numeric
              />
          </Section>
          <Section margin="sm">
            <label>
              <Checkbox type="checkbox" onChange={toggleInspectionTime} checked={useInspectionTime}/>
              Use inspection time
            </label>
          </Section>
          <Section margin="md">
            <label>
              <Checkbox
                type="checkbox"
                onChange={() => changeTheme(theme === 'dark' ? 'light' : 'dark')}
                checked={theme === 'dark'}
              />
              Night mode
            </label>
          </Section>
          <Section margin="md">
            <i>*For how long you have to hold spacebar, mouse or touch before starting the timer.</i>
          </Section>
          <Button onClick={closeModal}>Close</Button>
        </div>
      )}
    />
  </span>
);

const Checkbox = styled.input`
  margin-right: ${props => props.theme.sizes.xs};
  cursor: pointer;
`;

Settings.propTypes = {
  activationDuration: PropTypes.number.isRequired,
  changeActivationDuration: PropTypes.func.isRequired,
  toggleInspectionTime: PropTypes.func.isRequired,
  useInspectionTime: PropTypes.bool.isRequired,
  changeTheme: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired
};

export default Settings;
