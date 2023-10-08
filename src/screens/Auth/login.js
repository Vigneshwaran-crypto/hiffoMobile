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

const { fontScale } = Dimensions.get("window");

const LogIn = (props) => {
  const navigation = useNavigation();
  const userTheme = useSelector(({ api }) => api.getTheme);
  const customSpinner = useSelector(({ api }) => api.customSpinner);
  const route = useRoute();
  const dispatch = useDispatch();

  const [email, setMail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setMail("HID880589");
    setPassword("helto");
  }, []);

  const validateFields = () => {
    // navigation.navigate("createRest");

    if (!email && !password) {
      Toast("Please enter  hid and password");
    } else if (!email) {
      Toast("Please enter your hid");
    } else if (!password) {
      Toast("Please enter your password");
    } else {
      // http://hiffo.in/signin?hid=HID846719&password=qwerty

      const logInReq = {
        hid: email,
        password: password,
      };

      dispatch(initSpinner());
      dispatch(authenticationVerify(logInReq));
      // Toast("Login Successfully");
      // navigation.navigate("createRest");
    }
  };

  // We use forgot password component for Both uses
  const forgotPasswordClick = () => {
    navigation.navigate("forgotPassword", { title: "FORGOT PASSWORD" });
  };

  const signUpOnPress = () => {
    // navigation.navigate("signUp");
    navigation.navigate("forgotPassword", { title: "CREATE ACCOUNT" });
  };

  useEffect(() => {
    // setMail("Vickytata619@gmail.com");
    // setPassword("123456");

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
    <View style={styles.parentContainer}>
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

            <Text style={styles.mediumText}>WELCOME TO HIFFO DESK</Text>
            <Text style={styles.headingText}>
              Let the peace meet the plates
            </Text>
            <Text style={styles.subText}>Login</Text>
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
                onChangeText={setMail}
                placeholder={"Enter HID"}
                placeholderTextColor={colors.grey}
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
                style={styles.tIStyle}
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
          </View>

          <View style={styles.bottomContent}>
            <TouchableOpacity onPress={validateFields}>
              <LinearGradient
                colors={[colors.buttonGreen, colors.activeGreen]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.logInButton}
              >
                <Text style={styles.logInText}>LOGIN</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={1} onPress={forgotPasswordClick}>
              <Text style={styles.forgotText}>Forgot Password</Text>
            </TouchableOpacity>

            <View style={styles.bottomTextsView}>
              <Text style={styles.termsText}>
                By signing in you agree to Commons{" "}
                <Text style={styles.linkText}>Terms & Conditions</Text> and{" "}
                <Text style={styles.linkText}>Privacy Policy</Text>
              </Text>

              <TouchableOpacity onPress={signUpOnPress}>
                <Text style={styles.signUpText}>First Time User ?</Text>
              </TouchableOpacity>
            </View>
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
    // textAlign: "center",
    paddingStart: 10,
  },
  splashContent: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    marginTop: 50,
  },
  hiffoLogo: {
    height: Dheight * 0.25,
    width: Dwidth * 0.6,
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
  subText: {
    textAlign: "center",
    fontFamily: textFontFaceMedium,
    marginVertical: 10,
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
  bottomContent: {},
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
  bottomTextsView: {
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
});

export default LogIn;
