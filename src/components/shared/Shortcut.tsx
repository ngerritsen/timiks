import { useEffect, useMemo } from "react";
import keycode from "keycode";

import { TIMER_COOLDOWN } from "../../constants/timer";
import { useSelector } from "react-redux";
import { getStopTime, isStopped } from "../../selectors/timer";
import keymap from "../../constants/keymap";

type ShortcutProps = {
  command: string;
  action: () => void;
};

const inputElements = ["textarea", "input", "select"];

const Shortcut = ({ command, action }: ShortcutProps): null => {
  const stopped = useSelector(isStopped);
  const stopTime = useSelector(getStopTime);
  const key = useMemo(
    () =>
      (keymap.find((mapping) => mapping.commands.includes(command)) || {}).key,
    [command]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [command, action]);

  const handleKeyDown = (event: KeyboardEvent) => {
    const { ctrlKey, metaKey, shiftKey, altKey } = event;

    if (Date.now() - stopTime < TIMER_COOLDOWN) {
      return;
    }

    if (
      inputElements.includes(
        (event.target as HTMLElement).tagName.toLowerCase()
      )
    ) {
      return;
    }

    if (!stopped || ctrlKey || metaKey || shiftKey || altKey) {
      return;
    }

    if (keycode.isEventKey(event, key)) {
      event.preventDefault();
      action();
    }
  };

  return null;
};

export default Shortcut;
