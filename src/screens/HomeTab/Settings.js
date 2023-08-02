import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { BackHandler, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Switch } from "react-native";
import { View } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../../common/colors";
import { textFontFace, textFontFaceMedium } from "../../common/styles";
import { getItem, LOG, removeItem, storeItem } from "../../common/util";
import { setTheme } from "../../redux/Api-Action";

const Settings = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [permission, setPermission] = useState(false);
  const [notification, setNotification] = useState(false);

  const userTheme = useSelector(({ api }) => api.getTheme);

  const backArrowOnPress = () => {
    navigation.goBack();
  };

  const darkToggleChange = () => {
    dispatch(setTheme(!userTheme));
    var themeData = JSON.stringify({
      theme: !userTheme,
    });
    storeItem("themeState", themeData);
  };

  //for testing
  const logOutOnPress = () => {
    removeItem("credential");
    navigation.navigate("login");
  };

  useEffect(() => {
    getItem("themeState")
      .then((result) => {
        var parsed = JSON.parse(result);
        LOG("RESULT IN getItem :" + parsed.theme);
      })
      .catch((error) => {
        LOG("catch in get item", error);
      });
  }, [userTheme]);

  useEffect(() => {
    themeSet = userTheme;
  }, []);

  useEffect(() => {
    const backHandle = BackHandler.addEventListener(
      "hardwareBackPress",
      backPressed
    );
    return () => {
      backHandle.remove();
    };
  }, []);

  const backPressed = () => {
    navigation.goBack();
    return true;
  };

  return (
    <View
      style={{ backgroundColor: userTheme ? "black" : "transparent", flex: 1 }}
    >
      <View style={styles.container}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={backArrowOnPress}
          >
            <Feather
              name="chevron-left"
              size={35}
              color={userTheme ? colors.white : colors.black}
            />
          </TouchableOpacity>

          <View style={styles.headingView}>
            <Text
              style={[
                styles.settingsText,
                { color: userTheme ? colors.white : colors.black },
              ]}
            >
              Settings
            </Text>
          </View>
        </View>

        <View style={{ flex: 1 }}>
          {/* <View style={styles.listItemView}>
            <Text
              style={[
                styles.listItemText,
                { color: userTheme ? colors.white : colors.black },
              ]}
            >
              Permission
            </Text>
            <Switch
              trackColor={{
                true: colors.buttonGreen,
                false: colors.inActiveGrey,
              }}
              thumbColor={colors.white}
              onValueChange={() => {
                setPermission(!permission);
              }}
              value={permission}
              style={styles.listItemButton}
            />
          </View> */}

          {/* <View style={styles.listItemView}>
            <Text
              style={[
                styles.listItemText,
                { color: userTheme ? colors.white : colors.black },
              ]}
            >
              Notification
            </Text>
            <Switch
              trackColor={{
                true: colors.buttonGreen,
                false: colors.inActiveGrey,
              }}
              thumbColor={colors.white}
              onValueChange={() => {
                setNotification(!notification);
              }}
              value={notification}
              style={styles.listItemButton}
            />
          </View> */}

          <View style={styles.listItemView}>
            <Text
              style={[
                styles.listItemText,
                { color: userTheme ? colors.white : colors.black },
              ]}
            >
              Dark Mode
            </Text>
            <Switch
              trackColor={{
                true: colors.buttonGreen,
                false: colors.inActiveGrey,
              }}
              thumbColor={colors.white}
              value={userTheme}
              onValueChange={() => {
                darkToggleChange();
              }}
              style={styles.listItemButton}
            />
          </View>

          {/* <TouchableOpacity>
            <View style={styles.listItemView}>
              <Text
                style={[
                  styles.listItemText,
                  { color: userTheme ? colors.white : colors.black },
                ]}
              >
                Security
              </Text>
              <Feather
                name="chevron-right"
                size={26}
                color={userTheme ? colors.white : colors.black}
              />
            </View>
          </TouchableOpacity> */}

          {/* <TouchableOpacity>
            <View style={styles.listItemView}>
              <Text
                style={[
                  styles.listItemText,
                  { color: userTheme ? colors.white : colors.black },
                ]}
              >
                Help
              </Text>
              <Feather
                name="chevron-right"
                size={26}
                color={userTheme ? colors.white : colors.black}
              />
            </View>
          </TouchableOpacity> */}

          {/* <TouchableOpacity>
            <View style={styles.listItemView}>
              <Text
                style={[
                  styles.listItemText,
                  { color: userTheme ? colors.white : colors.black },
                ]}
              >
                Language
              </Text>
              <Feather
                name="chevron-right"
                size={26}
                color={userTheme ? colors.white : colors.black}
              />
            </View>
          </TouchableOpacity> */}

          {/* <TouchableOpacity>
            <View style={styles.listItemView}>
              <Text
                style={[
                  styles.listItemText,
                  { color: userTheme ? colors.white : colors.black },
                ]}
              >
                About Application
              </Text>
              <Feather
                name="chevron-right"
                size={26}
                color={userTheme ? colors.white : colors.black}
              />
            </View>
          </TouchableOpacity> */}

          {/* <TouchableOpacity onPress={logOutOnPress}>
            <View style={styles.listItemView}>
              <Text
                style={[
                  styles.listItemText,
                  { color: userTheme ? colors.white : colors.black },
                ]}
              >
                Logout
              </Text>
              <Feather
                name="chevron-right"
                size={26}
                color={userTheme ? colors.white : colors.black}
              />
            </View>
          </TouchableOpacity> */}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    marginBottom: 50,
  },
  backButton: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: colors.borderGrey,
  },
  headingView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  settingsText: {
    color: colors.black,
    fontFamily: textFontFaceMedium,
    fontSize: 20,
  },
  listItemView: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.borderGrey,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
    // display: "none",
  },
  listItemText: {
    fontFamily: textFontFace,
    fontSize: 15,
  },
});

export default Settings;
