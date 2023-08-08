// Fetch Call will be done Here and dispatch accordingly
import { showMessage } from "react-native-flash-message";
import { Actions } from "react-native-router-flux";
import {
  ActionConstants,
  API_DATA_ERROR,
  API_DATA_RECEIVED,
  CUSTOM_SPINNER_DISABLE,
  GET_API_DATA,
  GET_PROVIDER_DETAIL,
  HTTP,
  RECEIVED_API_DATA,
  RESET_REDUX_STORE,
  StaticValues,
} from "../common/constants";
import { stylesCommon } from "../common/styles";
import { LOG, removeItem, storeItem, Toast } from "../common/util";
import {
  getAllFormmasterAct,
  getUserFarmData,
  resetStore,
  stopSpinner,
} from "./Api-Action";
import * as RootNavigation from "../Router/RootNavigation";
import {
  getBlockDetails,
  getCommodityBasedVariety,
  getCommodityList,
  getHarvestDetails,
  getPackhouseList,
  getPickingPackingCount,
  getPropertBasedCommodity,
  getPropertyList,
  getToiletPortableCount,
} from "./FarmCheckList-Action";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { Item } from "react-native-paper/lib/typescript/components/List/List";
import { getAllAnswersMasterByParentId } from "./FarmCheckList-Action";
import { StackActions } from "@react-navigation/native";
import { getAccomadationYesCount } from "./Calibration-Action";
const axios = require("axios").default;

// Api middleware for Fetching User Details
export const apiMiddleware = (store) => (next) => (action) => {
  LOG("<<<<== Api MIDDLEWARE ==>>>>");

  //const navigation = useNavigation();
  switch (action.type) {
    // Every Api call in the Application must be done here.
    case GET_API_DATA:
      var header = {};

      // Header Without Authentication pass noAuth in action, multipart for multipart
      if (action.noAuth) {
        header = HTTP.HEADERS;
      } else {
        if (action.multiPart) {
          header = HTTP.FormDataHeader;
        } else {
          header = HTTP.AuthHeader;
        }
      }

      var method = "post";

      if (action.get) {
        method = "get";
      }

      var config = {
        method: method,
        url: action.requestUrl.trim(),
        // data: action.multiPart
        //   ? action.jsonData
        //   : JSON.stringify(action.jsonData),
        // headers: header,
      };

      LOG("request Type ==> " + action.requestType);
      LOG("Axios Config =====>: " + JSON.stringify(config));

      // Axios is used in this application to make api calls
      axios(config, { timeout: 2 })
        .then((response) => {
          LOG("Raw Response :", response);
          LOG("Status Code :" + response.status);
          LOG("Status Code :" + typeof response.status);
          return Promise.all([response.data, response.status]);
        })
        .then((responseData, status) => {
          LOG("---------------->Response Data<----------------------" + status);
          LOG("request Type ==>" + action.requestType);
          LOG("Axios Response  >>:" + JSON.stringify(responseData));

          next({
            type: API_DATA_RECEIVED,
            responseData: responseData[0],
            statusCode: status,
            requestType: action.requestType,
            requestData: action.jsonData,
            stopSpinner: action.stopSpinner,
            extraData: action.extraData,
          });
        })
        .catch((error) => {
          LOG("---------------->Api Data Error<----------------------");
          LOG("ERROR DATA>>:" + JSON.stringify(error));

          LOG("Error status : ", error.response.status);

          if (error.response.status == 401) {
            store.dispatch({
              type: API_DATA_RECEIVED,
              responseData: error,
              requestData: action.jsonData,
              requestType: action.requestType,
              statusCode: error.response.status,
            });
          } else if (error.response.status == 404) {
            Toast("Something went wrong");
          } else {
            store.dispatch({
              type: API_DATA_ERROR,
              jsonData: error,
              requestData: action.jsonData,
              requestType: action.requestType,
            });
          }
        });

      break;

    default:
      LOG("Default API MIDDLEWARE");
      break;
  }
  next(action);
};

// Application Middleware is for handling response received from received api data
export const ApplicationMiddleware = (store) => (next) => (action) => {
  LOG("FETCH PROCESS MIDDLEWARE");

  switch (action.type) {
    case API_DATA_RECEIVED:
      LOG("API DATA RECEIVED" + JSON.stringify(action));

      if (action.statusCode == 401) {
        LOG("Authentication Error");
        //Save Last Api
        store.dispatch({
          type: API_DATA_ERROR,
          jsonData: action.responseData,
          requestType: action.requestType,
          requestData: action.jsonData,
        });
        HTTP.AuthHeader.Authorization = "";
        HTTP.FormDataHeader.Authorization = "";
        removeItem("credentials");
        store.dispatch(resetStore());
        Actions.login();
        LOG("Authentication Error Completed");
      } else {
        var dispatchSpinner = true; // For stopping dispatch custom ly
        var dispatchNext = false;
        //To disable the loading indicator
        store.dispatch({ type: RECEIVED_API_DATA });
        LOG(
          "Redirection RT == >................................ :" +
            action.requestType
        );

        switch (action.requestType) {
          case StaticValues.createAccount:
            LOG("create_Account_in_middleware :", action);
            dispatchNext = true;

            if (action.responseData.message == "msgcode0005") {
              Toast("Hiffo Id created successfully");
              RootNavigation.navigateScreen("login");
            } else if (action.responseData.message == "msgcode0006") {
              Toast("Mobile number already exists");
            } else {
              Toast("Please try again");
            }
            break;

          case StaticValues.loginRequest:
            LOG("LOGIN REQUEST IN MIDDLEWARE :", action);

            if (action.responseData.data.loginStatus == "SUCCESS") {
              LOG("AUTHENTICATION PASSED");

              HTTP.AuthHeader.Authorization =
                "Bearer " + action.responseData.data.token;
              HTTP.FormDataHeader.Authorization =
                "Bearer " + action.responseData.data.token;

              var validCredential = JSON.stringify(action.requestData);
              storeItem("credential", validCredential);

              RootNavigation.navigateScreen("login");
            } else {
              Toast("Incorrect credentials");

              RootNavigation.navigateScreen("login");

              store.dispatch(stopSpinner());
            }

            dispatchNext = true;
            break;

          case StaticValues.sentOtp:
            LOG("SEND OTP IN MIDDLEWARE ", action.responseData);

            if (action.responseData.status == 1) {
              Toast("Please check your email");
              RootNavigation.navigateScreen("verifyOtp");
              dispatchNext = true;
              store.dispatch(stopSpinner());
            } else {
              Toast("Please try again");
            }

            break;

          case StaticValues.verifyOtp:
            LOG("VERIFY OTP IN MIDDLEWARE ", action);
            if (action.responseData.status == 1) {
              if (action.responseData.data) {
                LOG("OTP VERIFIED SUCCESSFULLY ");
                RootNavigation.navigateScreen("resetPassword");
                dispatchNext = true;
                store.dispatch(stopSpinner());
              } else {
                Toast("Please enter valid otp");
              }
            } else {
            }

            break;

          case StaticValues.resetPassword:
            LOG("RESETPASSWORD OTP IN MIDDLEWARE ", action);

            if (action.responseData.status == 1) {
              RootNavigation.navigateScreen("login");
              dispatchNext = true;
              store.dispatch(stopSpinner());
            } else {
              Toast("Please try again");
            }

            break;

          case GET_PROVIDER_DETAIL:
            console.log(
              "************* INSIDE MIDDLEWARE GET_PROVIDER_DETAIL13 *********************"
            );
            console.log(action.requestData);
            console.log(action.responseData);
            console.log(action.responseData.email);
            RootNavigation.navigateScreen("clientlist", { userName: "Lucy" });
            dispatchNext = true;
            break;

          default:
            LOG("Redirection : Default ");
            dispatchNext = true;
            break;
        }
        if (action.stopSpinner && dispatchSpinner) {
          store.dispatch(stopSpinner());
        }
        if (dispatchNext) {
          store.dispatch({
            type: action.requestType,
            jsonData: action.responseData.data,
            requestData: action.requestData,
          });
        }
      }
      break;

    default:
      LOG("Default APPLICATION MIDDLEWARE");
      next(action);
      break;
  }
};
