import {
  ActionConstants,
  GET_PROVIDER_DETAIL,
  StaticValues,
} from "../common/constants";
import { LOG } from "../common/util";
import { useNavigation, useRoute } from "@react-navigation/native";

const initialState = {
  userDetails: {},
  flowTypeLogin: 1,
  loginResponse: {},
  getOtpResponse: {},
  getVerifyOtpResponse: {},
  getResetPasswordResponse: {},
  profilephoto: "",
};
const reducer = (state = initialState, action) => {
  LOG("<<<<== Auth Reducerr ==>>>> ");
  LOG("Action Type" + action.type);

  switch (action.type) {
    // LOGIN RESPONSE WILL BE HANDLES HERE WE WILL get userdetails, and authToken.

    case StaticValues.loginRequest:
      LOG("LOGIN REQUEST IN REDUCER :", action.jsonData);
      return Object.assign({}, state, {
        loginResponse: action.jsonData,
        profilephoto: action.jsonData.profilephoto,
      });

    case StaticValues.profilePhotoUpload:
      LOG("PROFILE PHOTO UPLOAD IN REDUCER :", action.jsonData);
      return Object.assign({}, state, {
        profilephoto: action.jsonData.fileName,
      });

    case StaticValues.sentOtp:
      LOG("SEND OTP IN REDUCER ", action);
      return Object.assign({}, state, {
        getOtpResponse: action,
      });

    case StaticValues.verifyOtp:
      LOG("VERIFY OTP IN REDUCER ", action);
      return Object.assign({}, state, {
        getVerifyOtpResponse: action,
      });

    case StaticValues.resetPassword:
      LOG("RESETPASSWORD IN REDUCER ", action);
      return Object.assign({}, state, {
        getResetPasswordResponse: action,
      });

    case ActionConstants.VALIDATE_OTP:
      LOG("Validate OTP REQUEST" + JSON.stringify(action));
      var result_data = action.jsonData;
      if (result_data.userDetails && result_data.token) {
        return Object.assign({}, state, {
          userDetails: result_data.userDetails,
        });
      }
      return state;

    case GET_PROVIDER_DETAIL:
      LOG("GET_PROVIDER_DETAIL Flow Type : ", action.jsonData);
      // navigation.navigate("clientlist");
      return Object.assign({}, state, {});

    case ActionConstants.FLOW_TYPE:
      LOG("Flow Type : ", action.jsonData);
      return Object.assign({}, state, {
        flowTypeLogin: action.jsonData,
      });

    default:
      LOG("AUTH REDUCER Default");
      return state;
  }
};

export default reducer;
