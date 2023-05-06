import { configureStore } from "@reduxjs/toolkit";
import { createEpicMiddleware } from "redux-observable";
import reducer from "./reducers";
import { routerMiddleware } from "connected-react-router";
import history from "./history";
import rootEpic from "./epics";

const epicMiddleware = createEpicMiddleware();

const store = configureStore({
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
    epicMiddleware,
    routerMiddleware(history),
  ],
  reducer,
});

epicMiddleware.run(rootEpic);

export default store;
