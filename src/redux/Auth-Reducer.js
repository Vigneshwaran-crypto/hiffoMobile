import {
  ActionConstants,
  GET_PROVIDER_DETAIL,
  StaticValues,
} from "../common/constants";
import { LOG } from "../common/util";
import { useNavigation, useRoute } from "@react-navigation/native";

const initialState = {
  userDetails: {},
  loginResponse: {},
  getOtpResponse: {},
  getVerifyOtpResponse: {},
  getResetPasswordResponse: {},
  hotelId: {},
};
const reducer = (state = initialState, action) => {
  LOG("<<<<== Auth Reducerr ==>>>> ");
  LOG("Action Type" + action.type);

  switch (action.type) {
    // LOGIN RESPONSE WILL BE HANDLES HERE WE WILL get userdetails, and authToken.

    case StaticValues.createAccount:
      LOG("create_Account_in_reducer :", action);

      const hId = action.jsonData[0];

      LOG("single hotel id :", hId);

      return Object.assign({}, state, {
        hotelId: hId,
      });

    case StaticValues.loginRequest:
      LOG("LOGIN REQUEST IN REDUCER :", action.jsonData);
      return Object.assign({}, state, {
        loginResponse: action.jsonData,
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

    case GET_PROVIDER_DETAIL:
      LOG("GET_PROVIDER_DETAIL Flow Type : ", action.jsonData);
      // navigation.navigate("clientlist");
      return Object.assign({}, state, {});

    default:
      LOG("AUTH REDUCER Default");
      return state;
  }
};

export default reducer;
