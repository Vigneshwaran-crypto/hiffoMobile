import AnimatedLottieView from "lottie-react-native";
import React from "react";
import { Image, Modal, StyleSheet, View } from "react-native";
import { colors } from "../../common/colors";

const Loading = (props) => {
  return (
    <View>
      <Modal transparent={true} animationType={"fade"} visible={props.visible}>
        <View
          style={[
            styles.container,
            {
              backgroundColor: props.tint
                ? colors.transparentGrey
                : colors.transparent,
            },
          ]}
        >
          <View style={styles.wrapperView}>
            <Image
              source={require("../../Assests/appicon.png")}
              style={styles.imageView}
            />

            <AnimatedLottieView
              speed={1}
              style={styles.animationView}
              source={require("../../../Assests/proloadertext.json")}
              loop
              autoPlay
              resizeMode={"cover"}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "center",
  },
  wrapperView: {
    backgroundColor: colors.white,
    margin: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    elevation: 5,
  },
  imageView: {
    marginTop: 60,
  },
  animationView: { width: 200, height: 200 },
});

export default Loading;
