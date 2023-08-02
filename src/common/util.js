import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, BackHandler, Platform, ToastAndroid } from "react-native";
import RnFs from "react-native-fs";
import { isTesting, ServerUrl } from "./constants";
import * as RootNavigation from "../Router/RootNavigation";
import moment from "moment";

export const FilePathCache = RnFs.CachesDirectoryPath + "/";
export const ImageDownloadUrl = ServerUrl + "auth/image/";
export const VideoDownloadUrl = ServerUrl + "auth/video/";

//APPLICATION LOG GOES HERE IF YOU WANT HIDE THE LOGS JUST HIDE INSIDE HERE :-)
const logger = (string, value) => {
  if (value) {
    console.log(string, value);
  } else {
    console.log(string);
  }
};

export const LOG = isTesting ? logger : () => {};

export const validateEmailAndPhone = (value, type) => {
  LOG("validateEmailPhone");
  let emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  let phoneNumberReg = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  if (type == "email") {
    if (emailReg.test(value.trim()) === true) {
      LOG("email is valid");
      return true;
    } else {
      LOG("email is invalid");
      //  Toast("Please Fill Valid Email");
      return false;
    }
  } else {
    if (phoneNumberReg.test(value.trim()) === true) {
      LOG("phone is valid");
      return true;
    } else {
      LOG("phone is invalid");
      // Toast("Please Fill Valid Email");
      return false;
    }
  }
};

// Default Toast Method for Android
export const Toast = (value) => {
  if (Platform.OS === "android") {
    ToastAndroid.showWithGravity(
      value,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  } else if (Platform.OS === "ios") {
    Alert.alert("Hiffo ", value, [
      { text: "OK", onPress: () => console.log("") },
    ]);
  }
};

// Async storage Getitem ;
export const getItem = async (key) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    // error reading value
    LOG("ERROR " + JSON.stringify(e));
    return null;
  }
};

// asynstorage set item
export const storeItem = async (key, value) => {
  try {
    LOG("STORING Key : " + key + " Value : " + value);
    return await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
    LOG("ERROR " + JSON.stringify(e));
    return null;
  }
};

// asynstorage Remove item
export const removeItem = async (key) => {
  try {
    LOG("Removing Key : " + key);
    return await AsyncStorage.removeItem(key);
  } catch (e) {
    // saving error
    LOG("ERROR " + JSON.stringify(e));
    return null;
  }
};

// Camelcase String
export const StartWithCapital = (noFormattedString) => {
  try {
    return (
      noFormattedString.charAt(0).toUpperCase() +
      noFormattedString.slice(1).toLowerCase()
    );
  } catch (error) {
    return noFormattedString;
  }
};

const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const UserNameFormatter = (value) => {
  try {
    value = value.toLowerCase(); // First lowercase all the string
    return value.split(" ").map(capitalize).join(" ");
    // splits words using " " and captalize every item in the map and join the string  " "
  } catch (e) {
    return value;
  }
};

export const BackCommonPress = () => {
  Alert.alert(null, "Are you sure you want to logout?", [
    {
      text: "Cancel",
      onPress: () => {},
      style: "cancel",
    },
    {
      text: "Ok",
      onPress: () => {
        RootNavigation.navigate("login");
        removeItem("credential");
        dispatch(ResetChatScreen());
      },
      style: "default",
    },
  ]);
};

export const CustomAlert = (alertJson, okFun) => {
  Alert.alert(alertJson.heading, alertJson.title, [
    {
      text: alertJson.cancelText,
      onPress: () => {},
      style: "cancel",
    },
    {
      text: alertJson.okText,
      onPress: () => {
        okFun();
      },
      style: "cancel",
    },
  ]);
};

export const calenderDateFormat = (value) => {
  return moment(value).format("YYYY-MM-DD");
};

export const GetDateFormat = (value) => {
  if (value) {
    return moment(value).format("DD/MM/YYYY");
  }
};

export const GetDateFormat2 = (value) => {
  if (value) {
    return moment(value).format("MM/DD/YYYY");
  }
};

export const getUniqueListBy = (arr, key) => {
  return [...new Map(arr.map((item) => [item[key], item])).values()];
};
export const lawnList = [
  {
    lawnId: 1,
    userId: 5,
    screenformId: 2,
    formName: "Property 01",
    recordStatus: null,
    createdDate: "2023-03-30T16:59:01.000+00:00",
    updatedDate: "2023-03-30T16:59:01.000+00:00",
    pageNo: null,
  },
  {
    lawnId: 2,
    userId: 5,
    screenformId: 2,
    formName: "Property 02",
    recordStatus: null,
    createdDate: "2023-03-30T17:01:26.000+00:00",
    updatedDate: "2023-03-30T17:01:26.000+00:00",
    pageNo: null,
  },
  {
    lawnId: 3,
    userId: 5,
    screenformId: 3,
    formName: "PackHouse 01",
    recordStatus: null,
    createdDate: "2023-03-30T17:02:41.000+00:00",
    updatedDate: "2023-03-30T17:02:41.000+00:00",
    pageNo: null,
  },
  {
    lawnId: 4,
    userId: 5,
    screenformId: 3,
    formName: "PackHouse 02",
    recordStatus: null,
    createdDate: "2023-03-30T17:02:49.000+00:00",
    updatedDate: "2023-03-30T17:02:49.000+00:00",
    pageNo: null,
  },
];
