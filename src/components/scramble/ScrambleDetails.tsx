import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons/faEye";

import IconButton from "../shared/IconButton";
import Shortcut from "../shared/Shortcut";
import Modal from "../shared/Modal";
import ToggleContent from "../shared/ToggleContent";
import Scramble from "./Scramble";
import Section from "../shared/Section";

type ScrambleDetailsProps = {
  scramble: string;
  puzzle: string;
};

const ScrambleDetails = ({ scramble, puzzle }: ScrambleDetailsProps) => (
  <ToggleContent
    toggle={({ show, toggle }) => (
      <IconButton onClick={show}>
        <Shortcut command="showScramble" action={toggle} />
        <FontAwesomeIcon icon={faEye} />
      </IconButton>
    )}
    content={({ hide }) => (
      <Modal title="Scramble details" onClose={hide}>
        <Section margin="sm">
          <Scramble scramble={scramble} puzzle={puzzle} withPreview />
        </Section>
      </Modal>
    )}
  />
);

export default ScrambleDetails;
