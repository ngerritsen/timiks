export function formatDateTime(date) {
  return formatDate(date) + ' ' + formatTime(date);
}

export function formatDate(date) {
  return date.toLocaleDateString('en-US', { year: 'numeric', day: 'numeric', month: 'long' });
}

export function formatTime(date) {
  return date.toLocaleTimeString();
}
