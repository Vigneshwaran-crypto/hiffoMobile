// User Defined Import
import {
  CUSTOM_SPINNER_DISABLE,
  CUSTOM_SPINNER_ENABLE,
  GET_API_DATA,
  HTTP,
  RESET_REDUX_STORE,
  StaticValues,
} from "../common/constants";
import { LOG } from "../common/util";

// ACTIVITY INDICATOR Custom spinner enable
export const initSpinner = () => {
  return (dispatch) => {
    dispatch({
      type: CUSTOM_SPINNER_ENABLE,
    });
  };
};

// ACTIVITY INDICATOR Custom spinner enable
export const stopSpinner = () => {
  return (dispatch) => {
    dispatch({
      type: CUSTOM_SPINNER_DISABLE,
    });
  };
};

// RESET REDUX STORE
export const resetStore = () => {
  return (dispatch) => {
    dispatch({
      type: RESET_REDUX_STORE,
    });
  };
};

export const setTheme = (theme) => {
  LOG("SET THEME IN ACTION", theme);
  return (dispatch) => {
    dispatch({
      type: StaticValues.setTheme,
      jsonData: theme,
    });
  };
};

export const getAllFoods = (jsonData, extra) => {
  LOG("getAllFoods_in_action :", jsonData);
  return (dispatch) => {
    dispatch({
      type: GET_API_DATA,
      jsonData: jsonData,
      requestUrl: HTTP.GET_ALL_FOODS,
      requestType: StaticValues.getAllFoods,
    });
  };
};

export const createMenu = (jsonData) => {
  LOG("createMenu_in_action :", jsonData);
  return (dispatch) => {
    dispatch({
      type: GET_API_DATA,
      requestType: StaticValues.createMenu,
      requestUrl: HTTP.CREATE_MENU,
      jsonData: jsonData,
    });
  };
};
