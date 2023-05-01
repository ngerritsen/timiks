const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;

export function formatLocalDateTime(date) {
  return formatLocalDate(date) + " " + formatLocalTime(date);
}

export function formatLocalDate(date) {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    day: "numeric",
    month: "long",
  });
}

export function formatLocalTime(date) {
  return date.toLocaleTimeString();
}

export function getDateForDaysAgo(daysAgo) {
  return new Date(Date.now() - daysAgo * MILLISECONDS_PER_DAY);
}
