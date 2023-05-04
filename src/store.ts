import { createEpicMiddleware } from "redux-observable";

import rootEpic from "./epics";
import reducer from "./reducers";
import { configureStore } from "@reduxjs/toolkit";

const epicMiddleware = createEpicMiddleware();

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(epicMiddleware),
});

epicMiddleware.run(rootEpic);

export default store;
