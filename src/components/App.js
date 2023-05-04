import React from "react";
import { Route } from "react-router-dom";

import Header from "./Header";
import ArchiveContainer from "../containers/archive/ArchiveContainer";
import Section from "./shared/Section";
import NotificationContainer from "../containers/NotificationContainer";
import LoginPromotionContainer from "../containers/messages/LoginPromotionContainer";
import NewVersionPromptContainer from "../containers/messages/NewVersionPromptContainer";
import Footer from "./Footer";
import Trainer from "./trainer/Trainer";
import NetworkStatusBarContainer from "../containers/NetworkStatusBarContainer";
import TimerView from "./timer/TimerView";

const App = () => (
  <>
    <NetworkStatusBarContainer />
    <NewVersionPromptContainer />
    <LoginPromotionContainer />
    <div className="container">
      <Section margin="md">
        <Header />
      </Section>
      <Section margin="xl">
        <Route exact path="/" component={TimerView} />
        <Route path="/archive" component={ArchiveContainer} />
        <Route path="/trainer" component={Trainer} />
      </Section>
      <Section textAlign="center">
        <Footer />
      </Section>
      <NotificationContainer />
    </div>
  </>
);

export default App;
