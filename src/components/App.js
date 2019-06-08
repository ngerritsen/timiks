import React from 'react';
import { Route } from 'react-router-dom';

import Header from './Header';
import TimerViewContainer from '../containers/timer/TimerViewContainer';
import ArchiveContainer from '../containers/archive/ArchiveContainer';
import Section from './shared/Section';
import NotificationContainer from '../containers/NotificationContainer';
import LoginPromotionContainer from '../containers/LoginPromotionContainer';
import NewVersionPromptContainer from '../containers/NewVersionPromptContainer';
import Showcase from './Showcase';
import Donate from './Donate';
import { ButtonDuo, ButtonDuoItem } from './shared/ButtonDuo';

const App = () => (
  <>
    <NewVersionPromptContainer />
    <LoginPromotionContainer />
    <div className="container">
      <Section margin="md">
        <Header />
      </Section>
      <Section margin="xl">
        <Route exact path="/" component={TimerViewContainer} />
        <Route path="/archive" component={ArchiveContainer} />
      </Section>
      <Section textAlign="center">
        <ButtonDuo center>
          <ButtonDuoItem center>
            <Showcase />
          </ButtonDuoItem>
          <ButtonDuoItem center>
            <Donate />
          </ButtonDuoItem>
        </ButtonDuo>
      </Section>
      <NotificationContainer />
    </div>
  </>
);

export default App;
