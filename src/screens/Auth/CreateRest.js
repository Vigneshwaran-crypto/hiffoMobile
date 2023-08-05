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
import Header from "../../common/Header";

const Dheight = Dimensions.get("window").height;
const Dwidth = Dimensions.get("window").width;

const CreateRest = (props) => {
  const navigation = useNavigation();
  const userTheme = useSelector(({ api }) => api.getTheme);
  const customSpinner = useSelector(({ api }) => api.customSpinner);
  const route = useRoute();
  const dispatch = useDispatch();

  const [resName, setRestName] = useState("");
  const [email, setMail] = useState("");
  const [totalSeat, setTotalSeat] = useState("");
  const [address, setAddress] = useState("");

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
    navigation.goBack();
    return true;
  };

  const validateFields = () => {
    navigation.navigate("createManagement");

    if (!resName) {
      Toast("Please enter restaurant");
    } else if (!email) {
      Toast("Please enter email");
    } else if (!totalSeat) {
      Toast("Please enter total seat");
    } else if (!address) {
      Toast("Please enter address");
    } else {
      Toast("created successfully");
      //   navigation.navigate("createManagement");
    }
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
        <Header title={"CREATE RESTAURANT"} />

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

            <Text style={styles.mediumText}>Create Restaurant </Text>

            <Text style={styles.subText}>
              Create your Restaurant here manage it with stress free
            </Text>
          </View>

          <View style={styles.authContent}>
            <View style={styles.emailView}>
              <TextInput
                style={styles.tIStyle(userTheme)}
                onChangeText={setRestName}
                placeholder={"Restaurant name"}
                placeholderTextColor={userTheme ? colors.greyC4 : colors.grey}
                value={resName}
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
                onChangeText={setMail}
                placeholder={"Email"}
                placeholderTextColor={userTheme ? colors.greyC4 : colors.grey}
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
                style={[styles.tIStyle(userTheme), { marginTop: -15 }]}
                onChangeText={setTotalSeat}
                placeholder={"Total seat"}
                placeholderTextColor={userTheme ? colors.greyC4 : colors.grey}
                value={totalSeat}
                keyboardType={"number-pad"}
                underlineColorAndroid={colors.transparent}
                selectionColor={colors.baseBackground}
                autoCapitalize="none"
                autoCorrect={false}
                autoCompleteType="email"
              />
            </View>

            <View style={styles.passwordView}>
              <TextInput
                style={[styles.tIStyle(userTheme), { marginTop: -15 }]}
                onChangeText={setAddress}
                placeholder={"Address"}
                placeholderTextColor={userTheme ? colors.greyC4 : colors.grey}
                value={address}
                keyboardType={"default"}
                multiline={true}
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
                <Text style={styles.logInText}>CREATE</Text>
              </LinearGradient>
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
    flex: 1,
    borderColor: userTheme ? colors.white : colors.grey,
    color: userTheme ? colors.white : colors.black,
    padding: 10,
    paddingVertical: 12,
    borderRadius: 5,
    fontFamily: textFontFaceLight,
  }),
  splashContent: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  hiffoLogo: {
    height: Dheight * 0.18,
    width: Dwidth * 0.8,
    resizeMode: "contain",
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },

  authContent: {
    marginHorizontal: 25,
    marginVertical: 20,
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
  subText: {
    fontFamily: textFontFaceLight,
    color: colors.logoBlue,
    textAlign: "center",
    fontSize: 13,
  },
});

export default CreateRest;
