import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';

import { INCREMENT_TIME } from './constants/actionTypes';
import middlewares from './middlewares';
import reducer from './reducers';

const loggerMiddleware = createLogger({
  predicate: (_, action) => action.type !== INCREMENT_TIME
});

const store = createStore(reducer, applyMiddleware(...middlewares, loggerMiddleware));

export default store;
