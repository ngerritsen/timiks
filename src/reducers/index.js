import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import activation from "./activation";
import authentication from "./authentication";
import history from "../history";
import loginPromotion from "./loginPromotion";
import network from "./network";
import notifications from "./notifications";
import scramble from "./scramble";
import settings from "./settings";
import theme from "./theme";
import timer from "./timer";
import times from "./times";
import trainer from "./trainer";
import version from "./version";

export default combineReducers({
  activation,
  authentication,
  loginPromotion,
  network,
  notifications,
  router: connectRouter(history),
  scramble,
  settings,
  theme,
  timer,
  times,
  trainer,
  version,
});
