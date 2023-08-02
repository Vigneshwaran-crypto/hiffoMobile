import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./combineReducers";

import { LOG } from "../common/util";
import { apiMiddleware, ApplicationMiddleware } from "./Middleware";
initialState = {};

const Middleware = [apiMiddleware, ApplicationMiddleware, thunk];

const configureStore = () => {
  LOG("Initial STATE");
  if (__DEV__) {
    const createLogger = require("redux-logger").createLogger; // redux-LOGer 3.x
    const Logger = createLogger({
      collapsed: true,
    });
    Middleware.push(Logger);
  }
  return createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...Middleware))
  );
};
export default configureStore;
