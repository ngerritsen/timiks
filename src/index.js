import styled, { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';

import App from './components/App';
import reducer from './reducer';
import middlewares from './middlewares';
import theme from './theme';

const rootEl = document.querySelector('#root');

const store = createStore(reducer, applyMiddleware(...middlewares, createLogger()));

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App/>
    </Provider>
  </ThemeProvider>,
  rootEl
);
