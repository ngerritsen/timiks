import React from 'react';
import PropTypes from 'prop-types';
import { faArchive, faTrash } from '@fortawesome/fontawesome-pro-solid';

import InlineFontawesome from '../shared/InlineFontawesome';
import Button from '../shared/Button';
import ModalContainer from '../../containers/shared/ModalContainer';
import Section from '../shared/Section';
import { ButtonDuo, ButtonDuoItem } from '../shared/ButtonDuo';
import { Toolbar, ToolbarItem } from '../shared/Toolbar';
import Shortcut from '../shared/Shortcut';

const TimeBoardActions = ({ archiveTimes, clearTimes }) => (
  <Toolbar>
    <ToolbarItem>
      <ModalContainer
        title="Archive times"
        id="archiveTimes"
        showCloseButton={false}
        toggle={(openModal) => (
          <Button tiny tag onClick={openModal}>
            <Shortcut command="archiveTimes" action={openModal} />
            <InlineFontawesome icon={faArchive} /> Archive
          </Button>
        )}
        content={(closeModal) => (
          <div>
            <Section margin="md">
              <p>Move the current times to the archive?</p>
            </Section>
            <ButtonDuo>
              <ButtonDuoItem>
                <Button onClick={() => { closeModal(); archiveTimes(); }}>Archive</Button>
              </ButtonDuoItem>
              <ButtonDuoItem>
                <Button fg empty onClick={closeModal}>Cancel</Button>
              </ButtonDuoItem>
            </ButtonDuo>
          </div>
        )}
      />
    </ToolbarItem>

    <ToolbarItem>
      <ModalContainer
        title="Clear current times"
        id="clearCurrentTimes"
        toggle={openModal => (
          <Button tiny tag danger onClick={openModal}>
            <Shortcut command="clearTimes" action={openModal} />
            <InlineFontawesome icon={faTrash} /> Clear
          </Button>
        )}
        content={closeModal => (
          <div>
            <Section margin="md">
              <p>Are you sure you want to clear the current times?</p>
            </Section>
            <ButtonDuo>
              <ButtonDuoItem>
                <Button danger onClick={() => { closeModal(); clearTimes(); }}>Remove</Button>
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
  archiveTimes: PropTypes.func.isRequired,
  clearTimes: PropTypes.func.isRequired
}

export default TimeBoardActions;
