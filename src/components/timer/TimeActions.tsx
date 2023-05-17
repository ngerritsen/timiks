import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentAlt } from "@fortawesome/free-solid-svg-icons/faCommentAlt";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";

import { getSize } from "../../helpers/theme";
import Button from "../shared/Button";
import Shortcut from "../shared/Shortcut";
import ToggleContent from "../shared/ToggleContent";
import EditComment from "../shared/EditComment";
import { getLastTime } from "../../selectors/times";
import { removeTime, updateTime } from "../../slices/times";
import { useDispatch, useSelector } from "react-redux";

const TimeActions = () => {
  const dispatch = useDispatch();
  const lastTime = useSelector(getLastTime);
  const { id, dnf, plus2 } = lastTime;
  const removeLastTime = () => dispatch(removeTime(id));

  const toggleDnfLastTime = () =>
    dispatch(updateTime({ id, fields: { dnf: !dnf } }));

  const togglePlus2LastTime = () =>
    dispatch(updateTime({ id, fields: { plus2: !plus2 } }));

  return (
    <StyledTimeActions>
      <TimeAction>
        <Shortcut command="plus2LastTime" action={togglePlus2LastTime} />
        <Button size="sm" tag outline={!plus2} onClick={togglePlus2LastTime}>
          +2
        </Button>
      </TimeAction>

      <Shortcut command="dnfLastTime" action={toggleDnfLastTime} />
      <TimeAction>
        <Button size="sm" tag outline={!dnf} onClick={toggleDnfLastTime}>
          DNF
        </Button>
      </TimeAction>

      <Shortcut command="removeLastTime" action={removeLastTime} />
      <TimeAction>
        <Button size="sm" tag color="red" onClick={removeLastTime}>
          <FontAwesomeIcon fixedWidth icon={faTimes} />
        </Button>
      </TimeAction>

      <TimeAction>
        <ToggleContent
          toggle={({ toggle }) => (
            <>
              <Shortcut command="commentOnTime" action={toggle} />
              <Button size="sm" tag color="subtleFg" onClick={toggle}>
                <FontAwesomeIcon fixedWidth icon={faCommentAlt} />
              </Button>
            </>
          )}
          content={({ hide }) => (
            <EditComment onCancel={hide} time={lastTime} />
          )}
        />
      </TimeAction>
    </StyledTimeActions>
  );
};

const StyledTimeActions = styled.div`
  position: relative;
  top: 0;
`;

const TimeAction = styled.span`
  margin-right: ${getSize("xs")};
`;

export default TimeActions;
