import { combineReducers } from "redux";
import { RESET_REDUX_STORE } from "../common/constants";

import apiReducer from "./Api-Reducers";
import authReducer from "./Auth-Reducer";
import calibration from "./Calibration-Reducers";

const rootReducer = combineReducers({
  auth: authReducer,
  api: apiReducer,
  calibration: calibration,
});

export default (state, action) =>
  rootReducer(action.type === RESET_REDUX_STORE ? undefined : state, action);
