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
import { authenticationVerify } from "../../redux/Auth-Action";
import { initSpinner } from "../../redux/Api-Action";

const Dheight = Dimensions.get("window").height;
const Dwidth = Dimensions.get("window").width;

const LogIn = (props) => {
  const navigation = useNavigation();
  const userTheme = useSelector(({ api }) => api.getTheme);
  const customSpinner = useSelector(({ api }) => api.customSpinner);
  const route = useRoute();
  const dispatch = useDispatch();

  const [email, setMail] = useState("");
  const [password, setPassword] = useState("");

  const validateFields = () => {
    if (!email && !password) {
      Toast("Please enter valid email and password");
    } else if (!email) {
      Toast("Please enter your email");
    } else if (!password) {
      Toast("Please enter your password");
    } else {
      var isValidEmail = validateEmailAndPhone(email, "email");

      if (isValidEmail) {
        var encryptedPass = CryptoJS.MD5(password).toString();
        LOG("ENCRYPTED PASSWORD :", encryptedPass);
        var loginRequestData = {
          email: email,
          password: encryptedPass,
        };
        dispatch(initSpinner());
        dispatch(authenticationVerify(loginRequestData));
      } else {
        Toast("Please enter valid email");
      }
    }
  };

  const forgotPasswordClick = () => {
    navigation.navigate("forgotPassword");
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackButtonClick
    );

    return () => {
      backHandler.remove();
    };
  }, []);

  const handleBackButtonClick = () => {
    backPressHandler(route.name, false);
    return true;
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View
        style={[
          styles.container,
          { backgroundColor: userTheme ? colors.black : colors.white },
        ]}
      >
        <ScrollView
          behavior="padding"
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.splashContent}>
            <Image
              source={require("../../../Assests/images/formConLogo.png")}
              style={styles.splashEightOne}
            />

            <Text style={styles.mediumText}>WELCOME TO</Text>
            <Text
              style={[
                styles.headingText,
                {
                  color: userTheme ? colors.white : colors.black,
                  marginVertical: -5,
                },
              ]}
            >
              FARM SHOP CONNECT
            </Text>
            <Text
              style={[
                styles.subText,
                { color: userTheme ? colors.white : colors.black },
              ]}
            >
              Login
            </Text>
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
              {/* <Text style={styles.authText}>Your email</Text> */}
              {/* <TextInput
              onChangeText={setMail}
              placeholder={"Enter email"}
              style={styles.textInputAuth}
              placeholderTextColor={userTheme ? colors.greyC4 : colors.black}
              color={userTheme ? colors.white : colors.black}
              value={email}
            /> */}

              <TextInput
                style={styles.tIStyle(userTheme)}
                onChangeText={setMail}
                placeholder={"Enter Email"}
                placeholderTextColor={userTheme ? colors.greyC4 : colors.grey}
                // color={userTheme ? colors.white : colors.black}
                value={email}
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
                style={[styles.tIStyle(userTheme), { marginTop: -15 }]}
                onChangeText={setPassword}
                placeholder={"Password"}
                placeholderTextColor={userTheme ? colors.greyC4 : colors.grey}
                // color={userTheme ? colors.white : colors.black}
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
          </View>

          <View style={styles.bottomContent}>
            <TouchableOpacity onPress={validateFields}>
              <LinearGradient
                colors={[colors.buttonGreen, colors.lightGreen]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.logInButton}
              >
                <Text style={styles.logInText}>LOGIN</Text>
              </LinearGradient>
            </TouchableOpacity>

            <Text
              style={[
                styles.subText,
                {
                  color: userTheme ? colors.white : colors.grey,
                  fontSize: 13,
                  marginVertical: 15,
                },
              ]}
            >
              By signing in you agree to Commons'{" "}
              <Text style={styles.linkText}>Terms & Conditions</Text> and{" "}
              <Text style={styles.linkText}>Privacy Policy</Text>
            </Text>

            <TouchableOpacity activeOpacity={1} onPress={forgotPasswordClick}>
              <Text style={[styles.mediumText, { fontSize: 15 }]}>
                Forgot Password
              </Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={1} onPress={forgotPasswordClick}>
              <Text
                style={[
                  styles.mediumText,
                  {
                    fontSize: 15,
                    marginTop: 40,
                    fontFamily: textFontFaceLight,
                  },
                ]}
              >
                Verify an account?
              </Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={1} onPress={forgotPasswordClick}>
              <Text style={[styles.mediumText, { fontSize: 15, marginTop: 5 }]}>
                First Time User
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  tIStyle: (userTheme) => ({
    backgroundColor: userTheme ? colors.black : colors.inputGrey,
    // height: 40,
    flex: 1,
    borderColor: userTheme ? colors.white : colors.grey,
    color: userTheme ? colors.white : colors.black,
    padding: 10,
    paddingVertical: 12,
    borderRadius: 5,
    fontFamily: textFontFaceLight,
    // borderWidth: 1,
  }),
  splashContent: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    marginTop: 50,
  },
  splashEightOne: {
    height: Dheight * 0.22,
    width: Dwidth * 0.4,
    resizeMode: "contain",
    // borderWidth: 1,
    // borderColor: colors.black,
  },
  container: {
    flex: 1,
    justifyContent: "center",
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
    fontFamily: textFontFaceSemiBold,
    color: colors.black,
    fontSize: 28,
  },
  subText: {
    textAlign: "center",
    fontFamily: textFontFaceLight,
    marginVertical: 10,
  },
  authContent: {
    marginHorizontal: 25,
    marginVertical: 20,
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
  bottomContent: {
    // marginVertical: 10,
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
    color: colors.textGreen,
    marginVertical: 20,
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
});

export default LogIn;
