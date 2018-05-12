export function getLastTime(state) {
  return state.times.current.find(time => time.id === state.timer.lastTimeId);
}
