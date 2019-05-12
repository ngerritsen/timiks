/* global process */

import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';

import middlewares from './middlewares';
import reducer from './reducers';

let allMiddlewares = middlewares;

if (process.env.NODE_ENV !== 'production') {
  allMiddlewares = [...allMiddlewares, createLogger({ collapsed: true })];
}

const store = createStore(reducer, applyMiddleware(...allMiddlewares));

export default store;
