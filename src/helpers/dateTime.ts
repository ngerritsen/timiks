const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;

export function formatLocalDateTime(date: Date) {
  return formatLocalDate(date) + " " + formatLocalTime(date);
}

export function formatLocalDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    day: "numeric",
    month: "long",
  });
}

export function formatLocalTime(date: Date) {
  return date.toLocaleTimeString();
}

export function getDateForDaysAgo(daysAgo: number) {
  return new Date(Date.now() - daysAgo * MILLISECONDS_PER_DAY);
}
