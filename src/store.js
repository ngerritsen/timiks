/* global process */

import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import activationMiddleware from './middlewares/activation';
import rootEpic from './epics';
import reducer from './reducers';
import { initStore } from './actions';

const epicMiddleware = createEpicMiddleware();

let allMiddlewares = [activationMiddleware, epicMiddleware];

if (process.env.NODE_ENV !== 'production') {
  allMiddlewares = [...allMiddlewares, createLogger({ collapsed: true })];
}

const store = createStore(reducer, applyMiddleware(...allMiddlewares));

epicMiddleware.run(rootEpic);

store.dispatch(initStore());

export default store;
