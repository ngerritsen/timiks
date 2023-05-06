import { Provider } from "react-redux";
import React from "react";
import { createRoot } from "react-dom/client";
import * as Sentry from "@sentry/browser";

import "./errorHandler";
import "./firebase";

import keymap from "./constants/keymap";
import { APP_ROOT_SELECTOR } from "./constants/dom";
import App from "./components/App";
import store from "./store";
import ShortcutProvider from "./containers/ShortcutProvider";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import TimerView from "./components/timer/TimerView";
import ArchiveContainer from "./containers/archive/ArchiveContainer";
import Trainer from "./components/trainer/Trainer";

Sentry.init({
  dsn: "https://d003788913ba4ca98086a0154b86a790@sentry.io/1517517",
});

const rootEl = document.querySelector(APP_ROOT_SELECTOR);
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <TimerView />,
      },
      {
        path: "archive",
        element: <ArchiveContainer />,
      },
      {
        path: "trainer",
        element: <Trainer />,
      },
    ],
  },
]);

createRoot(rootEl).render(
  <Provider store={store}>
    <ShortcutProvider keymap={keymap}>
      <RouterProvider router={router} />
    </ShortcutProvider>
  </Provider>
);
