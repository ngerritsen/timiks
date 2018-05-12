import React from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components'

import Button from '../shared/Button';

const TimeActions = ({
  plus2,
  togglePlus2LastTime,
  dnf,
  toggleDnfLastTime,
  removeLastTime
}) => (
  <StyledTimeActions>
    <TimeAction>
      <Button tiny tag empty={!plus2} onClick={togglePlus2LastTime}>+2</Button>
    </TimeAction>
    <TimeAction>
      <Button tiny tag empty={!dnf} onClick={toggleDnfLastTime}>DNF</Button>
    </TimeAction>
    <TimeAction>
      <Button tiny tag danger onClick={removeLastTime}>Remove</Button>
    </TimeAction>
  </StyledTimeActions>
);

TimeActions.propTypes = {
  dnf: PropTypes.bool.isRequired,
  plus2: PropTypes.bool.isRequired,
  removeLastTime: PropTypes.func.isRequired,
  toggleDnfLastTime: PropTypes.func.isRequired,
  togglePlus2LastTime: PropTypes.func.isRequired
};

const StyledTimeActions = styled.div`
  position: relative;
  top: 0;
`;

const TimeAction = styled.span`
  margin-right: ${props => props.theme.sizes.xs};
`;

export default TimeActions;
