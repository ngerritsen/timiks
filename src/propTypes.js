import PropTypes from 'prop-types';
import { AVERAGE, STANDARD_DEVIATION, SINGLE, MEAN } from './constants/stats';

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
  scramble: PropTypes.string,
  stored: PropTypes.bool,
  dirty: PropTypes.bool
});

export const GraphLine = PropTypes.shape({
  name: PropTypes.string.isRequired,
  enabled: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired
});

export const PreviewArrows = PropTypes.arrayOf(
  PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.bool]))
);

export const TrainingTime = PropTypes.shape({
  ms: PropTypes.number.isRequired,
  caseId: PropTypes.string.isRequired,
  trainingType: PropTypes.isRequired
});

export const Case = PropTypes.shape({
  name: PropTypes.string.isRequired,
  times: PropTypes.arrayOf(TrainingTime),
  mean: PropTypes.number,
  algs: PropTypes.arrayOf(PropTypes.string).isRequired,
  probability: PropTypes.number.isRequired,
  selected: PropTypes.bool,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  category: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
  previewArrows: PreviewArrows
});

export const CaseCategory = PropTypes.shape({
  name: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  cases: PropTypes.arrayOf(Case).isRequired
});
