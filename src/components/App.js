import styled from 'styled-components';
import React from 'react';

import TimerContainer from '../containers/TimerContainer';
import TimeBoardContainer from '../containers/TimeBoardContainer';
import Section from './Section';

const App = () => (
  <Container>
    <Title>Timiks</Title>
    <Section margin="lg">
      <TimerContainer/>
    </Section>
    <Section>
      <TimeBoardContainer/>
    </Section>
  </Container>
)

const Container = styled.div`
  max-width: 70rem;
  margin: ${props => props.theme.sizes.md} auto;
  padding: 0 ${props => props.theme.sizes.sm};
`;

const Title = styled.h1`
  margin: 0;
  font-size: 2.6rem;
  font-weight: bold;
`;

export default App;
