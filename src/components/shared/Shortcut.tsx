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
    () => (keymap.find((m) => m.commands.includes(command)) || {}).key,
    [command]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [command, action, stopped, stopTime]);

  const handleKeyDown = (event: KeyboardEvent) => {
    const { ctrlKey, metaKey, shiftKey, altKey, target } = event;
    const timerStopped = stopped && Date.now() - stopTime < TIMER_COOLDOWN;
    const elementTag = (target as HTMLElement).tagName;
    const isInput = inputElements.includes(elementTag.toLowerCase());
    const isKeyCombination = ctrlKey || metaKey || shiftKey || altKey;
    const keyMatches = keycode.isEventKey(event, key);

    if (!timerStopped && !isInput && !isKeyCombination && keyMatches) {
      event.preventDefault();
      action();
    }
  };

  return null;
};

export default Shortcut;
