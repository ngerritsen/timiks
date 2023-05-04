import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";

import * as themes from "../theme";
import Header from "./Header";
import Section from "./shared/Section";
import NotificationContainer from "../containers/NotificationContainer";
import LoginPromotionContainer from "../containers/messages/LoginPromotionContainer";
import NewVersionPromptContainer from "../containers/messages/NewVersionPromptContainer";
import Footer from "./Footer";
import NetworkStatusBarContainer from "../containers/NetworkStatusBarContainer";
import { getTheme } from "../selectors/theme";

const App = () => {
  const theme = themes[useSelector(getTheme)];

  useEffect(() => {
    renderGlobalTheme(theme);
  }, [theme]);

  return (
    <ThemeProvider theme={theme}>
      <NetworkStatusBarContainer />
      <NewVersionPromptContainer />
      <LoginPromotionContainer />
      <div className="container">
        <Section margin="md">
          <Header />
        </Section>
        <Section margin="xl">
          <Outlet />
        </Section>
        <Section textAlign="center">
          <Footer />
        </Section>
        <NotificationContainer />
      </div>
    </ThemeProvider>
  );
};

function renderGlobalTheme(theme) {
  document.body.style["background-color"] = theme.colors.bg;
  document.body.style.color = theme.colors.fg;
}

export default App;
