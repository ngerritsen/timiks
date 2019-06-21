import { useState } from 'react';
import PropTypes from 'prop-types';

const Toggle = ({ children }) => {
  const [isShown, setIsShown] = useState(false);
  const hide = () => setIsShown(false);
  const show = () => setIsShown(true);
  const toggle = () => setIsShown(!isShown);

  return children({ hide, show, toggle, isShown });
};

Toggle.propTypes = {
  children: PropTypes.func.isRequired
};

export default Toggle;
