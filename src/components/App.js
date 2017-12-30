import styled from 'styled-components';
import React from 'react';

import SettingsContainer from '../containers/SettingsContainer';
import TimerContainer from '../containers/TimerContainer';
import TimeBoardContainer from '../containers/TimeBoardContainer';
import Section from './Section';
import ArchiveContainer from '../containers/ArchiveContainer';

const App = () => (
  <Container>
    <Header>
      <Title>Timiks</Title>
      <SettingsContainer/>
    </Header>
    <Section margin="lg">
      <TimerContainer/>
    </Section>
    <Section>
      <TimeBoardContainer/>
    </Section>
    <Section>
      <ArchiveContainer/>
    </Section>
  </Container>
)

const Container = styled.div`
  max-width: 80rem;
  margin: ${props => props.theme.sizes.md} auto;
  padding: 0 ${props => props.theme.sizes.sm};
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 2.6rem;
  font-weight: bold;
`;

export default App;
