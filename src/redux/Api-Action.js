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

export const editMenu = (jsonData) => {
  LOG("editMenu_in_Action :", jsonData);
  return (dispatch) => {
    dispatch({
      type: GET_API_DATA,
      requestType: StaticValues.editMenu,
      requestUrl: HTTP.EDIT_MENU,
      jsonData: jsonData,
    });
  };
};

export const deleteMenu = (jsonData, extra) => {
  LOG("deleteMenu_in_action :", jsonData);
  return (dispatch) => {
    dispatch({
      type: GET_API_DATA,
      requestType: StaticValues.deleteFood,
      requestUrl: HTTP.DELETE_MENU,
      jsonData: jsonData,
      extraData: extra,
    });
  };
};

export const getAllAddOn = (jsonData) => {
  LOG("getAllAddOn_in_action :", jsonData);
  return (dispatch) => {
    dispatch({
      type: GET_API_DATA,
      requestType: StaticValues.getAllAddOn,
      requestUrl: HTTP.GET_ALL_ADDON,
      jsonData: jsonData,
    });
  };
};

export const createAddOn = (jsonData) => {
  LOG("createAddOn_in_action :", jsonData);
  return (dispatch) => {
    dispatch({
      type: GET_API_DATA,
      requestType: StaticValues.createAddOn,
      requestUrl: HTTP.CREATE_ADD_ON,
      jsonData: jsonData,
    });
  };
};

export const editAddOn = (jsonData) => {
  LOG("editAddOn_in_action :", jsonData);
  return (dispatch) => {
    dispatch({
      type: GET_API_DATA,
      requestType: StaticValues.editAddOn,
      requestUrl: HTTP.EDIT_ADD_ON,
      jsonData: jsonData,
    });
  };
};

export const deleteAddOn = (jsonData) => {
  LOG("deleteAddOn_in_action :", jsonData);
  return (dispatch) => {
    dispatch({
      type: GET_API_DATA,
      requestType: StaticValues.deleteAddOn,
      requestUrl: HTTP.DELETE_ADD_ON,
      jsonData: jsonData,
    });
  };
};

export const linkAddOn = (jsonData) => {
  LOG("linkAddOn_in_action :", jsonData);
  return (dispatch) => {
    dispatch({
      type: GET_API_DATA,
      requestType: StaticValues.linkAddOn,
      requestUrl: HTTP.LINK_ADD_ON,
      jsonData: jsonData,
    });
  };
};

export const viewFoodAddOn = (jsonData, extraData) => {
  LOG("viewFoodAddOn_in_action :", jsonData);
  return (dispatch) => {
    dispatch({
      type: GET_API_DATA,
      requestType: StaticValues.viewFoodAddOns,
      requestUrl: HTTP.VIEW_FOOD_ADD_ONS,
      jsonData: jsonData,
      extraData,
    });
  };
};

export const foodAvailabilityStatus = (jsonData, extraData) => {
  LOG("foodAvailabilityStatus_in_action :", jsonData);
  return (dispatch) => {
    dispatch({
      type: GET_API_DATA,
      requestType: StaticValues.foodAvailabilityStatus,
      requestUrl: HTTP.FOOD_AVAILABILITY_STATUS,
      jsonData: jsonData,
    });
  };
};

export const addOnAvailabilityStatus = (jsonData, extraData) => {
  LOG("addOnAvailabilityStatus_in_action :", jsonData);
  return (dispatch) => {
    dispatch({
      type: GET_API_DATA,
      requestType: StaticValues.addOnAvailabilityStatus,
      requestUrl: HTTP.ADDON_AVAILABILITY_STATUS,
      jsonData: jsonData,
    });
  };
};
