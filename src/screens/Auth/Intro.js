import React from "react";
import { Dimensions, Image, TouchableOpacity } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../common/colors";
import { textFontFaceLight, textFontFaceMedium } from "../../common/styles";
import Feather from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const Dheight = Dimensions.get("window").height;
const Dwidth = Dimensions.get("window").width;
const Intro = () => {
  const navigation = useNavigation();

  const userTheme = useSelector(({ api }) => api.getTheme);

  const skipOnPress = () => {
    navigation.navigate("login");
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: userTheme ? colors.black : colors.transparent,
      }}
    >
      <View style={styles.miniBallView}>
        <View
          style={[
            styles.greenBall,
            { alignSelf: "baseline", height: 12, width: 12 },
          ]}
        />
        <View
          style={[
            styles.greenBall,
            {
              height: 10,
              width: 10,
              marginHorizontal: 60,
            },
          ]}
        />

        <View
          style={[
            styles.greenBall,
            { alignSelf: "flex-end", height: 20, width: 20, marginTop: 50 },
          ]}
        />

        <View
          style={[
            styles.greenBall,
            { alignSelf: "flex-start", height: 5, width: 5, marginTop: 20 },
          ]}
        />

        <View
          style={[
            styles.greenBall,
            {
              alignSelf: "flex-end",
              height: 10,
              width: 10,
              position: "absolute",
            },
          ]}
        />

        <View
          style={[
            styles.greenBall,
            {
              height: 10,
              width: 10,
              position: "absolute",
              alignSelf: "center",
              marginTop: 50,
            },
          ]}
        />

        <View
          style={[
            styles.greenBall,
            {
              height: 10,
              width: 10,
              position: "absolute",
              zIndex: 5,
              marginTop: 150,
              marginHorizontal: 30,
            },
          ]}
        />
      </View>

      <View style={styles.mainImageView}>
        <Image
          source={require("../../../Assests/images/dadAndSon.png")}
          style={styles.mainImage}
        />
      </View>

      <View style={styles.contentTextView}>
        <Text style={[styles.analyzingText, { marginHorizontal: 0 }]}>
          analyzing farming
        </Text>
        <Text
          style={[
            styles.nowText,
            { color: userTheme ? colors.white : colors.black },
          ]}
        >
          Now, auditing
        </Text>
        <Text style={[styles.analyzingText, { fontSize: 30 }]}>
          analyzing farming
        </Text>
        <Text
          style={[
            styles.manageText,
            { color: userTheme ? colors.white : colors.black },
          ]}
        >
          management is simple.✌
        </Text>

        <Image
          source={require("../../../Assests/images/endBar.png")}
          style={{ marginHorizontal: 30 }}
        />
      </View>

      <Text
        style={[
          styles.skipText,
          { color: userTheme ? colors.white : colors.black },
        ]}
      >
        Skip
      </Text>
      <View style={styles.bottomView}>
        <Image
          source={require("../../../Assests/images/bottomNext.png")}
          style={styles.bottomNext}
        />
        <TouchableOpacity style={styles.skipButton} onPress={skipOnPress}>
          <Feather name="arrow-right" color={colors.white} size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  miniBallView: {
    // borderWidth: 1,
    marginHorizontal: 20,
    marginTop: 30,
  },
  greenBall: {
    borderRadius: 50,
    backgroundColor: colors.buttonGreen,
  },
  mainImageView: {
    justifyContent: "center",
    alignItems: "center",
  },
  mainImage: {
    height: Dheight * 0.4,
    width: Dwidth * 0.8,
    borderRadius: 250,
  },
  contentTextView: {
    marginHorizontal: 30,
    marginTop: 20,
  },
  analyzingText: {
    color: colors.lightGreen,
    fontFamily: textFontFaceMedium,
    fontSize: 18,
  },
  nowText: {
    fontFamily: textFontFaceMedium,
    fontSize: 30,
    color: colors.black,
    alignSelf: "flex-start",
  },
  manageText: {
    fontFamily: textFontFaceMedium,
    fontSize: 30,
    color: colors.black,
  },
  skipText: {
    fontFamily: textFontFaceMedium,
    marginHorizontal: 30,
    marginVertical: 25,
    color: colors.black,
    fontSize: 19,
  },
  bottomView: {
    bottom: 0,
    alignSelf: "flex-end",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    height: Dheight * 0.2,
    width: Dwidth * 0.2,
    position: "absolute",
  },
  bottomNext: {
    position: "absolute",
    height: Dheight * 0.18,
    width: Dwidth * 0.23,
  },
  skipButton: {
    alignSelf: "center",
    marginVertical: 12,
    padding: 8,
  },
});

export default Intro;
