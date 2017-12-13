import styled from 'styled-components';
import Grid from 'styled-components-grid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React from 'react';

import Button from './Button';
import { formatTime } from '../helpers';
import { startTimer, stopTimer } from '../actions';

const App = ({ time, stopped, scramble, startTimer, stopTimer, preparing }) => (
  <Container>
    <Title>Timiks</Title>
    <Time>{formatTime(time)}<small>s</small></Time>
    <Scramble>{scramble.join(' ')}</Scramble>
    {
      stopped ?
        (
          preparing ?
            <Button>Ready</Button> :
            <Button onClick={startTimer}>Start</Button>
        ) :
        <Button onClick={stopTimer}>Stop</Button>
    }
    <Explain>
      {(stopped && !preparing) && 'Press and release '}
      {(stopped && preparing) && 'Release '}
      {!stopped && 'Press '}
      spacebar <Spacebar/> to {stopped ? 'start' : 'stop'}.
    </Explain>
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
  background-color: ${props => props.theme.colors.subtleBg};
  padding: ${props => props.theme.sizes.xs};
  font-weight: bold;
  word-spacing: ${props => props.theme.sizes.xs};
`;

const Title = styled.h1`
  margin: 0 0 ${props => props.theme.sizes.lg};
  font-size: 2.6rem;
  font-weight: bold;
`;

const Time = styled.p`
  margin: 0 0 ${props => props.theme.sizes.xl};
  text-align: center;
  font-size: 6rem;
`;

const TimeUnit = styled.span`
  color: ${props => props.theme.colors.subtleFg};
`

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

function mapStateToProps ({ timer: { time, stopped }, activation: { preparing }, scramble }) {
  return {
    time,
    stopped,
    preparing,
    scramble
  }
};

const mapDispatchToProps = dispatch => bindActionCreators({ startTimer, stopTimer }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
