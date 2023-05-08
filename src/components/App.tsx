import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import * as themes from "../theme";
import Header from "./Header";
import Section from "./shared/Section";
import Footer from "./Footer";
import NetworkStatusBarContainer from "../containers/NetworkStatusBarContainer";
import NewVersionPrompt from "./messages/NewVersionPrompt";
import LoginPromotion from "./messages/LoginPromotion";
import { useTheme } from "../hooks/useTheme";
import Notification from "./Notification";

const App = () => {
  const theme = themes[useTheme()];

  useEffect(() => {
    renderGlobalTheme(theme);
  }, [theme]);

  return (
    <ThemeProvider theme={theme}>
      <NetworkStatusBarContainer />
      <NewVersionPrompt />
      <LoginPromotion />
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
        <Notification />
      </div>
    </ThemeProvider>
  );
};

function renderGlobalTheme(theme: themes.Theme) {
  document.body.style.backgroundColor = theme.colors.bg;
  document.body.style.color = theme.colors.fg;
}

export default App;
