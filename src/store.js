/* global process */

import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import rootEpic from './epics';
import reducer from './reducers';

const epicMiddleware = createEpicMiddleware();

let allMiddlewares = [epicMiddleware];

if (process.env.NODE_ENV !== 'production') {
  allMiddlewares = [...allMiddlewares, createLogger({ collapsed: true })];
}

const store = createStore(reducer, applyMiddleware(...allMiddlewares));

epicMiddleware.run(rootEpic);

export default store;
