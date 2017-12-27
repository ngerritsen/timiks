import { ThemeProvider, injectGlobal } from 'styled-components';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';

import { APP_ROOT_SELECTOR } from './constants/app';
import { INCREMENT_TIME } from './constants/actionTypes';
import App from './components/App';
import reducer from './reducers';
import middlewares from './middlewares';
import theme from './theme';

const rootEl = document.querySelector(APP_ROOT_SELECTOR);

const loggerMiddleware = createLogger({ predicate: (_, action) => action.type !== INCREMENT_TIME });

const store = createStore(reducer, applyMiddleware(...middlewares, loggerMiddleware));

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
