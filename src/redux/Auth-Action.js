/**
 * Important dispatch keys --->
 * must give keys:
 * type - request type to dispatch
 *
 * optional :
 * stopSpinner - true for disable custom spinner.
 * jsonData - request data payload for network call
 * requestUrl - request url if its network call then this is must
 * requestType - to re dispatch after network call is done this is must for network call
 * get - for get requests
 * noAuth - for normal http request without authentication
 * multipart - for multipart request .
 */
import axios from "axios";
import {
  ActionConstants,
  API_DATA_RECEIVED,
  GET_API_DATA,
  GET_PROVIDER_DETAIL,
  HTTP,
  StaticValues,
  staticValues,
  STORE_HEADER_FOR_WEBVIEW,
} from "../common/constants";

import { LOG, storeItem } from "../common/util";

export const createAccount = (jsonData) => {
  LOG("CREATE_ACCOUNT_IN_ACTION :", HTTP.CREATE_ACCOUNT + jsonData);
  return (dispatch) => {
    dispatch({
      type: GET_API_DATA,
      requestUrl: HTTP.CREATE_ACCOUNT,
      requestType: StaticValues.createAccount,
      noAuth: true,
      jsonData: jsonData,
      // get: true,
    });
  };
};

export const authenticationVerify = (jsonData) => {
  LOG("LOGIN REQUEST IN ACTION :", jsonData);
  return (dispatch) => {
    dispatch({
      type: GET_API_DATA,
      jsonData: jsonData,
      requestUrl: HTTP.LOGIN_REQUEST,
      requestType: StaticValues.loginRequest,
      stopSpinner: true,
      noAuth: true,
    });
  };
};

export const sendOtpAction = (jsonData, extra) => {
  LOG("SEND OTP IN ACTION" + jsonData);
  return (dispatch) => {
    dispatch({
      type: GET_API_DATA,
      jsonData: jsonData,
      requestUrl: HTTP.SEND_OTP_URL,
      requestType: StaticValues.sentOtp,
      extraData: extra,
      stopSpinner: true,
      noAuth: true,
    });
  };
};

export const verifyOtpAction = (jsonData, extra) => {
  LOG("VERIFY OTP IN ACTION" + jsonData);
  return (dispatch) => {
    dispatch({
      type: GET_API_DATA,
      jsonData: jsonData,
      requestUrl: HTTP.VERIFY_OTP_URL,
      requestType: StaticValues.verifyOtp,
      extraData: extra,
      stopSpinner: true,
      noAuth: true,
    });
  };
};

export const generateHid = (jsonData, extra) => {
  LOG("GENERATE_HID_IN_ACTION" + jsonData);
  return (dispatch) => {
    dispatch({
      type: GET_API_DATA,
      jsonData: jsonData,
      requestUrl: HTTP.HID_GENERATOR,
      requestType: StaticValues.generateHid,
      extraData: extra,
      stopSpinner: true,
      noAuth: true,
    });
  };
};

export const createRestaurant = (jsonData, extra) => {
  LOG("Create_Restaurant_in_action :", jsonData);
  return (dispatch) => {
    dispatch({
      type: GET_API_DATA,
      jsonData: jsonData,
      requestUrl: HTTP.CREATE_RESTAURANT,
      requestType: StaticValues.createRestaurant,
      extraData: extra,
      stopSpinner: true,
    });
  };
};

export const resetPasswordAction = (jsonData) => {
  LOG("RESETPASSWORD IN ACTION ", jsonData);
  return (dispatch) => {
    dispatch({
      type: GET_API_DATA,
      jsonData: jsonData,
      requestType: StaticValues.resetPassword,
      requestUrl: HTTP.RESET_PASSWORD_URL,
      stopSpinner: true,
      noAuth: true,
    });
  };
};

export const getProviderDetail = (jsondata) => {
  // get getGroupDetails Action
  LOG("GET PROVIDER DETAILS Action");

  return (dispatch) => {
    dispatch({
      type: GET_API_DATA,
      jsonData: jsondata,
      requestUrl: HTTP.GET_PROVIDER_URL,
      get: true,
      requestType: GET_PROVIDER_DETAIL,
    });
  };
};

// This action is used to store the header required for in app webview cookies is stored here
export const storeCookieInState = (value) => {
  return (dispatch) => {
    dispatch({
      type: STORE_HEADER_FOR_WEBVIEW,
      jsonData: value,
    });
  };
};

export const storeTokenInRedux = (jsonData) => {
  return (dispatch) => {
    dispatch({
      type: staticValues.storeTokenInRedux,
      jsonData,
    });
  };
};

export const profilePhotoUpload = (jsonData) => {
  LOG("PROFILE UPLOAD IN ACTION", jsonData);
  return (dispatch) => {
    dispatch({
      type: GET_API_DATA,
      jsonData: jsonData,
      requestType: StaticValues.profilePhotoUpload,
      requestUrl: HTTP.PROFILE_PHOTO_UPLOAD,
      multiPart: true,
      stopSpinner: true,
    });
  };
};
