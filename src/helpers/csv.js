import { getMs } from './time';

const ROW_DELIMITER = '\n';
const COLUMN_DELIMTER = ',';

export function timesToCsv(times) {
  const headers = ['id', 'ms', 'date', 'puzzle', 'scramble', 'plus2', 'dnf'].join(COLUMN_DELIMTER);
  const rows = times.map(time =>
    [
      time.id,
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

export function parseCsv(csv, delimiter = ',', escapeChar = '"') {
  let headers = [];

  return csv
    .trim()
    .split('\n')
    .map((line, lineNumber) => {
      if (!line.trim()) {
        return;
      }

      const columns = [];
      let currentColumn = '';
      let inEscape = false;

      for (let i = 0; i < line.length; i++) {
        const char = line[i];

        if (char === delimiter && !inEscape) {
          columns.push(currentColumn);
          currentColumn = '';
        } else if (char === escapeChar && !inEscape) {
          inEscape = true;
        } else if (char === escapeChar && inEscape && line[i + 1] === delimiter) {
          inEscape = false;
        } else {
          currentColumn += char;
        }
      }

      if (lineNumber === 0) {
        headers = columns;
        return;
      }

      return headers.reduce(
        (columnData, header, i) => ({
          ...columnData,
          [header]: columns[i]
        }),
        {}
      );
    })
    .filter(Boolean);
}
