export function formatTime(ms) {
  const secondsString = (ms / 1000).toFixed(2);

  return secondsString.length === 4 ?
    '0' + secondsString :
    secondsString
}
