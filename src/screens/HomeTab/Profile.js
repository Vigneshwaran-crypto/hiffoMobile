import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, BackHandler, StyleSheet, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { Image } from "react-native";
import { Text } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { useDispatch, useSelector } from "react-redux";
import backPressHandler from "../../common/backPressHandler";
import { colors } from "../../common/colors";
import {
  textFontFace,
  textFontFaceLight,
  textFontFaceMedium,
  textFontFaceSemiBold,
} from "../../common/styles";
import { getItem, LOG, removeItem } from "../../common/util";
import { ServerUrl } from "../../common/constants";
import { getFarmCheckListForms } from "../../redux/Api-Action";
import { ResetChatScreen } from "../../redux/Calibration-Action";

const Profile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userTheme = useSelector(({ api }) => api.getTheme);
  const userDetails = useSelector(({ auth }) => auth.loginResponse);
  const profileData = useSelector(({ api }) => api.getProfileData);
  const profilephoto = useSelector(({ auth }) => auth.profilephoto);
  const [imageUri, setImageUri] = useState("");

  useEffect(() => {
    LOG("USER DETAILS IN PROFILE :", userDetails);
    LOG("PROFILE DETAILS IN PROFILE :", profileData);
    LOG("profile photo :", ServerUrl + "auth/image/" + profilephoto);
    LOG("UID Check", userDetails.uId);
  }, [profileData]);

  useEffect(() => {
    getItem("defineBlock")
      .then((val) => {
        const items = JSON.parse(val);

        LOG("got defineBlock Value form async :" + items);
      })
      .catch((err) => {
        LOG("error occured while gettingf value form asyn");
      });
  }, []);

  const editOnPress = () => {
    navigation.navigate("editProfile", {
      uId: userDetails.uId,
    });
  };

  const settingsOnPress = () => {
    navigation.navigate("settings");
  };

  const logoutBtnAction = () => {
    Alert.alert(null, "Are you sure you want to logout?", [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "Ok",
        onPress: () => {
          navigation.navigate("login");

          removeItem("credential");
          dispatch(ResetChatScreen());
        },
        style: "default",
      },
    ]);
  };

  const myFormOnPress = () => {
    const farmReq = {
      pageNo: 0,
    };
    dispatch(getFarmCheckListForms(farmReq));
    navigation.navigate("checkList", { from: "View Farm" });
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: userTheme ? colors.black : colors.white },
      ]}
    >
      <View style={styles.headerContent}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <Text
            style={[
              styles.profileText,
              { color: userTheme ? colors.white : colors.black },
            ]}
          >
            Profile
          </Text>
        </View>
      </View>

      <View style={styles.profileContent}>
        <Image
          // source={require("../../../Assests/images/Prolile.png")}
          source={
            profilephoto
              ? { uri: ServerUrl + "auth/image/" + profilephoto }
              : require("../../../Assests/images/Prolile.png")
          }
          style={styles.profileImage}
        />

        <Text
          style={[
            styles.profileName,
            { color: userTheme ? colors.white : colors.black },
          ]}
        >
          {profileData.length != 0
            ? profileData.firstName
            : userDetails.firstName}
        </Text>

        <Text
          style={[
            styles.profileUserName,
            { color: userTheme ? colors.white : colors.black },
          ]}
        >
          {profileData.length != 0
            ? profileData.lastName
            : userDetails.lastName}
        </Text>

        <TouchableOpacity style={styles.editButton} onPress={editOnPress}>
          <Text
            style={[
              styles.editText,
              { color: userTheme ? colors.white : colors.black },
            ]}
          >
            Edit
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.listContent}>
        {/* <TouchableOpacity style={styles.listButton} onPress={myFormOnPress}>
          <Text
            style={[
              styles.listText,
              { color: userTheme ? colors.white : colors.black },
            ]}
          >
            My Farm
          </Text>
          <Feather
            name="chevron-right"
            size={30}
            color={userTheme ? colors.white : colors.black}
          />
        </TouchableOpacity> */}

        <TouchableOpacity style={styles.listButton} onPress={settingsOnPress}>
          <Text
            style={[
              styles.listText,
              { color: userTheme ? colors.white : colors.black },
            ]}
          >
            Settings
          </Text>
          <Feather
            name="chevron-right"
            size={30}
            color={userTheme ? colors.white : colors.black}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.listButton} onPress={logoutBtnAction}>
          <Text
            style={[
              styles.listText,
              { color: userTheme ? colors.white : colors.black },
            ]}
          >
            Logout
          </Text>
          <Feather
            name="chevron-right"
            size={30}
            color={userTheme ? colors.white : colors.black}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  backButton: {
    alignSelf: "flex-start",
    position: "absolute",
    borderWidth: 0.5,
    borderRadius: 50,
    margin: 10,
    borderColor: colors.greyC4,
  },
  profileImage: {
    resizeMode: "contain",
    height: 180,
    width: 180,
    borderRadius: 90,
    borderWidth: 1,
  },
  profileText: {
    alignSelf: "center",
    fontFamily: textFontFaceMedium,
    fontSize: 20,
    marginVertical: 15,
    color: "#2C3040",
  },
  profileContent: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
    flex: 1,
  },
  profileName: {
    color: colors.black,
    fontFamily: textFontFaceMedium,
    fontSize: 28,
    marginTop: 5,
    marginBottom: -10,
  },
  profileUserName: {
    fontFamily: textFontFaceLight,
    marginVertical: 5,
  },
  editButton: {
    borderColor: colors.buttonGreen,
    borderWidth: 1.5,
    borderRadius: 7,
    marginVertical: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  editText: {
    color: colors.black,
    fontSize: 15,
  },
  listContent: {
    marginHorizontal: 30,
    flex: 1.3,
  },

  listButton: {
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: "center",
    borderColor: colors.borderGrey,
    borderRadius: 10,
    marginVertical: 10,
  },
  listText: {
    fontFamily: textFontFace,
    color: colors.black,
    fontSize: 20,
  },
});

export default Profile;
