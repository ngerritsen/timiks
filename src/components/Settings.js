import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FontAwesome from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/fontawesome-pro-solid'

import puzzles from '../constants/puzzles';
import Modal from './Modal';
import Button from './Button';
import Section from './Section';
import IconButton from './IconButton';

const Settings = ({
  changePuzzle,
  closeSettings,
  isOpen,
  openSettings,
  puzzle
}) => (
  <span>
    <IconButton onClick={openSettings}>
      <FontAwesome icon={faCog} size="2x"/>
    </IconButton>
    <Modal isOpen={isOpen} title="Settings">
      <SettingsSection>
        <Label>Puzzle:</Label>
        <Select value={puzzle} onChange={event => changePuzzle(event.target.value)}>
          {puzzles.map(({ name: puzzle }) =>
            <option key={puzzle} value={puzzle}>
              {puzzle}
            </option>
          )}
        </Select>
      </SettingsSection>
      <Button onClick={closeSettings}>Close</Button>
    </Modal>
  </span>
);

Settings.propTypes = {
  changePuzzle: PropTypes.func.isRequired,
  closeSettings: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  openSettings: PropTypes.func.isRequired,
  puzzle: PropTypes.string.isRequired
};

const SettingsSection = Section.extend`
  display: flex;
  justify-content: space-between;
`;

const Label = styled.label`
  font-size: 1.8rem;
`;

const Select = styled.select`
  font-size: 1.6rem;
  margin-left: ${props => props.theme.sizes.sm};
`

export default Settings;
