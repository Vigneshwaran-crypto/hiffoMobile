// CONSTANTS used in the overall application
export const isTesting = true;

export const ServerUrl = "http://hiffo.in/";

export const ActionConstants = {};

// Constants for reducer

export const StaticValues = {
  storeTokenInRedux: "storeTokenInRedux",
  setTheme: "setTheme",
  editProfile: "editProfile",
  profilePhotoUpload: "profilePhotoUpload",

  createAccount: "createAccount",
  loginRequest: "loginRequest",
  sentOtp: "sentOtp",
  verifyOtp: "verifyOtp",
  resetPassword: "resetPassword",
  createRestaurant: "createRestaurant",
  generateHid: "generateHid",

  getAllFoods: "getAllFoods",
  createMenu: "createMenu",
  editMenu: "editMenu",
  deleteFood: "deleteFood",

  getAllAddOn: "getAllAddOn",
  createAddOn: "createAddOn",
  editAddOn: "editAddOn",
  deleteAddOn: "deleteAddOn",
};
//Api Constants
export const GET_API_DATA = "GET_API_DATA";
export const API_DATA_LOADING = "API_DATA_LOADING";
export const API_DATA_ERROR = "API_DATA_ERROR";
export const API_DATA_RECEIVED = "API_DATA_RECEIVED";
export const RECEIVED_API_DATA = "RECEIVED_API_DATA";
export const RESET_REDUX_STORE = "RESET_REDUX_STORE";

export const STORE_HEADER_FOR_WEBVIEW = "STORE_HEADER_FOR_WEBVIEW";
export const GET_PROVIDER_DETAIL = "GET_PROVIDER_DETAIL";
/**
|--------------------------------------------------
| Once initiate this using action init spinner in api action
| Then Close properly using  spinnerstop action in api action or 
| in api reducer by setting customspinner false;
|
| Another method is use another key like custom spinner in your reducer 
| and action to enable it then you can disable it using the reducer retun state
|--------------------------------------------------
*/
export const CUSTOM_SPINNER_ENABLE = "CUSTOM_SPINNER_ENABLE";
export const CUSTOM_SPINNER_DISABLE = "CUSTOM_SPINNER_DISABLE";

export const AuthToken = "";

//HTTP request headers and urls
export const HTTP = {
  // Urls'

  CREATE_ACCOUNT: ServerUrl + "signup",
  LOGIN_REQUEST: ServerUrl + "signin",
  SEND_OTP_URL: ServerUrl + "otpgenerator",
  VERIFY_OTP_URL: ServerUrl + "otpverifier",
  RESET_PASSWORD_URL: ServerUrl + "auth/mobilePasswordChanged",

  CREATE_RESTAURANT: ServerUrl + "createrestaurant",
  HID_GENERATOR: ServerUrl + "hidgenerator",

  GET_ALL_FOODS: ServerUrl + "foodfetcher",
  CREATE_MENU: ServerUrl + "createmenu",
  EDIT_MENU: ServerUrl + "editfoodmenu",
  DELETE_MENU: ServerUrl + "deletefooditem",

  GET_ALL_ADDON: ServerUrl + "addonsfetcher",
  CREATE_ADD_ON: ServerUrl + "createaddonsitem",
  EDIT_ADD_ON: ServerUrl + "editfoodaddons",
  DELETE_ADD_ON: ServerUrl + "deletefoodaddons",

  EDIT_PROFILE: ServerUrl + "api/editUser",
  PROFILE_PHOTO_UPLOAD: ServerUrl + "api/updateProfilePhoto", //updateProfilePhoto  fileupload

  // Header For Api Call Without Authorization.
  HEADERS: {
    "Content-Type": "application/json",
    Accept: "*/*",
  },
  // Header For Api Call With Authorization.
  AuthHeader: {
    "Content-Type": "application/json",
    Accept: "*/*",
    Authorization: AuthToken,
  },

  /** For Multipart Form data add fileUpload = true in action.js
   * Before hitting form data please update the Http.Authorization it will not contain token*/
  // Form Data Header with Authorization
  FormDataHeader: {
    "Content-Type": "multipart/form-data",
    Accept: "*/*",
    Authorization: AuthToken,
  },

  GET_PROVIDER_URL: "https://intlws.myoutcomesapp.com/api/provider/getprovider",
};
