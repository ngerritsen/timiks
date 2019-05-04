export function canReset(state) {
  return state.timer.startTime > 0 || state.timer.stopTime > 0;
}
