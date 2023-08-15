import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  BackHandler,
  Dimensions,
  Image,
  TextInput,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { View } from "react-native";
import { black } from "react-native-paper/lib/typescript/styles/colors";
import { colors } from "../../common/colors";
import {
  textFontFaceLight,
  textFontFaceMedium,
  textFontFaceSemiBold,
} from "../../common/styles";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import LinearGradient from "react-native-linear-gradient";
import backPressHandler from "../../common/backPressHandler";
import { LOG, validateEmailAndPhone } from "../../common/util";
import { Toast } from "../../common/util";
import CryptoJS from "crypto-js";
import { authenticationVerify, createAccount } from "../../redux/Auth-Action";
import { initSpinner } from "../../redux/Api-Action";
import Header from "../../common/Header";

const Dheight = Dimensions.get("window").height;
const Dwidth = Dimensions.get("window").width;

const SignUp = (props) => {
  const navigation = useNavigation();
  const userTheme = useSelector(({ api }) => api.getTheme);
  const customSpinner = useSelector(({ api }) => api.customSpinner);
  const route = useRoute();
  const dispatch = useDispatch();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setMail] = useState("");
  const [mobileNo, setMobileNo] = useState("");

  useEffect(() => {
    // setUserName("VigneshDemo");
    // setPassword("pass123");
    // setMail("vickyterrito@mailinator.com");
    // setMobileNo("9876787655");

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackButtonClick
    );

    return () => {
      backHandler.remove();
    };
  }, []);

  const handleBackButtonClick = () => {
    navigation.goBack();
    return true;
  };

  const validateFields = () => {
    if (!userName) {
      Toast("Please enter username");
    } else if (!password) {
      Toast("Please enter password");
    } else if (!email) {
      Toast("Please enter email");
    } else if (!mobileNo) {
      Toast("Please enter mobile number");
    } else {
      // Toast("created successfully");

      const req = {
        username: userName,
        password: password,
        mobile_no: mobileNo,
        email: email,
      };

      const modalReq = `username=${userName}&password=${password}&mobile_no=${mobileNo}&email=${email}`;

      // dispatch(createAccount(modalReq));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Header title={"CREATE ACCOUNT"} />

        <ScrollView
          behavior="padding"
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.splashContent}>
            <Image
              source={require("../../../Assests/images/hiffoDesk.png")}
              style={styles.hiffoLogo}
            />

            <Text style={styles.mediumText}>CREATE ACCOUNT</Text>
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
                onChangeText={setUserName}
                placeholder={"User name"}
                placeholderTextColor={colors.grey}
                value={userName}
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
                style={[styles.tIStyle, { marginTop: -15 }]}
                onChangeText={setPassword}
                placeholder={"Password"}
                placeholderTextColor={colors.grey}
                value={password}
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

            <View style={styles.passwordView}>
              <TextInput
                style={[styles.tIStyle, { marginTop: -15 }]}
                onChangeText={setMail}
                placeholder={"Email"}
                placeholderTextColor={colors.grey}
                value={email}
                keyboardType={"ascii-capable"}
                underlineColorAndroid={colors.transparent}
                selectionColor={colors.baseBackground}
                textContentType="password"
                autoCapitalize="none"
                autoCorrect={false}
                autoCompleteType="email"
              />
            </View>

            <View style={styles.passwordView}>
              <TextInput
                style={[styles.tIStyle, { marginTop: -15 }]}
                onChangeText={setMobileNo}
                placeholder={"Mobile number"}
                placeholderTextColor={colors.grey}
                value={mobileNo}
                keyboardType={"decimal-pad"}
                underlineColorAndroid={colors.transparent}
                selectionColor={colors.baseBackground}
                textContentType="password"
                autoCapitalize="none"
                autoCorrect={false}
                autoCompleteType="email"
              />
            </View>
          </View>

          <View style={styles.bottomContent}>
            <TouchableOpacity onPress={validateFields}>
              <LinearGradient
                colors={[colors.buttonGreen, colors.activeGreen]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.logInButton}
              >
                <Text style={styles.logInText}>CREATE ACCOUNT</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tIStyle: {
    backgroundColor: colors.inputGrey,
    flex: 1,
    borderColor: colors.grey,
    color: colors.black,
    padding: 10,
    paddingVertical: 12,
    borderRadius: 5,
    fontFamily: textFontFaceLight,
    textAlign: "center",
  },
  splashContent: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    marginTop: 20,
    width: "70%",
    alignSelf: "center",
  },
  hiffoLogo: {
    height: Dheight * 0.2,
    width: Dwidth * 0.8,
    resizeMode: "contain",
    borderColor: colors.black,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.white,
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
  subText: {
    textAlign: "center",
    fontFamily: textFontFaceMedium,
    marginVertical: 10,
    color: colors.black,
  },
  authContent: {
    marginHorizontal: 25,
    marginVertical: 20,
    width: "60%",
    alignSelf: "center",
  },
  emailView: {
    marginVertical: 20,
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
  bottomContent: {
    width: "73%",
    alignSelf: "center",
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
  forgotText: {
    alignSelf: "center",
    color: colors.logoBlue,
    marginVertical: 25,
  },
  mediumText: {
    color: colors.black,
    fontFamily: textFontFaceSemiBold,
    color: colors.black,
    fontSize: 20,
    alignSelf: "center",
  },

  linkText: {
    textDecorationLine: "underline",
  },
  termsText: {
    fontFamily: textFontFaceLight,
    fontSize: 12,
    marginHorizontal: 20,
    textAlign: "center",
  },
  signUpText: {
    fontFamily: textFontFaceMedium,
    fontSize: 15,
    marginTop: 18,
    color: colors.logoBlue,
  },
});

export default SignUp;
