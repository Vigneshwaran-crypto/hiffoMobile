import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { RNCamera } from "react-native-camera";
import AntIcon from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import { LOG } from "../../common/util";
import { colors } from "../../common/colors";

const win = Dimensions.get("window");

// Main Function
const CameraModal = (props) => {
  // RenderRow is to render the list item
  const [takingPic, setTakingPic] = useState(true);
  const [cameraPic, setCameraPic] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const cameraRef = useRef();
  const takePicture = async () => {
    setIsLoading(true);
    if (cameraRef.current) {
      let options = {
        quality: 0.85,
        fixOrientation: true,
        forceUpOrientation: true,
        fileName: true,
      };
      try {
        const data = await cameraRef.current.takePictureAsync(options);
        LOG(data);
        // Alert.alert("Success", JSON.stringify(data));
        setCameraPic(data);
        setTakingPic(false);
      } catch (err) {
        Alert.alert("Error", "Failed to take picture: " + (err.message || err));
        return;
      } finally {
        setIsLoading(false);
      }
    }
  };

  const closeCamera = () => {
    props.callBack(cameraPic);
    setTakingPic(true);
  };

  const closePreview = () => {
    setCameraPic(null);
    setTakingPic(true);
  };

  // Actual UI
  return (
    <Modal visible={props.visible}>
      <View style={[style.loader, { display: isLoading ? "flex" : "none" }]}>
        <ActivityIndicator
          color={colors.accent}
          size={"large"}
          animating={true}
          style={style.indicatorStyle}
        />
      </View>
      <View style={style.container}>
        {takingPic ? (
          <View style={{ flex: 1 }}>
            <View
              style={{
                flex: 0,
                flexDirection: "row",
                justifyContent: "flex-end",
                margin: 10,
                marginRight: 0,
              }}
            >
              <TouchableOpacity onPress={closeCamera}>
                <AntIcon
                  style={style.logoutStyle}
                  name={"close"}
                  size={30}
                  color={colors.white}
                />
              </TouchableOpacity>
            </View>

            <RNCamera
              style={{ flex: 1, alignItems: "center" }}
              ref={cameraRef}
              captureAudio={false}
            />
            <View
              style={{
                flex: 0,
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity onPress={takePicture} style={style.capture}>
                <Entypo
                  style={style.logoutStyle}
                  name={"camera"}
                  size={30}
                  color={colors.black}
                />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <Image
              style={style.coverPhoto}
              source={{
                uri: cameraPic.uri,
              }}
              resizeMode={"cover"}
            />
            <View
              style={{
                flex: 0,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity onPress={closePreview} style={style.capture}>
                <AntIcon
                  style={style.logoutStyle}
                  name={"close"}
                  size={20}
                  color={colors.red}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={closeCamera} style={style.capture}>
                <Feather
                  style={style.logoutStyle}
                  name={"check"}
                  size={20}
                  color={colors.green}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </Modal>
  );
};
// Styles used in this screen
const style = StyleSheet.create({
  logoutStyle: {
    justifyContent: "center",
    paddingHorizontal: 5,
  },

  coverPhoto: {
    width: "100%",
    height: "90%",
  },

  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black",
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  capture: {
    flex: 0,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    alignSelf: "center",
    margin: 20,
  },
  loader: {
    position: "absolute",
    zIndex: 100,
    backgroundColor: colors.transparent,
    width: win.width,
    height: win.height,
    alignSelf: "center",
    justifyContent: "center",
  },
  indicatorStyle: {
    backgroundColor: colors.white,
    alignSelf: "center",
    padding: 10,
    borderRadius: 10,
  },
});

// Default Export Which is connected with Redux Store.
export default CameraModal;
