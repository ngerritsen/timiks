import styled from 'styled-components';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';

import App from './components/App';
import reducer from './reducer';
import timerMiddleware from './timerMiddleware';

const rootEl = document.querySelector('#root');

const store = createStore(reducer, applyMiddleware(timerMiddleware, createLogger()));

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  rootEl
);
