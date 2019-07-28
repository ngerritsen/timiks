export const isOnline = () =>
  window.navigator.onLine === undefined ? true : window.navigator.onLine;
