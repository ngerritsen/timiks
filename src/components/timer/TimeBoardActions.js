import React from 'react';
import PropTypes from 'prop-types';
import faTrash from '@fortawesome/fontawesome-pro-solid/faTrash';
import faArchive from '@fortawesome/fontawesome-pro-solid/faArchive';

import InlineFontawesome from '../shared/InlineFontawesome';
import Button from '../shared/Button';
import ToggleContent from '../shared/ToggleContent';
import Section from '../shared/Section';
import { ButtonDuo, ButtonDuoItem } from '../shared/ButtonDuo';
import { Toolbar, ToolbarItem } from '../shared/Toolbar';
import Shortcut from '../shared/Shortcut';
import Modal from '../shared/Modal';

const TimeBoardActions = ({ archiveTimes, clearTimes }) => (
  <Toolbar>
    <ToolbarItem>
      <ToggleContent
        toggle={({ show }) => (
          <Button size="sm" tag onClick={show}>
            <Shortcut command="archiveTimes" action={show} />
            <InlineFontawesome icon={faArchive} /> Archive
          </Button>
        )}
        content={({ hide }) => (
          <Modal title="Archive times" onClose={hide}>
            <>
              <Section margin="md">
                <p>Move the current times to the archive?</p>
              </Section>
              <ButtonDuo>
                <ButtonDuoItem>
                  <Button color="subtleFg" outline onClick={hide}>
                    Cancel
                  </Button>
                </ButtonDuoItem>
                <ButtonDuoItem>
                  <Button
                    onClick={() => {
                      hide();
                      archiveTimes();
                    }}
                  >
                    Archive
                  </Button>
                </ButtonDuoItem>
              </ButtonDuo>
            </>
          </Modal>
        )}
      />
    </ToolbarItem>

    <ToolbarItem>
      <ToggleContent
        toggle={({ show }) => (
          <Button size="sm" tag color="red" onClick={show}>
            <Shortcut command="clearTimes" action={show} />
            <InlineFontawesome icon={faTrash} /> Clear
          </Button>
        )}
        content={({ hide }) => (
          <Modal title="Clear current times" onClose={hide}>
            <>
              <Section margin="md">
                <p>Are you sure you want to clear the current times?</p>
              </Section>
              <ButtonDuo>
                <ButtonDuoItem>
                  <Button color="subtleFg" outline onClick={hide}>
                    Cancel
                  </Button>
                </ButtonDuoItem>
                <ButtonDuoItem>
                  <Button
                    color="red"
                    onClick={() => {
                      hide();
                      clearTimes();
                    }}
                  >
                    Remove
                  </Button>
                </ButtonDuoItem>
              </ButtonDuo>
            </>
          </Modal>
        )}
      />
    </ToolbarItem>
  </Toolbar>
);

TimeBoardActions.propTypes = {
  archiveTimes: PropTypes.func.isRequired,
  clearTimes: PropTypes.func.isRequired
};

export default TimeBoardActions;
