import React from 'react';
import PropTypes from 'prop-types';
import { faArchive, faTrash } from '@fortawesome/fontawesome-pro-solid';

import InlineFontawesome from '../shared/InlineFontawesome';
import Button from '../shared/Button';
import ToggleContent from '../ToggleContent';
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
          <Button tiny tag onClick={show}>
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
                  <Button
                    onClick={() => {
                      hide();
                      archiveTimes();
                    }}
                  >
                    Archive
                  </Button>
                </ButtonDuoItem>
                <ButtonDuoItem>
                  <Button neutral empty onClick={hide}>
                    Cancel
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
          <Button tiny tag danger onClick={show}>
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
                  <Button
                    danger
                    onClick={() => {
                      hide();
                      clearTimes();
                    }}
                  >
                    Remove
                  </Button>
                </ButtonDuoItem>
                <ButtonDuoItem>
                  <Button neutral empty onClick={hide}>
                    Cancel
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
