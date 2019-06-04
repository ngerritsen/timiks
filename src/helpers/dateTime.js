export function formatLocalDateTime(date) {
  return formatLocalDate(date) + ' ' + formatLocalTime(date);
}

export function formatLocalDate(date) {
  return date.toLocaleDateString('en-US', { year: 'numeric', day: 'numeric', month: 'long' });
}

export function formatLocalTime(date) {
  return date.toLocaleTimeString();
}
