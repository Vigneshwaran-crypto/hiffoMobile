import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
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
import { sendOtpAction, verifyOtpAction } from "../../redux/Auth-Action";

const win = Dimensions.get("window");

const VerifyOtp = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userTheme = useSelector(({ api }) => api.getTheme);
  const customSpinner = useSelector(({ api }) => api.customSpinner);
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");

  const title = props.route.params.title;
  const number = props.route.params.number;

  const [pin1, setPin1] = useState(null);
  const [pin2, setPin2] = useState(null);
  const [pin3, setPin3] = useState(null);
  const [pin4, setPin4] = useState(null);
  const [pin5, setPin5] = useState(null);
  const [pin6, setPin6] = useState(null);

  const pin1Ref = useRef(null);
  const pin2Ref = useRef(null);
  const pin3Ref = useRef(null);
  const pin4Ref = useRef(null);
  const pin5Ref = useRef(null);
  const pin6Ref = useRef(null);

  const [time, setTime] = useState(60);
  const timerRef = useRef(time);

  useEffect(() => {
    LOG("props value in verify screen :", props);
  }, []);

  const verifyOnPress = () => {
    if (pin1 && pin2 && pin3 && pin4 && pin5 && pin6) {
      const validOtp = pin1 + pin2 + pin3 + pin4 + pin5 + pin6;
      LOG("valid Otp :", validOtp);

      const verifyOtpRequest = {
        otp: validOtp,
        mobile_no: number,
      };

      const extraData = { title, number };

      // http://hiffo.in/otpverifier?mobile_no=9585777939&otp=398019&hid=HID846719

      dispatch(initSpinner());
      dispatch(verifyOtpAction(verifyOtpRequest, extraData));
    } else {
      Toast("Please enter otp");
    }

    // if (title == "CREATE ACCOUNT") {
    //   // navigation.navigate("signUp", { title: title, number: number });
    //   navigation.navigate("createManagement");
    // } else {
    //   // navigation.navigate("resetPassword", { title: "VERIFY OTP" });
    // }
  };

  const resendOnPress = () => {
    const otpRequest = {
      mailId: email,
    };
    // dispatch(initSpinner());
    // dispatch(sendOtpAction(otpRequest));
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      timerRef.current -= 1;
      if (timerRef.current < 0) {
        clearInterval(timerId);
      } else {
        setTime(timerRef.current);
      }
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
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
    <View style={styles.container}>
      <View style={styles.wholeView}>
        <Header title={"VERIFY OTP"} />

        <View style={styles.forgotView}>
          <View style={styles.splashContent}>
            <Text style={styles.headingText}>ENTER OTP</Text>
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

            <View style={styles.runningTimingView}>
              <Text style={styles.runningTime}>{time} Sec</Text>

              <TouchableOpacity disabled={time != 0} onPress={resendOnPress}>
                <Text
                  style={[
                    styles.headingText,
                    {
                      color: userTheme ? colors.white : colors.black,
                      fontSize: 14,
                      textDecorationLine: "underline",
                    },
                  ]}
                >
                  RESEND
                </Text>
              </TouchableOpacity>
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
              placeholderTextColor={colors.grey}
              color={colors.black}
              ref={pin1Ref}
              maxLength={1}
              keyboardType={"decimal-pad"}
              onChangeText={(val) => {
                setPin1(val);
                if (val.length != 0) {
                  pin2Ref.current.focus();
                }
              }}
              value={pin1}
            />

            <TextInput
              style={styles.textInputs}
              placeholder="X"
              placeholderTextColor={colors.grey}
              color={colors.black}
              ref={pin2Ref}
              maxLength={1}
              keyboardType={"decimal-pad"}
              onChangeText={(val) => {
                setPin2(val);
                if (val.length != 0) {
                  pin3Ref.current.focus();
                }
              }}
              value={pin2}
            />

            <TextInput
              style={styles.textInputs}
              placeholder="X"
              placeholderTextColor={colors.grey}
              color={colors.black}
              ref={pin3Ref}
              maxLength={1}
              keyboardType={"decimal-pad"}
              onChangeText={(val) => {
                setPin3(val);
                if (val.length != 0) {
                  pin4Ref.current.focus();
                }
              }}
              value={pin3}
            />

            <TextInput
              style={styles.textInputs}
              placeholder="X"
              placeholderTextColor={colors.grey}
              color={colors.black}
              ref={pin4Ref}
              maxLength={1}
              keyboardType={"decimal-pad"}
              onChangeText={(val) => {
                setPin4(val);
                if (val.length != 0) {
                  pin5Ref.current.focus();
                }
              }}
              value={pin4}
            />

            <TextInput
              style={styles.textInputs}
              placeholder="X"
              placeholderTextColor={colors.grey}
              color={colors.black}
              ref={pin5Ref}
              maxLength={1}
              keyboardType={"decimal-pad"}
              onChangeText={(val) => {
                setPin5(val);
                if (val.length != 0) {
                  pin6Ref.current.focus();
                }
              }}
              value={pin5}
            />

            <TextInput
              style={styles.textInputs}
              placeholder="X"
              placeholderTextColor={colors.grey}
              color={colors.black}
              ref={pin6Ref}
              maxLength={1}
              keyboardType={"decimal-pad"}
              onChangeText={(val) => {
                setPin6(val);
                if (val.length != 0) {
                  pin6Ref.current.focus();
                }
              }}
              value={pin6}
            />
          </View>

          <TouchableOpacity style={styles.buttonView} onPress={verifyOnPress}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  wholeView: {
    flex: 1,
    marginHorizontal: 10,
  },
  forgotView: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 20,
    width: "60%",
    alignSelf: "center",
  },
  fieldView: {
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
    padding: 8,
    marginVertical: 10,
    color: colors.black,
    backgroundColor: colors.inputGrey,
    marginEnd: 15,
    textAlign: "center",
  },
  gradientButton: {
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
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
  runningTime: {
    color: colors.lightGreen,
    marginEnd: 8,
    fontFamily: textFontFaceMedium,
  },
  runningTimingView: {
    flexDirection: "row",
    alignSelf: "flex-start",
    alignItems: "center",
    marginVertical: 2,
  },
  loaderStyle: {
    position: "absolute",
    elevation: 10,
    zIndex: 10,
    top: 0,
    right: 0,
    left: 0,
    bottom: 150,
  },
});

export default VerifyOtp;
