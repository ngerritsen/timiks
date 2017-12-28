import { ThemeProvider, injectGlobal } from 'styled-components';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

import { APP_ROOT_SELECTOR } from './constants/app';
import App from './components/App';
import theme from './theme';
import store from './store';

const rootEl = document.querySelector(APP_ROOT_SELECTOR);

injectGlobal`
  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
  }

  body {
    font-family: ${theme.font};
    color: ${theme.colors.fg};
  }
`;

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App/>
    </Provider>
  </ThemeProvider>,
  rootEl
);
