import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAltLines } from '@fortawesome/pro-solid-svg-icons/faCommentAltLines';
import { faTimes } from '@fortawesome/pro-solid-svg-icons/faTimes';

import * as CustomPropTypes from '../../propTypes';
import { getSize } from '../../helpers/theme';
import Button from '../shared/Button';
import Shortcut from '../shared/Shortcut';
import ToggleContent from '../shared/ToggleContent';
import EditCommentContainer from '../../containers/EditCommentContainer';

const TimeActions = ({
  plus2,
  togglePlus2LastTime,
  dnf,
  toggleDnfLastTime,
  removeLastTime,
  lastTime
}) => (
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
              <FontAwesomeIcon fixedWidth icon={faCommentAltLines} />
            </Button>
          </>
        )}
        content={({ hide }) => <EditCommentContainer onCancel={hide} time={lastTime} />}
      />
    </TimeAction>
  </StyledTimeActions>
);

TimeActions.propTypes = {
  dnf: PropTypes.bool,
  plus2: PropTypes.bool,
  removeLastTime: PropTypes.func.isRequired,
  toggleDnfLastTime: PropTypes.func.isRequired,
  togglePlus2LastTime: PropTypes.func.isRequired,
  lastTime: CustomPropTypes.Time.isRequired
};

const StyledTimeActions = styled.div`
  position: relative;
  top: 0;
`;

const TimeAction = styled.span`
  margin-right: ${getSize('xs')};
`;

export default TimeActions;
