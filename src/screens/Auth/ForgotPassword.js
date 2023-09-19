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

const Dheight = Dimensions.get("window").height;
const Dwidth = Dimensions.get("window").width;

const ForgotPassword = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const userTheme = useSelector(({ api }) => api.getTheme);
  const customSpinner = useSelector(({ api }) => api.customSpinner);
  const [number, setNumber] = useState("");

  const title = props.route.params.title;

  const forgotOnPress = () => {
    if (!number) {
      Toast("Please enter your number");
    } else {
      navigation.navigate("verifyOtp", { title: title });
    }
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
    LOG("props value in FP :", props);
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
    <View style={styles.container}>
      <View style={styles.wholeView}>
        <Header title={title} />

        <View style={styles.forgotView}>
          <View style={styles.splashContent}>
            <Image
              source={require("../../../Assests/images/hiffo.png")}
              style={styles.hiffoLogo}
            />
            <Text style={styles.headingText}>
              We will send an OTP to your number to verify your account
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
              placeholder="Enter mobile number"
              placeholderTextColor={colors.black}
              color={colors.black}
              onChangeText={setNumber}
              value={number}
              keyboardType={"decimal-pad"}
            />
          </View>

          <TouchableOpacity style={styles.buttonView} onPress={forgotOnPress}>
            <LinearGradient
              colors={[colors.lightGreen, colors.activeGreen]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradientButton}
            >
              <Text style={styles.buttonText}>SEND</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loaderStyle: {
    alignSelf: "center",
  },

  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  wholeView: {
    flex: 1,
    marginHorizontal: 20,
  },
  forgotView: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 20,
    marginBottom: 100,
    width: "75%",
    alignSelf: "center",
  },
  fieldView: {
    marginVertical: 5,
    width: "75%",
    alignSelf: "center",
  },
  formText: {
    color: colors.tanGrey,
    marginVertical: 10,
    fontSize: 18,
  },
  textInputs: {
    fontFamily: textFontFaceLight,
    fontSize: fontsSize.smallText,
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
    color: colors.grey,
    backgroundColor: colors.inputGrey,
    // textAlign: "center",
  },
  gradientButton: {
    justifyContent: "center",
    alignItems: "center",
    width: "40%",
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
    fontFamily: textFontFaceLight,
    fontSize: 15,
    textAlign: "justify",
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
  hiffoLogo: {
    height: Dheight * 0.27,
    width: Dwidth * 0.8,
    resizeMode: "contain",
    marginVertical: 10,
  },
});

export default ForgotPassword;
