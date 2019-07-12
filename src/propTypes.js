import PropTypes from 'prop-types';
import { AVERAGE, STANDARD_DEVIATION, SINGLE, MEAN } from './constants/stats';

export const Scramble = PropTypes.arrayOf(PropTypes.string);

export const StatTime = PropTypes.shape({
  ms: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  includedIds: PropTypes.arrayOf(PropTypes.string),
  excludedIds: PropTypes.arrayOf(PropTypes.string)
});

export const Stat = PropTypes.shape({
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf([AVERAGE, STANDARD_DEVIATION, SINGLE, MEAN]),
  size: PropTypes.number,
  trim: PropTypes.number,
  showInGraph: PropTypes.bool,
  graphLineColor: PropTypes.string,
  all: PropTypes.arrayOf(StatTime),
  current: StatTime.isRequired,
  best: StatTime
});

export const Time = PropTypes.shape({
  date: PropTypes.instanceOf(Date),
  dnf: PropTypes.bool,
  id: PropTypes.string,
  ms: PropTypes.number,
  plus2: PropTypes.bool,
  puzzle: PropTypes.string,
  scramble: Scramble,
  stored: PropTypes.bool,
  dirty: PropTypes.bool
});

export const GraphLine = PropTypes.shape({
  name: PropTypes.string.isRequired,
  enabled: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired
});

export const Case = PropTypes.shape({
  name: PropTypes.string.isRequired,
  algs: PropTypes.arrayOf(PropTypes.string).isRequired,
  probability: PropTypes.number.isRequired,
  selected: PropTypes.bool,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  category: PropTypes.string.isRequired
});

export const CaseCategory = PropTypes.shape({
  name: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  cases: PropTypes.arrayOf(Case).isRequired
});
