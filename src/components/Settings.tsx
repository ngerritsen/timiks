import styled from "styled-components";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons/faCog";
import { useDispatch, useSelector } from "react-redux";

import { THEME_OPTIONS } from "../constants/theme";
import Shortcut from "./shared/Shortcut";
import {
  ACTIVATION_DURATION_OPTIONS,
  BUTTON_COLORS,
} from "../constants/settings";
import IconButton from "./shared/IconButton";
import ToggleContent from "./shared/ToggleContent";
import Section from "./shared/Section";
import Select from "./shared/Select";
import Checkbox from "./shared/Checkbox";
import Button from "./shared/Button";
import Modal from "./shared/Modal";
import { getSize, getColor } from "../helpers/theme";
import { getSettings } from "../selectors/settings";
import { SettingsState, changeSetting } from "../slices/settings";

const Settings = () => {
  const settings = useSelector(getSettings);
  const dispatch = useDispatch();
  const set =
    <T extends keyof SettingsState>(setting: T) =>
    (value: SettingsState[T]) => {
      dispatch(changeSetting({ setting, value }));
    };

  return (
    <>
      <ToggleContent
        toggle={({ show, toggle }) => (
          <IconButton onClick={show}>
            <div
              style={{
                display: "x",
              }}
            />
            <Shortcut command="openSettings" action={toggle} />
            {settings.theme !== "auto" && (
              <Shortcut
                command="toggleDarkMode"
                action={() =>
                  set("theme")(settings.theme === "dark" ? "light" : "dark")
                }
              />
            )}
            <FontAwesomeIcon icon={faCog} fixedWidth />
          </IconButton>
        )}
        content={({ hide }) => (
          <Modal title="Settings" onClose={hide}>
            <>
              <Section margin="md">
                <SectionTitle>Timer</SectionTitle>
                <Section margin="sm">
                  <Setting>
                    <label>Activation delay*</label>
                    <Select
                      onChange={set("activationDuration")}
                      options={ACTIVATION_DURATION_OPTIONS}
                      value={settings.activationDuration}
                      numeric
                      fullWidth
                    />
                  </Setting>
                </Section>
                <Section margin="sm">
                  <Setting>
                    <label>Use inspection time</label>
                    <Checkbox
                      onChange={set("useInspectionTime")}
                      checked={settings.useInspectionTime}
                    />
                  </Setting>
                </Section>
                <Section margin="sm">
                  <Setting>
                    <label>Voice alert for inspection time**</label>
                    <Checkbox
                      onChange={set("warnForInspectionTime")}
                      checked={settings.warnForInspectionTime}
                    />
                  </Setting>
                </Section>
                <Section margin="sm">
                  <Setting>
                    <label>Manual time entry</label>
                    <Checkbox
                      onChange={set("useManualTimeEntry")}
                      checked={settings.useManualTimeEntry}
                    />
                  </Setting>
                </Section>
                <Section margin="sm">
                  <Setting>
                    <label>Hide time during solve</label>
                    <Checkbox
                      inverse
                      onChange={set("showTimerTime")}
                      checked={settings.showTimerTime}
                    />
                  </Setting>
                </Section>
                <Section margin="sm">
                  <Setting>
                    <label>Show latest solve on top</label>
                    <Checkbox
                      onChange={set("showLatestSolveOnTop")}
                      checked={settings.showLatestSolveOnTop}
                    />
                  </Setting>
                </Section>
              </Section>
              <Section margin="md">
                <SectionTitle>User Interface</SectionTitle>
                <Section margin="sm">
                  <Setting>
                    <label>Theme</label>
                    <Select
                      onChange={set("theme")}
                      options={THEME_OPTIONS}
                      value={settings.theme}
                      fullWidth
                    />
                  </Setting>
                </Section>
                <Section margin="sm">
                  <Setting>
                    <label>Start button color</label>
                    <Select
                      onChange={set("buttonColor")}
                      options={BUTTON_COLORS}
                      value={settings.buttonColor}
                      fullWidth
                    />
                  </Setting>
                </Section>
                <Section margin="sm">
                  <Setting>
                    <label>Start button color in dark mode</label>
                    <Select
                      onChange={set("buttonColorDarkMode")}
                      options={[
                        { label: "Inherit", value: "" },
                        ...BUTTON_COLORS,
                      ]}
                      value={settings.buttonColorDarkMode}
                      fullWidth
                    />
                  </Setting>
                </Section>
                <Section margin="sm">
                  <Setting>
                    <label>Start graph y-axis from zero</label>
                    <Checkbox
                      onChange={set("fixGraphYAxis")}
                      checked={settings.fixGraphYAxis}
                    />
                  </Setting>
                </Section>
              </Section>
              <Section margin="md">
                <SectionTitle>Trainer</SectionTitle>
                <Section margin="sm">
                  <Setting>
                    <label>Hide trainer times</label>
                    <Checkbox
                      onChange={set("hideTrainerTimes")}
                      checked={settings.hideTrainerTimes}
                    />
                  </Setting>
                </Section>
              </Section>
              <Section margin="xs">
                <Explanation>
                  *For how long you have to hold spacebar, mouse or touch before
                  starting the timer.
                </Explanation>
              </Section>
              <Section margin="md">
                <Explanation>
                  **Does not work on most mobile devices due to browser
                  restrictions.
                </Explanation>
              </Section>
              <Button onClick={hide}>Close</Button>
            </>
          </Modal>
        )}
      />
    </>
  );
};

const Setting = styled.label`
  display: flex;
  justify-content: space-between;
  height: 2.2rem;
  align-items: center;
  padding-right: ${getSize("xxs")};
`;

const SectionTitle = styled.h3`
  margin: 0 0 ${getSize("sm")};
  font-weight: bold;
  font-size: 1.7rem;
`;

const Explanation = styled.span`
  margin: 0;
  padding: 0;
  color: ${getColor("subtleFg")};
  font-style: italic;
`;

export default React.memo(Settings);
