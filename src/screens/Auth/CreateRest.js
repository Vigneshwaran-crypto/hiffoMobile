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
import {
  authenticationVerify,
  createRestaurant,
} from "../../redux/Auth-Action";
import { initSpinner } from "../../redux/Api-Action";
import Header from "../../common/Header";
import { HTTP } from "../../common/constants";

const Dheight = Dimensions.get("window").height;
const Dwidth = Dimensions.get("window").width;

const CreateRest = (props) => {
  const navigation = useNavigation();
  const userTheme = useSelector(({ api }) => api.getTheme);
  const customSpinner = useSelector(({ api }) => api.customSpinner);
  const route = useRoute();
  const dispatch = useDispatch();

  const [resName, setRestName] = useState("");
  const [stName, setStName] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [pinCode, setPinCode] = useState("");

  useEffect(() => {
    LOG("AUth Header In CreateRes :", HTTP.AuthHeader);

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
    // navigation.navigate("createManagement");

    // https://hiffo.in/createrestaurant?hid=HID238848&hotelname=PVR%20Mall&street_road_name=north%20street&area_city=chennai&district=chennai&state=tamilnadu&pincode=605759&token=q68395891B7L4279

    if (!resName) {
      Toast("Please enter restaurant name");
    } else if (!stName) {
      Toast("Please enter street name");
    } else if (!city) {
      Toast("Please enter your city");
    } else if (!district) {
      Toast("Please enter your district");
    } else if (!state) {
      Toast("Please enter your state");
    } else if (!pinCode) {
      Toast("Please enter your pincode");
    } else {
      // navigation.navigate("createManagement");
      Toast("Restaurant Created successfully");

      const req = {
        // hid: HID238848,
        hotelname: resName,
        street_road_name: stName,
        area_city: city,
        district: district,
        state: state,
        pincode: pinCode,
      };

      dispatch(createRestaurant(req));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
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
                style={styles.tIStyle}
                onChangeText={setRestName}
                placeholder={"Restaurant Name"}
                placeholderTextColor={colors.grey}
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
                style={styles.tIStyle}
                onChangeText={setStName}
                placeholder={"Street Name"}
                placeholderTextColor={colors.grey}
                value={stName}
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
                style={styles.tIStyle}
                onChangeText={setCity}
                placeholder={"City"}
                keyboardType={"default"}
                placeholderTextColor={colors.grey}
                value={city}
                underlineColorAndroid={colors.transparent}
                selectionColor={colors.baseBackground}
                autoCapitalize="none"
                autoCorrect={false}
                autoCompleteType="email"
              />
            </View>

            <View style={styles.passwordView}>
              <TextInput
                style={styles.tIStyle}
                onChangeText={setDistrict}
                placeholder={"District"}
                placeholderTextColor={colors.grey}
                value={district}
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

            <View style={styles.passwordView}>
              <TextInput
                style={styles.tIStyle}
                onChangeText={setState}
                placeholder={"State"}
                placeholderTextColor={colors.grey}
                value={state}
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

            <View style={styles.passwordView}>
              <TextInput
                style={styles.tIStyle}
                onChangeText={setPinCode}
                placeholder={"Pincode"}
                placeholderTextColor={colors.grey}
                value={pinCode}
                keyboardType={"number-pad"}
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
    marginTop: -10,
  },
  splashContent: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    width: "70%",
    alignSelf: "center",
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
    alignSelf: "center",
    width: "60%",
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
  subText: {
    fontFamily: textFontFaceLight,
    color: colors.logoBlue,
    textAlign: "center",
    fontSize: 13,
  },
});

export default CreateRest;
