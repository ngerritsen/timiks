import { useSelector } from "react-redux";
import { getSettings } from "../selectors/settings";
import { useEffect, useState } from "react";
import { ThemeType } from "../types";

export function useTheme(): ThemeType {
  const { theme } = useSelector(getSettings);

  if (!window.matchMedia) {
    return theme === "auto" ? "light" : theme;
  }

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const [prefersDark, setPrefersDark] = useState(mediaQuery.matches);

  useEffect(() => {
    mediaQuery.addEventListener("change", (event) => {
      setPrefersDark(event.matches);
    });
  }, []);

  if (theme === "auto") {
    return prefersDark ? "dark" : "light";
  }

  return theme;
}
