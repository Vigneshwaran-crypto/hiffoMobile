/**
 * FileViewModal is common modal for text image and video
 *
 * Props you cannot avoid :
 *
 * type - 1 for text, 2 for image, 3 for video
 * visible - modal visibility
 *
 * filePath - url of the image or video
 * fileName - for filename used in image caching
 * key - for key used in image caching
 * autoHeight - for autoHeight used in image caching
 * coverImage - for coverImage used in image caching
 * profileImage - for profileImage used in image caching
 * description - for Text Only
 * closeModal - Callback for closing modal
 *
 *
 */
import React from "react";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native";
import { View, Text, Modal, StyleSheet, Dimensions } from "react-native";
import { colors } from "../../common/colors";
import { fontsSize, textFontFace } from "../../common/styles";
import ImageRN from "../Image/ImageRN";
import Feather from "react-native-vector-icons/Feather";
import { LOG } from "../../common/util";
import { ReactNativeZoomableView } from "@openspacelabs/react-native-zoomable-view";

const win = Dimensions.get("window");

const FileViewModal = (props) => {
  // LOG("File Props : ", props);
  const closeModal = () => {
    if (props.closeModal) {
      props.closeModal();
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={props.visible}>
      <SafeAreaView style={styles.safeArea} />
      <View style={styles.base}>
        <View style={styles.closeView}>
          <TouchableOpacity onPress={closeModal}>
            <Feather name="x-circle" size={25} color={colors.white} />
          </TouchableOpacity>
        </View>
        {props.type == 1 && (
          <Text style={styles.textStyle}>{props.description}</Text>
        )}

        {props.type == 2 && (
          <ReactNativeZoomableView
            maxZoom={2}
            minZoom={1}
            zoomStep={0.5}
            initialZoom={1}
            bindToBorders={true}
            doubleTapZoomToCenter={true}
          >
            <ImageRN
              source={props.filePath}
              fileName={props.fileName}
              profileImage={props.profileImage}
              coverImage={props.coverImage}
              autoHeight={props.autoHeight}
              width={win.width}
              style={styles.image}
              key={props.key}
            />
          </ReactNativeZoomableView>
        )}
      </View>
      <SafeAreaView style={styles.safeArea} />
    </Modal>
  );
};

const styles = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: colors.transparentGrey,
    justifyContent: "center",
  },
  videoStyle: {
    alignSelf: "center",
    width: win.width,
    borderRadius: 0,
  },
  pauseButtonStyle: {
    alignSelf: "center",
    zIndex: 100,
    padding: 10,
    borderRadius: 10,
  },
  image: {
    borderRadius: 10,
    alignSelf: "center",
  },
  safeArea: {
    backgroundColor: colors.baseBackground,
  },
  textStyle: {
    fontFamily: textFontFace,
    fontSize: fontsSize.size15,
    color: colors.white,
  },
  closeView: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 100,
  },
});

export default FileViewModal;
