const MS_IN_SECONDS = 1000;
const SECONDS_IN_MINUTES = 60;
const MS_IN_MINUTES = SECONDS_IN_MINUTES * MS_IN_SECONDS;

export function breakUpTime(ms) {
  let milliseconds = Math.round(ms);

  const minutes = Math.floor(milliseconds / MS_IN_MINUTES);

  milliseconds -= minutes * MS_IN_MINUTES;

  const seconds = Math.floor(milliseconds / MS_IN_SECONDS);

  milliseconds -= seconds * MS_IN_SECONDS;

  return { minutes, seconds, milliseconds };
}
