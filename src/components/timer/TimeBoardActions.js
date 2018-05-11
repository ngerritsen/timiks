import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from '@fortawesome/react-fontawesome';
import { faArchive, faTrash } from '@fortawesome/fontawesome-pro-solid';

import IconButton from '../shared/IconButton';
import ModalContainer from '../../containers/ModalContainer';
import ArchiveForm from '../archive/ArchiveForm';
import Section from '../shared/Section';
import Button from '../shared/Button';
import { ButtonDuo, ButtonDuoItem } from '../shared/ButtonDuo';
import { Toolbar, ToolbarItem } from '../shared/Toolbar';

const TimeBoardActions = ({
  inputTimesTitle,
  archiveCurrentTimes,
  clearTimes,
  titleInput
}) => (
  <Toolbar>
    <ToolbarItem>
      <ModalContainer
        title="Archive times"
        id="archiveTimes"
        showCloseButton={false}
        toggle={(openModal) => (
          <IconButton color="blue" onClick={openModal}>
            <FontAwesome icon={faArchive} />
          </IconButton>
        )}
        content={(closeModal) => (
          <ArchiveForm
            archiveCurrentTimes={() => archiveCurrentTimes() && closeModal()}
            inputTimesTitle={inputTimesTitle}
            titleInput={titleInput}
            onCancel={closeModal}
          />
        )}
      />
    </ToolbarItem>

    <ToolbarItem>
      <ModalContainer
        title="Clear current times"
        id="clearCurrentTimes"
        toggle={openModal => (
          <IconButton color="red" onClick={openModal}>
            <FontAwesome icon={faTrash} />
          </IconButton>
        )}
        content={closeModal => (
          <div>
            <Section margin="md">
              <p>Are you sure you want to clear the current times?</p>
            </Section>
            <ButtonDuo>
              <ButtonDuoItem>
                <Button danger onClick={() => closeModal() && clearTimes()}>Remove</Button>
              </ButtonDuoItem>
              <ButtonDuoItem>
                <Button fg empty onClick={closeModal}>Cancel</Button>
              </ButtonDuoItem>
            </ButtonDuo>
          </div>
        )}
      />
    </ToolbarItem>
  </Toolbar>
);

TimeBoardActions.propTypes = {
  archiveCurrentTimes: PropTypes.func.isRequired,
  clearTimes: PropTypes.func.isRequired,
  inputTimesTitle: PropTypes.func.isRequired,
  titleInput: PropTypes.string.isRequired
}

export default TimeBoardActions;
