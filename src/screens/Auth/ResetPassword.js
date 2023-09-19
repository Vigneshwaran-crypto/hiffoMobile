import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  BackHandler,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../../common/colors";
import Header from "../../common/Header";
import {
  fontsSize,
  textFontFaceLight,
  textFontFaceMedium,
  textFontFaceSemiBold,
} from "../../common/styles";
import { getItem, LOG, Toast } from "../../common/util";
import CryptoJS from "crypto-js";
import { resetPasswordAction } from "../../redux/Auth-Action";
import { initSpinner } from "../../redux/Api-Action";
const win = Dimensions.get("window");

const ResetPassword = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userTheme = useSelector(({ api }) => api.getTheme);
  const customSpinner = useSelector(({ api }) => api.customSpinner);

  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [email, setEmail] = useState("");

  const title = props.route.params.title;
  const name = props.route.params.name;

  const confirmOnPress = () => {
    if (!newPassword) {
      Toast("Please enter new password");
    } else if (!confirmPassword) {
      Toast("Please enter confirm password");
    } else {
      if (newPassword == confirmPassword) {
        var encryptedPass = CryptoJS.MD5(confirmPassword).toString();

        const resetPasswordReq = {
          mailId: email,
          password: encryptedPass,
        };
        // dispatch(initSpinner());
        // dispatch(resetPasswordAction(resetPasswordReq));
        Toast("Password changed successfully");
      } else {
        Toast("Miss Matching Passwords");
      }
    }
  };

  useEffect(() => {
    getItem("resetEmail")
      .then((result) => {
        const validData = JSON.parse(result);

        LOG("get item email in reset password ", validData.mailId);

        setEmail(validData.mailId);
      })
      .catch((err) => {
        LOG("err");
      });
  }, []);

  useEffect(() => {
    const backHandle = BackHandler.addEventListener(
      "hardwareBackPress",
      backHardwarePress
    );
    return () => {
      backHandle.remove();
    };
  }, []);
  const backHardwarePress = () => {
    navigation.goBack();
    return true;
  };

  return (
    <View style={styles.parentContainer}>
      <Header title={"CREATE PASSWORD"} />
      <View style={styles.container}>
        <ScrollView
          behavior="padding"
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.splashContent}>
            <Image
              source={require("../../../Assests/images/hiffo.png")}
              style={styles.hiffoLogo}
            />

            <Text style={styles.mediumText}>
              {title == "SIGNUP" ? "Hi " + name : "CREATE PASSWORD"}
            </Text>
            <Text style={styles.headingText}>Create your password here !</Text>
          </View>

          {customSpinner ? (
            <View style={styles.loaderView}>
              <ActivityIndicator
                size={"large"}
                color={colors.buttonGreen}
                animating={customSpinner}
                style={styles.loaderStyle}
              />
            </View>
          ) : null}

          <View style={styles.authContent}>
            <View style={styles.emailView}>
              <TextInput
                style={styles.tIStyle}
                onChangeText={setNewPassword}
                placeholder={"New Password"}
                placeholderTextColor={colors.grey}
                value={newPassword}
                keyboardType={"ascii-capable"}
                underlineColorAndroid={colors.transparent}
                selectionColor={colors.baseBackground}
                textContentType="emailAddress"
                autoCapitalize="none"
                autoCorrect={false}
                autoCompleteType="email"
              />
            </View>

            <View style={styles.passwordView}>
              <TextInput
                style={styles.tIStyle}
                onChangeText={setConfirmPassword}
                placeholder={"Confirm Password"}
                placeholderTextColor={colors.grey}
                value={confirmPassword}
                keyboardType={"ascii-capable"}
                underlineColorAndroid={colors.transparent}
                selectionColor={colors.baseBackground}
                textContentType="password"
                autoCapitalize="none"
                autoCorrect={false}
                autoCompleteType="email"
                secureTextEntry={true}
              />
            </View>
          </View>

          <View>
            <TouchableOpacity onPress={confirmOnPress}>
              <LinearGradient
                colors={[colors.buttonGreen, colors.activeGreen]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.logInButton}
              >
                <Text style={styles.logInText}>Confirm</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  tIStyle: {
    backgroundColor: colors.inputGrey,
    color: colors.black,
    paddingVertical: 12,
    borderRadius: 5,
    fontFamily: textFontFaceLight,
    paddingStart: 10,
  },
  splashContent: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    marginTop: 50,
  },
  hiffoLogo: {
    height: win.height * 0.25,
    width: win.width * 0.6,
    resizeMode: "contain",
  },
  container: {
    justifyContent: "center",
    backgroundColor: colors.white,
    width: "85%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  loaderView: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    zIndex: 2,
    elevation: 5,
  },
  loaderStyle: {
    alignSelf: "center",
  },
  backButtonView: {
    marginVertical: 15,
    marginHorizontal: 10,
    alignSelf: "flex-start",
  },
  headerContent: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  headingText: {
    fontFamily: textFontFaceLight,
    color: colors.black,
  },

  authContent: {
    marginHorizontal: 25,
    marginVertical: 20,
    justifyContent: "center",
  },
  emailView: {
    marginVertical: 10,
  },
  passwordView: {
    marginVertical: 20,
  },
  authText: {
    fontFamily: textFontFaceMedium,
    color: colors.textGreen,
  },
  textInputAuth: {
    borderBottomWidth: 1,
    borderBottomColor: colors.transparent,
  },
  logInButton: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 60,
    paddingVertical: 10,
    borderRadius: 30,
  },
  logInText: {
    color: colors.white,
    fontFamily: textFontFaceMedium,
    paddingVertical: 2,
  },

  mediumText: {
    color: colors.black,
    fontFamily: textFontFaceSemiBold,
    color: colors.black,
    fontSize: 20,
    alignSelf: "center",
  },
});

export default ResetPassword;
