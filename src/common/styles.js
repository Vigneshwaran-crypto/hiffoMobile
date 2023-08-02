import { StyleSheet } from "react-native";
import { colors, TextColors } from "./colors";

export const stylesCommon = StyleSheet.create({
  actionBarBase: {
    padding: 10,
    backgroundColor: colors.baseBackground,
    flexDirection: "row",
  },
  actionBarText: {
    fontFamily: textFontFaceSemiBold,
    fontSize: 18,
    color: colors.white,
    marginHorizontal: 10,
  },
  actionBarTextCenter: {
    fontFamily: textFontFaceSemiBold,
    fontSize: 18,
    color: colors.white,
    alignSelf: "center",
  },
  alertText: {
    marginRight: 3,
  },
});

export const textInputTheme = {
  colors: {
    primary: TextColors.blueTextInput,
    underlineColor: colors.transparent,
  },
};
export const textInputThemeError = {
  colors: {
    primary: colors.secondaryAccent,
    underlineColor: colors.transparent,
  },
};

export const buttonTheme = {
  colors: { primary: colors.baseBackground, text: colors.white },
};

export const checkBoxTheme = {
  colors: { primary: colors.baseBackground, accent: colors.white },
};
export const checkBoxThemeRemember = {
  colors: { primary: colors.grey, accent: colors.baseBackground },
};

export const textFontFace = "Poppins-Regular"; //Regular
export const textFontFaceMedium = "Poppins-Medium";
export const textFontFaceSemiBold = "Poppins-SemiBold";
export const textFontFaceLight = "Poppins-Light";

export const fontsSize = {
  size10: 10,
  size11: 11,
  size12: 12,
  size13: 13,
  size14: 14,
  size15: 15,
  size16: 16,
  size17: 17,
  size18: 18,
  size19: 19,
  size20: 20,
  size22: 22,
  logoText: 35,
};
