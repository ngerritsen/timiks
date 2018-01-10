import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Button from './Button';
import FullScreenButton from './FullScreenButton';

const Activation = ({ stopped, preparing, startTimer, stopTimer, resetTime }) => (
  <div>
    {(() => {
      if (stopped) {
        return preparing ?
          <Button big primary>Ready</Button> :
          <Button big primary onClick={() => { resetTime(); startTimer(); }}>Start</Button>
      }

      return (
        <span>
          <Button big primary onClick={stopTimer}>Stop</Button>
          <FullScreenButton onClick={stopTimer}/>
        </span>
      );
    })()}

    <Explain>
      {stopped && !preparing && 'Press and release '}
      {stopped && preparing && 'Release '}
      {!stopped && 'Press '}
      spacebar <Spacebar/> {!stopped ? 'or tap anywhere' : ''} to {stopped ? 'start' : 'stop'}.
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
  margin: ${props => props.theme.sizes.sm} 0 0;
`;

const Spacebar = styled.span`
  position: relative;
  display: inline-block;
  border-radius: 0.3rem;
  margin: 0 ${props => props.theme.sizes.xxs};
  border: 2px solid ${props => props.theme.colors.subtleFg};
  height: 1rem;
  width: 4rem;
`;

export default Activation;
