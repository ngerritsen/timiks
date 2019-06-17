import { getMs } from './time';

const ROW_DELIMITER = '\n';
const COLUMN_DELIMTER = ',';
const ESCAPE_CHAR = '"';

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

export function parseCsv(csv, delimiter = COLUMN_DELIMTER, headers = []) {
  const trimmedCsv = csv.trim();
  const rows = [];

  let currentRow = [];
  let currentColumn = '';
  let inEscape = false;

  for (let i = 0; i < trimmedCsv.length; i++) {
    const char = trimmedCsv[i];
    const nextChar = trimmedCsv[i + 1];
    const isLast = i === trimmedCsv.length - 1;

    if (char === delimiter && !inEscape) {
      currentRow.push(currentColumn);
      currentColumn = '';
      continue;
    }

    if (char === ESCAPE_CHAR && !inEscape) {
      inEscape = true;
      continue;
    }

    if (char === ESCAPE_CHAR && nextChar === ESCAPE_CHAR) {
      continue;
    }

    if (char === ESCAPE_CHAR && [delimiter, ROW_DELIMITER].includes(nextChar)) {
      inEscape = false;
      continue;
    }

    if ((char === ROW_DELIMITER || isLast) && (!inEscape || char === ESCAPE_CHAR)) {
      inEscape = false;
      currentRow.push(currentColumn);
      currentColumn = '';

      if (headers.length === 0) {
        headers = currentRow;
      } else {
        rows.push(currentRow);
      }

      currentRow = [];
      continue;
    }

    currentColumn += char;
  }

  return rows.map(row =>
    headers.reduce(
      (columnData, header, i) => ({
        ...columnData,
        [header]: row[i]
      }),
      {}
    )
  );
}
