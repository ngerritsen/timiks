import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FontAwesome from '@fortawesome/react-fontawesome';
import { faArchive, faTrash } from '@fortawesome/fontawesome-pro-solid'

import IconButton from './IconButton';
import Button from './Button';
import Modal from './Modal';
import Section from './Section';

const TimeBoardActions = ({
    clearTimes,
    closeArchiveModal,
    inputTimesTitle,
    isModalOpen,
    openArchiveModal,
    archiveCurrentTimes,
    titleInput
}) => {
  const canSubmit = titleInput.trim().length > 0;
  const onSubmit = event => {
    event.preventDefault();

    if (canSubmit) {
      archiveCurrentTimes(titleInput);
    }
  }

  return (
    <Toolbar>
      <ToolbarItem>
        <IconButton color="blue" onClick={openArchiveModal}>
          <FontAwesome icon={faArchive} />
        </IconButton>
      </ToolbarItem>

      <ToolbarItem>
        <IconButton color="red" onClick={clearTimes}>
          <FontAwesome icon={faTrash} />
        </IconButton>

        <Modal isOpen={isModalOpen} title="Archive times">
          <form onSubmit={onSubmit}>
            <Section margin="md">
              <TitleInput
                value={titleInput}
                placeholder="Title"
                type="text"
                onInput={e => inputTimesTitle(e.target.value)}
              />
            </Section>

            <ButtonDuo>
              <ButtonDuoItem>
                <Button disabled={!canSubmit} type="submit">Archive</Button>
              </ButtonDuoItem>
              <ButtonDuoItem>
                <Button danger type="button" onClick={closeArchiveModal}>Cancel</Button>
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
  closeArchiveModal: PropTypes.func.isRequired,
  inputTimesTitle: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  openArchiveModal: PropTypes.func.isRequired,
  archiveCurrentTimes: PropTypes.func.isRequired,
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
