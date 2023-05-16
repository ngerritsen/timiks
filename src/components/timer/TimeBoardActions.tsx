import React from "react";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons/faTrashAlt";
import { faArchive } from "@fortawesome/free-solid-svg-icons/faArchive";

import InlineFontawesome from "../shared/InlineFontawesome";
import Button from "../shared/Button";
import ToggleContent from "../shared/ToggleContent";
import Section from "../shared/Section";
import { ButtonDuo, ButtonDuoItem } from "../shared/ButtonDuo";
import { Toolbar, ToolbarItem } from "../shared/Toolbar";
import Shortcut from "../shared/Shortcut";
import Modal from "../shared/Modal";
import { VisibleFrom, HiddenFrom } from "../shared/Visibility";
import { useDispatch } from "react-redux";
import { archiveTimes, clearTimes } from "../../slices/times";

const TimeBoardActions = () => {
  const dispatch = useDispatch();
  const archiveButton = (
    <ToggleContent
      toggle={({ toggle }) => (
        <Button size="sm" onClick={toggle}>
          <Shortcut command="archiveTimes" action={toggle} />
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
                    dispatch(archiveTimes());
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
  );

  const clearButton = (
    <ToggleContent
      toggle={({ toggle }) => (
        <Button size="sm" color="red" onClick={toggle}>
          <Shortcut command="clearTimes" action={toggle} />
          <InlineFontawesome icon={faTrashAlt} /> Clear
        </Button>
      )}
      content={({ hide }) => (
        <Modal title="Clear current times" onClose={hide}>
          <>
            <Section margin="md">
              <p>Are you sure you want to remove the current times?</p>
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
                    dispatch(clearTimes());
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
  );

  return (
    <>
      <VisibleFrom breakpoint="sm">
        <Toolbar right>
          <ToolbarItem>{archiveButton}</ToolbarItem>
          <ToolbarItem>{clearButton}</ToolbarItem>
        </Toolbar>
      </VisibleFrom>
      <HiddenFrom breakpoint="sm">
        <Toolbar>
          <ToolbarItem grow>{archiveButton}</ToolbarItem>
          <ToolbarItem grow>{clearButton}</ToolbarItem>
        </Toolbar>
      </HiddenFrom>
    </>
  );
};

export default TimeBoardActions;
