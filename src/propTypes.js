import PropTypes from 'prop-types';

export const Scramble = PropTypes.arrayOf(PropTypes.string);

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
