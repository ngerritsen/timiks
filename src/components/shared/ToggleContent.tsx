import React, { useState } from "react";

type ToggleContentApi = {
  show: () => void;
  hide: () => void;
  isShown: boolean;
  toggle: () => void;
};

type ToggleContentProps = {
  toggle: (api: ToggleContentApi) => React.JSX.Element;
  content: (api: Pick<ToggleContentApi, "hide">) => React.JSX.Element;
};

const ToggleContent = ({ toggle, content }: ToggleContentProps) => {
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

export default ToggleContent;
