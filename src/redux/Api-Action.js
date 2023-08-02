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

// ACVTIVITY INDICATOR Custom spinner enable
export const initSpinner = () => {
  return (dispatch) => {
    dispatch({
      type: CUSTOM_SPINNER_ENABLE,
    });
  };
};

// ACVTIVITY INDICATOR Custom spinner enable
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

export const editProfile = (jsonData) => {
  LOG("EDIT PROFILE IN ACTION :", jsonData);
  return (dispatch) => {
    dispatch({
      type: GET_API_DATA,
      jsonData: jsonData,
      requestType: StaticValues.editProfile,
      requestUrl: HTTP.EDIT_PROFILE,
    });
  };
};

// export const profilePhotoUpload = (jsonData) => {
//   LOG("PROFILE UPLOAD IN ACTION", jsonData);
//   return (dispatch) => {
//     dispatch({
//       type: GET_API_DATA,
//       jsonData: jsonData,
//       requestType: StaticValues.profilePhotoUpload,
//       requestUrl: HTTP.PROFILE_PHOTO_UPLOAD,
//       multiPart: true,
//       stopSpinner: true,
//     });
//   };
// };

export const getAllFormmasterAct = (jsonData, extraData) => {
  LOG("getAllFormmasterAct IN ACTION :", jsonData);
  return (dispatch) => {
    dispatch({
      type: GET_API_DATA,
      jsonData: jsonData,
      requestType: StaticValues.getAllFormmaster,
      requestUrl: HTTP.GET_ALL_FORMS_MASTER,
      extraData: extraData,
    });
  };
};

export const getFarmCheckListForms = (jsonData) => {
  LOG("FARM CHECKLIST FORMS IN ACTION :", jsonData);
  return (dispatch) => {
    dispatch({
      type: GET_API_DATA,
      jsonData: jsonData,
      requestType: StaticValues.farmCheckListForms,
      requestUrl: HTTP.FARM_CHECKLIST_FORMS,
      stopSpinner: true,
    });
  };
};

export const getUserFarmData = (jsonData) => {
  LOG("VIEW USER FARM DATA IN ACTION :", jsonData);
  return (dispatch) => {
    dispatch({
      type: GET_API_DATA,
      jsonData: jsonData,
      requestType: StaticValues.viewFarmData,
      requestUrl: HTTP.VIEW_FARM_DATA_URL,
    });
  };
};

export const addFormData = (jsonData) => {
  LOG("ADD FARM IN ACTION :", jsonData);
  return (dispatch) => {
    dispatch({
      type: GET_API_DATA,
      jsonData: jsonData,
      requestType: StaticValues.addFormData,
      requestUrl: HTTP.ADD_FORM_DATA_URL,
      stopSpinner: true,
    });
  };
};

export const updateFarmData = (jsonData) => {
  LOG("UPDATE FARM IN ACTION ", jsonData);
  return (dispatch) => {
    dispatch({
      type: GET_API_DATA,
      jsonData: jsonData,
      requestType: StaticValues.updateFarmData,
      requestUrl: HTTP.UPDATE_FARM_DATA_URL,
      stopSpinner: true,
    });
  };
};

export const dropDownSaveOptions = (jsonData, extraData) => {
  LOG("dropDownSaveOptions IN ACTION :", jsonData);
  return (dispatch) => {
    dispatch({
      type: GET_API_DATA,
      jsonData: jsonData,
      requestType: StaticValues.dropDownSaveOptions,
      requestUrl: HTTP.DROP_DOWN_SAVE_OPTIONS,
      stopSpinner: true,
      extraData: extraData,
    });
  };
};

export const getNotifications = (jsonData, extraData) => {
  LOG("get_notifications_in_action :", jsonData);
  return (dispatch) => {
    dispatch({
      type: GET_API_DATA,
      jsonData: jsonData,
      requestType: StaticValues.getNotifications,
      requestUrl: HTTP.GET_NOTIFICATIONS_URL,
      extraData: extraData,
    });
  };
};

export const deleteNotification = (jsonData) => {
  LOG("delete_notifications_in_action :", jsonData);
  return (dispatch) => {
    dispatch({
      type: GET_API_DATA,
      jsonData: jsonData,
      requestType: StaticValues.deleteNotification,
      requestUrl: HTTP.DELETE_NOTIFICATION_URL,
    });
  };
};
