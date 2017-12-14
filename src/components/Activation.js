import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Button from './Button';

const Activation = ({ stopped, preparing, startTimer, stopTimer, resetTime }) => (
  <div>
    {(() => {
      if (stopped) {
        return preparing ?
          <Button>Ready</Button> :
          <Button onClick={() => (resetTime() && startTimer())}>Start</Button>
      }

      return <Button onClick={stopTimer}>Stop</Button>
    })()}

    <Explain>
      {stopped && !preparing && 'Press and release '}
      {stopped && preparing && 'Release '}
      {!stopped && 'Press '}
      spacebar <Spacebar/> to {stopped ? 'start' : 'stop'}.
    </Explain>
  </div>
);

Activation.propTypes = {
  stopped: PropTypes.bool.isRequired,
  preparing: PropTypes.bool.isRequired,
  startTimer: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,
  resetTime: PropTypes.func.isRequired
};

const Explain = styled.p`
  color: ${props => props.theme.colors.subtleFg};
  font-size: 1.6rem;
  text-align: center;
  margin-top: ${props => props.theme.sizes.xxs};
`;

const Spacebar = styled.span`
  position: relative;
  top: 0.1rem;
  display: inline-block;
  border-radius: 0.3rem;
  margin: ${props => props.theme.sizes.sm} 0 0;
  border: 2px solid ${props => props.theme.colors.subtleFg};
  height: 0.8rem;
  width: 4rem;
`;

export default Activation;
