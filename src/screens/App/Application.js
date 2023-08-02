import React, { useEffect, useState } from "react";
import {
  BackHandler,
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

import { ProgressBar } from "react-native-paper";
import {
  textFontFaceLight,
  textFontFaceMedium,
  textFontFaceSemiBold,
} from "../../common/styles";
import { darkMode, getItem, LOG, removeItem, Toast } from "../../common/util";

import { PermissionsAndroid } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Actions } from "react-native-router-flux";
import { backPressHandler } from "../../common/backPressHandler";
import { announcementColor, colors } from "../../common/colors";
import { useDispatch, useSelector } from "react-redux";
import {
  authenticationVerify,
  storeUserDetailsInRedux,
} from "../../redux/Auth-Action";
import { useNavigation } from "@react-navigation/native";
import { setTheme } from "../../redux/Api-Action";
import Route from "../../Router/Router";
import { useNetInfo } from "@react-native-community/netinfo";
import VersionCheck from "react-native-version-check";

const win = Dimensions.get("window");

const Application = (props) => {
  const Dispatch = useDispatch();
  const navigation = useNavigation();
  const userTheme = useSelector(({ api }) => api.getTheme);
  const netInfo = useNetInfo();

  // state to store state data
  const [data, setData] = useState({
    showProgress: true,
    permissionsGranted: false,
  });

  useEffect(() => {
    LOG("net info in application :", netInfo);
  }, []);

  // UseEffect hook will work only at initial render
  useEffect(() => {
    if (Platform.OS === "android") {
      PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]).then((result) => {
        if (
          result["android.permission.CAMERA"] &&
          result["android.permission.READ_EXTERNAL_STORAGE"] &&
          result["android.permission.WRITE_EXTERNAL_STORAGE"] === "granted"
        ) {
          LOG("Permissions_granted");
          // this.setState({
          //   permissionsGranted: true,
          // });
          setData({
            ...data,
            permissionsGranted: true,
          });
        } else if (
          result["android.permission.CAMERA"] ||
          result["android.permission.READ_EXTERNAL_STORAGE"] ||
          result["android.permission.WRITE_EXTERNAL_STORAGE"] ===
            "never_ask_again"
        ) {
          LOG("Permissions_denied");
          BackHandler.exitApp();
        } else {
          LOG("PERMISSION ELSE CASE HANDLE HERE");
        }
      });
    }
    // hardware back button handler
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackButtonClick
    );

    setTimeout(() => {
      setData({
        ...data,
        showProgress: !data.showProgress,
      });
      // navigation.navigate("intro");

      getItem("credential").then((value) => {
        if (value) {
          var gotCredent = JSON.parse(value);
          LOG("GOT VALUE IN TESTING :", gotCredent);
          // Dispatch(authenticationVerify(gotCredent));
        } else {
          navigation.navigate("login");
        }
      });

      // network connection status check
      // if (netInfo.isConnected) {

      // } else {
      //   LOG("network connection Status Null :" + netInfo.isConnected);
      //   Toast("please check your connection");
      //   navigation.navigate("intro");
      // }
    }, 2000);

    return () => backHandler.remove();
  }, []);

  const handleBackButtonClick = () => {
    navigation.goBack();
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: userTheme ? colors.black : colors.white },
      ]}
    >
      <View style={styles.splashContent}>
        <Image
          source={require("../../../Assests/images/hiffo.png")} //splashLayer.png
          style={styles.hiffoLogo}
        />

        <Text
          style={[
            styles.headingText,
            { color: userTheme ? colors.white : colors.black },
          ]}
        >
          Hiffo
        </Text>

        {/* <Text style={styles.subText}> let the peace meet the plates</Text> */}
      </View>
      <View style={styles.progressbarView}>
        <ProgressBar
          visible={data.showProgress}
          style={styles.progressbarStyle}
          progress={15000}
          indeterminate={true}
          // color={colors.deepGreen}
          color={colors.logoBlue}
        />
      </View>
      <View>
        <Text style={styles.versionText}>
          v{VersionCheck.getCurrentVersion()}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  progressbarStyle: {
    marginHorizontal: 40,
    marginVertical: 80,
    // backgroundColor: colors.mildGreen,
    backgroundColor: colors.logoGreen,
  },
  splashContent: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  hiffoLogo: {
    height: win.height * 0.3,
    width: win.width * 0.8,
    resizeMode: "contain",
    borderWidth: 1,
    // borderColor: colors.black,
  },
  headingText: {
    color: colors.black,
    fontFamily: textFontFaceSemiBold,
    fontSize: 35,
    marginTop: -15,
  },
  subText: {
    fontFamily: textFontFaceLight,
  },
  versionText: {
    alignSelf: "center",
    color: colors.black,
    fontSize: 12,
  },
});

export default Application;
