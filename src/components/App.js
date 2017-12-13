import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React from 'react';

import Button from './Button';
import { formatTime } from '../helpers';
import { startTimer, stopTimer } from '../actions';

const App = ({ time, stopped, startTimer, stopTimer }) => (
  <Container>
    <Title>Timiks</Title>
    <Time>{formatTime(time)}s</Time>
    {
      stopped ?
      <Button onClick={startTimer}>Start</Button> :
      <Button onClick={stopTimer}>Stop</Button>
    }
    <Explain>
      Press {stopped && 'and release'} the button or <Spacebar/> to {stopped ? 'start' : 'stop'}.
    </Explain>
  </Container>
)

const Container = styled.div`
  max-width: 75rem;
  margin: 5rem auto;
  padding: 0 3rem;
`;

const Title = styled.h1`
  margin: 0 0 4rem;
  color: ${props => props.theme.colors.extraDark};
`;

const Time = styled.p`
  margin: 0 0 4rem;
  text-align: center;
  font-size: 6rem;
  color: ${props => props.theme.colors.dark};
`;

const Explain = styled.p`
  color: ${props => props.theme.colors.grey};
  font-size: 1.6rem;
  text-align: center;
`;

const Spacebar = styled.span`
  position: relative;
  top: 0.1rem;
  display: inline-block;
  border-radius: 0.3rem;
  margin: 0 0.3rem;
  border: 2px solid #95a5a6;
  height: 0.8rem;
  width: 4rem;
`;

const mapStateToProps = ({ time, stopped }) => ({ time, stopped });
const mapDispatchToProps = dispatch => bindActionCreators({ startTimer, stopTimer }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
