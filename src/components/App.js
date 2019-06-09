import React from 'react';
import { Route } from 'react-router-dom';

import Header from './Header';
import TimerViewContainer from '../containers/timer/TimerViewContainer';
import ArchiveContainer from '../containers/archive/ArchiveContainer';
import Section from './shared/Section';
import NotificationContainer from '../containers/NotificationContainer';
import LoginPromotionContainer from '../containers/messages/LoginPromotionContainer';
import NewVersionPromptContainer from '../containers/messages/NewVersionPromptContainer';
import Footer from './Footer';

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
        <Footer />
      </Section>
      <NotificationContainer />
    </div>
  </>
);

export default App;
