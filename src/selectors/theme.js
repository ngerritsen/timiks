export const getTheme = (state) => state.theme.theme;
export const isInDarkMode = (state) => getTheme(state) === "dark";
