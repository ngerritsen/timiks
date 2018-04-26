import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FontAwesome from '@fortawesome/react-fontawesome';
import { faArchive, faTrash } from '@fortawesome/fontawesome-pro-solid';

import IconButton from '../shared/IconButton';
import Modal from '../shared/Modal';
import ArchiveForm from '../archive/ArchiveForm';

const TimeBoardActions = ({
    clearTimes,
    closeArchiveModal,
    inputTimesTitle,
    isModalOpen,
    openArchiveModal,
    archiveCurrentTimes,
    titleInput
}) => (
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
        <ArchiveForm
          archiveCurrentTimes={archiveCurrentTimes}
          onCancel={closeArchiveModal}
          inputTimesTitle={inputTimesTitle}
          titleInput={titleInput}
        />
      </Modal>
    </ToolbarItem>
  </Toolbar>
);

TimeBoardActions.propTypes = {
  archiveCurrentTimes: PropTypes.func.isRequired,
  clearTimes: PropTypes.func.isRequired,
  closeArchiveModal: PropTypes.func.isRequired,
  inputTimesTitle: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  openArchiveModal: PropTypes.func.isRequired,
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

export default TimeBoardActions;
