import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ToggleContent = ({ toggle, content }) => {
  const [isShown, setIsShown] = useState(false);
  const hide = () => setIsShown(false);
  const show = () => setIsShown(true);
  const toggleShown = () => setIsShown(!isShown);

  return (
    <>
      {toggle({ show, hide, isShown, toggle: toggleShown })}
      {isShown && content({ hide })}
    </>
  );
};

ToggleContent.propTypes = {
  toggle: PropTypes.func,
  content: PropTypes.func
};

export default ToggleContent;
