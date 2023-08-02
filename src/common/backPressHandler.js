import { Alert, BackHandler } from "react-native";
import { Actions } from "react-native-router-flux";
import { LOG, removeItem } from "./util";
import * as RootNavigation from "../Router/RootNavigation";
import { RefreshPropsList } from "../redux/FarmCheckList-Action";

//Route name has to be passed to work.
export const backPressHandler = (routeName, firstTimeLogin) => {
  LOG("Route Name in backPressHandler :" + routeName);

  if (routeName == "login") {
    Alert.alert(null, "Are you sure you want to exit the app?", [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
      { text: "Exit", onPress: () => BackHandler.exitApp() },
    ]);
  } else if (routeName == "home") {
    Alert.alert(null, "Are you sure you want to logout?", [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "Ok",
        onPress: () => {
          RootNavigation.navigateScreen("login");
          removeItem("credential");
          // dispatch(RefreshPropsList());
        },
        style: "default",
      },
    ]);
  } else if (routeName == "back") {
  } else {
    LOG("*** NEW SCREEN BACK PRESSED HANDLE IT IN BackHandler.js ***");
  }
  return true;
};
export default backPressHandler;
