import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Alert,
  BackHandler,
  Dimensions,
  Platform,
  ToastAndroid,
} from "react-native";
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

export const foodList = [
  {
    id: 1,
    name: "Meals with indian chars",
    price: "250 ₹",
    quantity: "200 g",
    type: "set",
    imagePath: require("../../Assests/images/meals.jpg"),
  },
  {
    id: 2,
    name: "Muttom Kozhambu",
    price: "200 ₹",
    quantity: "200 g",
    type: "set",
    imagePath: require("../../Assests/images/mutton.jpg"),
  },
  {
    id: 3,
    name: "Sea Food",
    price: "350 ₹",
    quantity: "200 g",
    type: "set",
    imagePath: require("../../Assests/images/seaFood.jpg"),
  },
  {
    id: 4,
    name: "Chapati and Salna",
    price: "150 ₹",
    quantity: "2 pcs",
    type: "add",
    imagePath: require("../../Assests/images/chapati.jpg"),
  },
  {
    id: 5,
    name: "South Indian Filter Coffee",
    price: "50 ₹",
    quantity: "60 ml",
    type: "add",
    imagePath: require("../../Assests/images/coffee.jpg"),
  },
];

export const addOnList = [
  {
    id: 1,
    name: "Somosa with chutney",
    price: "50 ₹",
    quantity: "2 pcs",
    type: "set",
    imagePath: require("../../Assests/images/samosa.jpg"),
  },
  {
    id: 2,
    name: "Special pasta",
    price: "70 ₹",
    quantity: "4 pcs",
    type: "set",
    imagePath: require("../../Assests/images/pasta.jpg"),
  },
  {
    id: 3,
    name: "Gulobjamun",
    price: "120 ₹",
    quantity: "6 pcs",
    type: "set",
    imagePath: require("../../Assests/images/gulobjamun.jpg"),
  },
];

export const addFoodItems = [
  require("../../Assests/images/gulobjamun.jpg"),
  require("../../Assests/images/pasta.jpg"),
  require("../../Assests/images/samosa.jpg"),
  require("../../Assests/images/seaFood.jpg"),
  require("../../Assests/images/meals.jpg"),
  require("../../Assests/images/chapati.jpg"),
];
