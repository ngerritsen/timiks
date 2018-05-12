import React from 'react';
import FontAwesome from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/fontawesome-pro-solid';

import ModalContainer from '../../containers/shared/ModalContainer';
import IconButton from '../shared/IconButton';
import Section from '../shared/Section';

const ManualTimeEntryExplanation = () => (
  <span>
    Enter a time and press enter or click submit. &nbsp;
    <ModalContainer
      title="Stats"
      id="statsInfo"
      toggle={openModal => (
        <IconButton onClick={openModal} color="blue">
          <FontAwesome icon={faQuestionCircle} size="sm" />
        </IconButton>
      )}
      content={() => (
        <Section margin="sm">
          <p>The format for entering a time is <strong>HH:mm:ss.SSS</strong> where only the seconds part is required.</p>

          <p>For plus 2 penalties add <strong>+2</strong> at the end of the time (for example: <i>4.22+2</i>).</p>

          <p>For DNF solves simply enter <strong>dnf</strong> (case insensitive).</p>
        </Section>
      )}
    />
  </span>
);

export default ManualTimeEntryExplanation;
