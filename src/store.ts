import { Epic, createEpicMiddleware } from "redux-observable";

import rootEpic from "./epics";
import * as reducers from "./slices";
import { configureStore } from "@reduxjs/toolkit";

const epicMiddleware = createEpicMiddleware();

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(epicMiddleware),
});

epicMiddleware.run(rootEpic as Epic);

export type RootState = ReturnType<typeof store.getState>;

export default store;
