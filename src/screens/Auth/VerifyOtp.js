import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import {
  BackHandler,
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
import { initSpinner } from "../../redux/Api-Action";
import { verifyOtpAction } from "../../redux/Auth-Action";

const win = Dimensions.get("window");

const VerifyOtp = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userTheme = useSelector(({ api }) => api.getTheme);
  const customSpinner = useSelector(({ api }) => api.customSpinner);
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");

  const forgotOnPress = () => {
    navigation.navigate("resetPassword");

    // if (otp) {
    //   const verifyOtpRequest = {
    //     otp: otp,
    //     mailId: email,
    //   };
    //   dispatch(initSpinner());
    //   dispatch(verifyOtpAction(verifyOtpRequest));
    // } else {
    //   Toast("Please enter otp");
    // }
  };

  useEffect(() => {
    getItem("resetEmail").then((result) => {
      const validData = JSON.parse(result);

      LOG("get item email in verify otp ", validData.mailId);

      setEmail(validData.mailId);
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
    <View style={styles.container(userTheme)}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={styles.wholeView}>
          <Header title={"FORGOT PASSWORD"} />

          <View style={styles.forgotView}>
            <View style={styles.splashContent}>
              <Text
                style={[
                  styles.headingText,
                  { color: userTheme ? colors.white : colors.black },
                ]}
              >
                ENTER OTP
              </Text>
              <Text
                style={[
                  styles.headingText,
                  {
                    color: userTheme ? colors.white : colors.black,
                    fontFamily: textFontFaceLight,
                    fontSize: 15,
                  },
                ]}
              >
                Enter OTP for verify your account
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "flex-start",
                  alignItems: "center",
                  marginVertical: 2,
                }}
              >
                <Text
                  style={{
                    color: colors.lightGreen,
                    marginEnd: 8,
                    fontFamily: textFontFaceMedium,
                  }}
                >
                  00:32 Sec
                </Text>
                <Text
                  style={[
                    styles.headingText,
                    {
                      color: userTheme ? colors.white : colors.black,
                      fontSize: 14,
                    },
                  ]}
                >
                  RESEND
                </Text>
              </View>
            </View>

            {customSpinner ? (
              <View style={styles.loaderView}>
                <ActivityIndicator
                  color={colors.buttonGreen}
                  animating={customSpinner}
                  size={"large"}
                  style={styles.loaderStyle}
                />
              </View>
            ) : null}

            <View style={styles.fieldView}>
              <TextInput
                style={styles.textInputs}
                placeholder="X"
                placeholderTextColor={userTheme ? colors.greyC4 : colors.grey}
                color={userTheme ? colors.white : colors.black}
                onChangeText={setEmail}
                value={email}
              />

              <TextInput
                style={styles.textInputs}
                placeholder="X"
                placeholderTextColor={userTheme ? colors.greyC4 : colors.grey}
                color={userTheme ? colors.white : colors.black}
                onChangeText={setEmail}
                value={email}
              />

              <TextInput
                style={styles.textInputs}
                placeholder="X"
                placeholderTextColor={userTheme ? colors.greyC4 : colors.grey}
                color={userTheme ? colors.white : colors.black}
                onChangeText={setEmail}
                value={email}
              />

              <TextInput
                style={styles.textInputs}
                placeholder="X"
                placeholderTextColor={userTheme ? colors.greyC4 : colors.grey}
                color={userTheme ? colors.white : colors.black}
                onChangeText={setEmail}
                value={email}
              />
            </View>

            <TouchableOpacity style={styles.buttonView} onPress={forgotOnPress}>
              <LinearGradient
                colors={[colors.lightGreen, colors.buttonGreen]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientButton}
              >
                <Text style={styles.buttonText}>VERIFY</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: (userTheme) => ({
    flex: 1,
    // marginHorizontal: 20,
    backgroundColor: userTheme ? colors.black : colors.white,
  }),
  wholeView: {
    flex: 1,
    marginHorizontal: 20,
  },
  forgotView: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 20,
    marginBottom: 100,
  },
  fieldView: {
    marginVertical: 5,
    flexDirection: "row",
  },
  formText: {
    color: colors.tanGrey,
    marginVertical: 10,
    fontSize: 18,
  },
  textInputs: {
    fontFamily: textFontFaceMedium,
    fontSize: fontsSize.smallText,
    alignSelf: "center",
    borderRadius: 5,
    // borderWidth: 1,
    // borderColor: colors.baseBackground,
    padding: 10,
    marginVertical: 10,
    // width: win.width * 0.8,
    width: 50,
    color: colors.black,
    marginRight: 20,
    backgroundColor: colors.inputGrey,
    marginEnd: 12,
    textAlign: "center",
  },
  gradientButton: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingVertical: 10,
    borderRadius: 30,
  },
  buttonText: {
    color: colors.white,
    fontFamily: textFontFaceMedium,
  },
  buttonView: {
    marginVertical: 20,
    alignItems: "center",
  },
  splashContent: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    marginBottom: 50,
  },
  splashEightOne: {
    height: win.height * 0.2,
    width: win.width * 0.3,
    resizeMode: "contain",
  },
  headingText: {
    color: colors.black,
    fontFamily: textFontFaceSemiBold,
    fontSize: 25,
    alignSelf: "flex-start",
  },
  alertText: {
    marginVertical: 10,
    fontFamily: textFontFaceLight,
    textAlign: "center",
  },
  loaderView: {
    position: "absolute",
    left: 0,
    top: 85,
    bottom: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default VerifyOtp;
