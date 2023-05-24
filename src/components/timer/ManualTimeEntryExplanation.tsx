import React from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons/faQuestionCircle";

import ToggleContent from "../shared/ToggleContent";
import IconButton from "../shared/IconButton";
import Section from "../shared/Section";
import Modal from "../shared/Modal";
import { getTimeEntryShorthandPrecision } from "../../selectors/settings";

const ManualTimeEntryExplanation = () => {
  const shorthandPrecision = useSelector(getTimeEntryShorthandPrecision);

  return (
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
              The format for entering a time is <strong>H:mm:ss.SSS</strong>{" "}
              where only the seconds part is required.
            </p>

            <p>
              For plus 2 penalties add <strong>+2</strong> at the end of the
              time (for example: <i>4.22+2</i>).
            </p>

            <p>
              For DNF solves simply enter <strong>dnf</strong> (case
              insensitive).
            </p>

            <p>
              Use Enter or Space or start typing a number to quickly focus the
              input field from anywhere.
            </p>

            <h4>Examples</h4>
            <ul>
              <li>
                <strong>2:42.24</strong> - <i>2 min., 42 sec. and 24 ms</i>
              </li>
              <li>
                <strong>15</strong> - <i>15 sec. and 0 ms</i>
              </li>
              <li>
                <strong>16.321</strong> - <i>16 sec. and 321 ms</i>
              </li>
              <li>
                <strong>1:3:12</strong> - <i>1 hour, 3 minutes and 12 sec.</i>
              </li>
              <li>
                <strong>32.12+2</strong> -{" "}
                <i>32 sec. and 12ms with a 2 sec. penalty</i>
              </li>
              <li>
                <strong>dnf</strong> - <i>a DNF</i>
              </li>
            </ul>

            <h3>Shorthand</h3>
            <p>
              With the shorthand syntax you can add minutes, seconds and
              milliseconds without using separators. By default you have to
              enter it in millisecond precision (3 digits) but this can be
              changed in the settings by changing the time entry precision.
            </p>

            <h4>
              Shorthand examples (based on current precision of{" "}
              {shorthandPrecision}):
            </h4>

            {shorthandPrecision === 3 ? (
              <ul>
                <li>
                  <strong>23890</strong> - <i>23 sec., 890 ms</i>
                </li>
                <li>
                  <strong>302</strong> - <i>0 sec., 302 ms</i>
                </li>
                <li>
                  <strong>503123</strong> - <i>5 min., 3 sec., 123 ms</i>
                </li>
              </ul>
            ) : (
              <ul>
                <li>
                  <strong>23890</strong> - <i>2 min. 38 sec., 900 ms</i>
                </li>
                <li>
                  <strong>302</strong> - <i>3 sec., 020 ms</i>
                </li>
                <li>
                  <strong>503123</strong> - <i>50 min., 31 sec., 230 ms</i>
                </li>
              </ul>
            )}
          </Section>
        </Modal>
      )}
    />
  );
};

export default ManualTimeEntryExplanation;
