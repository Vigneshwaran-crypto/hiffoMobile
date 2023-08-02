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

export const authenticationVerify = (jsonData) => {
  LOG("LOGIN REQUEST IN ACTION :", jsonData);
  return (dispatch) => {
    dispatch({
      type: GET_API_DATA,
      jsonData: jsonData,
      requestUrl: HTTP.LOGIN_REQUEST,
      requestType: StaticValues.loginRequest,
      noAuth: true,
    });
  };
};

export const sendOtpAction = (jsonData) => {
  LOG("SEND OTP IN ACTION" + jsonData);
  return (dispatch) => {
    dispatch({
      type: GET_API_DATA,
      jsonData: jsonData,
      requestUrl: HTTP.SEND_OTP_URL,
      requestType: StaticValues.sentOtp,
      stopSpinner: true,
      // noAuth: true,
    });
  };
};

export const verifyOtpAction = (jsonData) => {
  LOG("VERIFY OTP IN ACTION" + jsonData);
  return (dispatch) => {
    dispatch({
      type: GET_API_DATA,
      jsonData: jsonData,
      requestUrl: HTTP.VERIFY_OTP_URL,
      requestType: StaticValues.verifyOtp,
      stopSpinner: true,
      noAuth: true,
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

export const loginWithCredentials = (jsonData, from) => {
  console.log("Inside Uath action >>");
  return async (dispatch) => {
    const params = new URLSearchParams();
    params.append("grant_type", "password");
    params.append("username", "DemoProvider");
    params.append("password", "Wellness2!");
    params.append("device_id", "b8ad7de1fc2f8db2");
    params.append("ip_address", "");
    LOG("params--->" + params);
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    axios
      .post("https://intlws.myoutcomesapp.com/token", params, config)
      .then((result) => {
        LOG("ResultGGGG---------------------" + JSON.stringify(result));
        LOG("INSIDE LOGw");
        HTTP.AuthHeader.Authorization = "Bearer " + result.data.access_token;
        LOG("INSIDE LOGw2");
        HTTP.access_token = result.data.access_token;
        LOG("INSIDE LOGw3");
        HTTP.FormDataHeader.Authorization =
          "Bearer " + result.data.access_token;
        LOG("INSIDE LOGw4");
        var cookie = "";
        cookie =
          result.headers["set-cookie"] +
          ", KEYCLOAK_IDENTITY=" +
          result.data.access_token +
          "; KEYCLOAK_SESSION=" +
          result.data.session_state +
          "; Domain=admin.bml.betalearnings.com;";
        result.headers["set-cookie"] = cookie;
        LOG("INSIDE LOGw55");
        dispatch(storeCookieInState(result.headers));
        LOG("INSIDE LOGw6");
        dispatch(storeTokenInRedux(result.data));
        LOG("INSIDE LOGw7");

        // if (storeCredentials == "checked") {
        var tempCredential = JSON.stringify({
          username: jsonData.username,
          password: jsonData.password,
        });
        storeItem("credentials", tempCredential);
        LOG("INSIDE LOGw8");
        let emptyJson = {};
        dispatch(getProviderDetail(emptyJson));
        LOG("INSIDE LOGw9");
        // }
      })
      .catch((err) => {
        LOG(
          "errGGGG---------------------Email Verification Pending" +
            JSON.stringify(err)
        );
        dispatch(stopSpinner());
        if (JSON.stringify(err.message).toString().includes("400")) {
          LOG(
            "JSON.stringify(err.message).toString().includes",
            JSON.stringify(err.message).toString().includes("400")
          );
          Toast("Getting Response 400");
        } else {
          if (
            JSON.stringify(err.message).toString().includes("Network Error")
          ) {
            Toast("Please check your network connection");
          } else {
            Toast("Please enter valid credentials");
          }
        }
        if (from == "application") Actions.login();
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

export const flowTypeChange = (data) => {
  return (dispatch) => {
    dispatch({
      type: ActionConstants.FLOW_TYPE,
      jsonData: data,
    });
  };
};

export const storeUserDetailsInRedux = (data) => {
  return (dispatch) => {
    dispatch({
      type: API_DATA_RECEIVED,
      responseData: data,
      requestType: ActionConstants.VALIDATE_OTP,
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
