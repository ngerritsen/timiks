import styled from 'styled-components';
import Grid from 'styled-components-grid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React from 'react';

import Time from './Time';
import TimeBoard from './TimeBoard';
import Button from './Button';
import { obfuscateScramble } from '../helpers';
import { startTimer, stopTimer, resetTime } from '../actions';

const App = ({ time, stopped, scramble, startTimer, resetTime, stopTimer, preparing }) => (
  <Container>
    <Title>Timiks</Title>
    <Time ms={time} />
    <Scramble>{scramble.join(' ')}</Scramble>
    {
      stopped ?
        (
          preparing ?
            <Button>Ready</Button> :
            <Button onClick={() => { resetTime(); startTimer() }}>Start</Button>
        ) :
        <Button onClick={stopTimer}>Stop</Button>
    }
    <Explain>
      {(stopped && !preparing) && 'Press and release '}
      {(stopped && preparing) && 'Release '}
      {!stopped && 'Press '}
      spacebar <Spacebar/> to {stopped ? 'start' : 'stop'}.
    </Explain>
    <TimeBoard/>
  </Container>
)

const Container = styled.div`
  max-width: 75rem;
  margin: ${props => props.theme.sizes.lg} auto;
  padding: 0 ${props => props.theme.sizes.md};
`;

const Scramble = styled.p`
  font-size: 1.6rem;
  text-align: center;
  font-family: ${props => props.theme.monoFont};
  background-color: ${props => props.theme.colors.subtleBg};
  padding: ${props => props.theme.sizes.xs};
  font-weight: bold;
  border-radius: 3px;
`;

const Title = styled.h1`
  margin: 0 0 ${props => props.theme.sizes.lg};
  font-size: 2.6rem;
  font-weight: bold;
`;

const Explain = styled.p`
  color: ${props => props.theme.colors.subtleFg};
  font-size: 1.6rem;
  text-align: center;
  margin-top: ${props => props.theme.sizes.xs};
`;

const Spacebar = styled.span`
  position: relative;
  top: 0.1rem;
  display: inline-block;
  border-radius: 0.3rem;
  margin: 0 ${props => props.theme.sizes.xxs};
  border: 2px solid ${props => props.theme.colors.subtleFg};
  height: 0.8rem;
  width: 4rem;
`;

function mapStateToProps ({ timer, activation, scramble }) {
  const { stopped, time } = timer;
  const { preparing } = activation;

  return {
    time,
    stopped,
    preparing,
    scramble: stopped ? scramble : obfuscateScramble(scramble)
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ startTimer, stopTimer, resetTime }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
