import styled from 'styled-components';
import React from 'react';
import { Route } from 'react-router-dom'

import Header from './Header';
import TimerView from './TimerView';
import ArchiveContainer from '../containers/ArchiveContainer';
import ThemeSelectorContainer from '../containers/ThemeSelectorContainer';

const App = () => (
    <Container>
      <Header/>
      <Route exact path="/" component={TimerView}/>
      <Route path="/archive" component={ArchiveContainer}/>
      <ThemeSelectorContainer/>
    </Container>
);

const Container = styled.div`
  max-width: 72rem;
  margin: ${props => props.theme.sizes.md} auto;
  padding: 0 ${props => props.theme.sizes.sm};
`;

export default App;
