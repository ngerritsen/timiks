import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons/faQuestionCircle';

import ToggleContent from '../shared/ToggleContent';
import IconButton from '../shared/IconButton';
import Section from '../shared/Section';
import Modal from '../shared/Modal';

const ManualTimeEntryExplanation = () => (
  <ToggleContent
    toggle={({ show }) => (
      <IconButton onClick={show} color="blue">
        <FontAwesomeIcon icon={faQuestionCircle} size="sm" />
      </IconButton>
    )}
    content={({ hide }) => (
      <Modal title="Manual time entry" onClose={hide}>
        <Section margin="sm">
          <p>
            The format for entering a time is <strong>H:mm:ss.SSS</strong> where only the seconds
            part is required.
          </p>

          <p>
            For plus 2 penalties add <strong>+2</strong> at the end of the time (for example:{' '}
            <i>4.22+2</i>).
          </p>

          <p>
            For DNF solves simply enter <strong>dnf</strong> (case insensitive).
          </p>

          <h3>Examples</h3>
          <ul>
            <li>
              <strong>2:42.24</strong> - <i>2 min., 42 sec. and 24 ms</i>
            </li>
            <li>
              <strong>15</strong> - <i>15 sec. and 0 ms</i>
            </li>
            <li>
              <strong>1:3:12</strong> - <i>1 hour, 3 minutes and 12 sec.</i>
            </li>
            <li>
              <strong>32.12+2</strong> - <i>32 sec. and 12ms with a 2 sec. penalty</i>
            </li>
            <li>
              <strong>dnf</strong> - <i>a DNF</i>
            </li>
          </ul>
        </Section>
      </Modal>
    )}
  />
);

export default ManualTimeEntryExplanation;
