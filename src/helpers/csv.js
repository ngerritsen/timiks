import { getMs } from './time';

const ROW_DELIMITER = '\n';
const COLUMN_DELIMTER = ',';

export function timesToCsv(times) {
  const headers = ['ms', 'date', 'puzzle', 'scramble', 'plus2', 'dnf'].join(COLUMN_DELIMTER);
  const rows = times.map(time =>
    [
      getMs(time),
      time.date.toISOString(),
      time.puzzle,
      time.scramble.join(' '),
      time.plus2 ? 'yes' : '',
      time.dnf ? 'yes' : ''
    ].join(COLUMN_DELIMTER)
  );

  return [headers, rows.join(ROW_DELIMITER)].join(ROW_DELIMITER);
}
