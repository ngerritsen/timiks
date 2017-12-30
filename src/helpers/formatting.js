export function formatTime(ms, decimals = 2) {
  const secondsString = (ms / 1000).toFixed(decimals);

  return secondsString.length === (2 + decimals) ?
    '0' + secondsString :
    secondsString
}
