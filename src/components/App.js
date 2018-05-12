import styled from 'styled-components';
import React from 'react';
import { Route } from 'react-router-dom'

import Header from './Header';
import Footer from './Footer';
import TimerView from './timer/TimerView';
import ArchiveContainer from '../containers/archive/ArchiveContainer';
import Section from './shared/Section';

const App = () => (
    <Container>
      <Section margin="md">
        <Header/>
      </Section>
      <Section margin="md">
        <Route exact path="/" component={TimerView}/>
        <Route path="/archive" component={ArchiveContainer}/>
      </Section>
      <Section margin="md">
        <Footer/>
      </Section>
    </Container>
);

const Container = styled.div`
  max-width: 72rem;
  margin: ${props => props.theme.sizes.md} auto;
  padding: 0 ${props => props.theme.sizes.sm};
`;

export default App;
