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
import {
  LOG,
  storeItem,
  Toast,
  validateEmailAndPhone,
} from "../../common/util";
import { initSpinner } from "../../redux/Api-Action";
import { sendOtpAction } from "../../redux/Auth-Action";
import { ScrollView } from "react-native-gesture-handler";

const win = Dimensions.get("window");

const ForgotPassword = () => {
  const navigation = useNavigation();
  const userTheme = useSelector(({ api }) => api.getTheme);
  const customSpinner = useSelector(({ api }) => api.customSpinner);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const forgotOnPress = () => {
    navigation.navigate("verifyOtp");
    // if (email) {
    //   const isValidEmail = validateEmailAndPhone(email, "email");

    //   if (isValidEmail) {
    //     LOG("userEmail valid", email);
    //     const otpRequest = {
    //       mailId: email,
    //     };
    //     dispatch(initSpinner());
    //     dispatch(sendOtpAction(otpRequest));
    //     const storeMail = JSON.stringify(otpRequest);
    //     storeItem("resetEmail", storeMail);
    //   } else {
    //     Toast("Please enter valid email");
    //   }
    // } else {
    //   Toast("Please enter your email");
    // }
  };

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
                ENTER EMAIL
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
                We will send an OTP to your mail to verify your account
              </Text>
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
                placeholder="Enter Email"
                placeholderTextColor={userTheme ? colors.greyC4 : colors.black}
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
                <Text style={styles.buttonText}>SEND</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  loaderStyle: {
    alignSelf: "center",
  },

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
  },
  formText: {
    color: colors.tanGrey,
    marginVertical: 10,
    fontSize: 18,
  },
  textInputs: {
    fontFamily: textFontFaceMedium,
    fontSize: fontsSize.smallText,
    alignSelf: "flex-start",
    borderRadius: 8,
    // borderWidth: 1,
    // borderColor: colors.baseBackground,
    padding: 10,
    marginVertical: 10,
    width: win.width * 0.8,
    color: colors.black,
    marginRight: 20,
    backgroundColor: colors.inputGrey,
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
  loaderView: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ForgotPassword;
