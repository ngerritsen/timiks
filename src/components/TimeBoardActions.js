import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FontAwesome from '@fortawesome/react-fontawesome';
import { faSave, faTrash } from '@fortawesome/fontawesome-pro-solid'

import IconButton from './IconButton';
import Button from './Button';
import Modal from './Modal';
import Section from './Section';

const TimeBoardActions = ({
    clearTimes,
    closeSaveTimesModal,
    inputTimesTitle,
    isModalOpen,
    openSaveTimesModal,
    saveTimes,
    titleInput
}) => {
  const canSubmit = titleInput.trim().length > 0;
  const onSubmit = event => {
    event.preventDefault();

    if (canSubmit) {
      saveTimes(titleInput);
    }
  }

  return (
    <Toolbar>
      <ToolbarItem>
        <IconButton color="blue" onClick={openSaveTimesModal}>
          <FontAwesome icon={faSave} />
        </IconButton>
      </ToolbarItem>

      <ToolbarItem>
        <IconButton color="red" onClick={clearTimes}>
          <FontAwesome icon={faTrash} />
        </IconButton>

        <Modal isOpen={isModalOpen} title="Save times">
          <form onSubmit={onSubmit}>
            <Section>
              <TitleInput
                value={titleInput}
                placeholder="Title"
                type="text"
                onInput={e => inputTimesTitle(e.target.value)}
              />
            </Section>

            <ButtonDuo>
              <ButtonDuoItem>
                <Button disabled={!canSubmit} type="submit">Save</Button>
              </ButtonDuoItem>
              <ButtonDuoItem>
                <Button danger type="button" onClick={closeSaveTimesModal}>Cancel</Button>
              </ButtonDuoItem>
            </ButtonDuo>
          </form>
        </Modal>
      </ToolbarItem>
    </Toolbar>
  );
};

TimeBoardActions.propTypes = {
  clearTimes: PropTypes.func.isRequired,
  closeSaveTimesModal: PropTypes.func.isRequired,
  inputTimesTitle: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  openSaveTimesModal: PropTypes.func.isRequired,
  saveTimes: PropTypes.func.isRequired,
  titleInput: PropTypes.string.isRequired
}

const Toolbar = styled.p`
  text-align: right;
  font-size: 1.75rem;
  margin: 0;
`;

const ToolbarItem = styled.span`
  margin-left: ${props => props.theme.sizes.sm};
`;

const ButtonDuo = styled.div`
  display: flex;
`;

const ButtonDuoItem = styled.div`
  flex-grow: 1;
  margin-right: ${props => props.theme.sizes.xs};

  &:last-child {
    margin-right: 0;
  }
`;

const TitleInput = styled.input`
  background: transparent;
  border: 1px solid ${props => props.theme.colors.subtleBg};
  font-size: 1.6rem;
  width: 100%;
  border-radius: 0.3rem;
  padding: ${props => props.theme.sizes.xs};
`;

export default TimeBoardActions;
