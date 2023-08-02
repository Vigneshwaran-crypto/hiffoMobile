import React from "react";
import {
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { colors } from "../../common/colors";
import {
  fontsSize,
  textFontFace,
  textFontFaceLight,
  textFontFaceMedium,
  textFontFaceSemiBold,
} from "../../common/styles";
import { LOG } from "../../common/util";

const AlertIos = (props) => {
  const onAlertClose = () => {
    if (props.closeAlert) {
      props.closeAlert();
    }
  };

  const onOkPress = () => {
    if (props.okPress) {
      props.okPress();
    }
  };

  return (
    <Modal animationType={"fade"} transparent={true} visible={props.visible}>
      <SafeAreaView></SafeAreaView>
      <TouchableOpacity onPress={onAlertClose} style={styles.container}>
        <TouchableWithoutFeedback>
          <View style={styles.AlertBase}>
            <Text style={styles.titleText}>{props.title}</Text>

            <Text style={styles.descriptionText}>{props.message}</Text>

            <TouchableOpacity onPress={onOkPress} style={styles.buttonView}>
              <Text style={styles.buttonText}>Ok</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onAlertClose} style={styles.buttonView}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
      <SafeAreaView></SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.transparentLightGrey,
    alignItems: "center",
    justifyContent: "center",
  },
  safeAreaView: {
    backgroundColor: colors.baseBackground,
  },
  AlertBase: {
    backgroundColor: colors.white,
    width: "75%",
    paddingTop: 25,
    borderRadius: 20,
    overflow: "hidden",
  },
  titleText: {
    fontFamily: textFontFaceSemiBold,
    fontSize: fontsSize.size19,
    color: colors.black29,
    paddingHorizontal: 50,
    marginHorizontal: 15,
    textAlign: "center",
  },
  descriptionText: {
    fontFamily: textFontFace,
    fontSize: fontsSize.size16,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    textAlign: "center",
    marginTop: 5,
    paddingBottom: 20,
    borderColor: colors.black,
  },
  buttonView: {
    borderTopWidth: 1,
    borderColor: colors.lightgrey,
    padding: 10,
    alignItems: "center",
    backgroundColor: colors.transparent,
  },
  buttonText: {
    fontFamily: textFontFace,
    fontSize: fontsSize.size19,
    color: colors.buttonBlue,
  },
  cancelText: {
    fontFamily: textFontFaceSemiBold,
    fontSize: fontsSize.size19,
    color: colors.buttonBlue,
  },
});

export default AlertIos;
