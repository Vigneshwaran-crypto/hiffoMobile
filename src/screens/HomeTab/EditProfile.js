import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  BackHandler,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { View } from "react-native";
import { colors } from "../../common/colors";
import {
  fontsSize,
  textFontFace,
  textFontFaceLight,
  textFontFaceMedium,
} from "../../common/styles";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "react-native";
import ImageCropPicker from "react-native-image-crop-picker";
import {
  CustomAlert,
  getItem,
  LOG,
  removeItem,
  storeItem,
  Toast,
  validateEmailAndPhone,
} from "../../common/util";

import { editProfile, initSpinner } from "../../redux/Api-Action";
import { profilePhotoUpload } from "../../redux/Auth-Action";
import { ServerUrl } from "../../common/constants";
import RBSheet from "react-native-raw-bottom-sheet";
const win = Dimensions.get("window");

const EditProfile = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const RBref = useRef();

  const userTheme = useSelector(({ api }) => api.getTheme);
  const profileData = useSelector(({ api }) => api.getProfileData);
  const userDetails = useSelector(({ auth }) => auth.loginResponse);
  const profilephoto = useSelector(({ auth }) => auth.profilephoto);
  const customSpinner = useSelector(({ api }) => api.customSpinner);

  const userId = props.route.params.uId;

  const [showModel, setShowModel] = useState(false);
  const [imageUri, setImageUri] = useState("");

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [userName, setUserName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [farmName, setFarmName] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (userDetails) {
      setName(userDetails.firstName);
      setEmail(userDetails.mailID);
      setUserName(userDetails.lastName);
      setImageUri(userDetails.profilephoto);
      if (userDetails.phonenumber != "") {
        setPhoneNumber(userDetails.phonenumber);
      }
      if (userDetails.farmName != "") {
        setFarmName(userDetails.farmName);
      }
      if (userDetails.address != "") {
        setAddress(userDetails.address);
      }
    }
  }, [userDetails]);

  useEffect(() => {
    LOG("USER DETAILS IN EDITPROFILE :", userDetails);
    LOG("GET PROFILE DATA IN EDIT PROFILE:", profileData);
    LOG("UID TEXT IN EP", userId);
  }, []);

  const backArrowPress = () => {
    navigation.goBack();
  };

  const saveOnPress = () => {
    if (!name) {
      Toast("Please enter your name");
    } else if (!email) {
      Toast("Please enter email");
    } else if (!userName) {
      Toast("Please enter userName");
    } else if (!farmName) {
      Toast("Please enter Farmname");
    } else if (!address) {
      Toast("Please enter address");
    } else if (!phoneNumber) {
      Toast("Please enter Phonenumber");
    } else {
      const isEmail = validateEmailAndPhone(email, "email");
      if (isEmail) {
        dispatch(initSpinner());
        const editRequestData = {
          email: email,
          firstName: name,
          id: userId,
          lastName: userName,
          phoneNo: phoneNumber,
          profileImage: imageUri,
          farmName: farmName,
          address: address,
        };

        dispatch(editProfile(editRequestData));
      } else {
        Toast("Enter valid email");
      }
    }
  };

  const editOnPress = () => {
    RBref.current.open()
  };

  const cameraOnPress = () => {
    ImageCropPicker.openCamera({
      height: 400,
      width: 400,
      cropping: true,
    }).then((result) => {
      LOG("Image Response ", result);
      setImageUri(result.path);

      let profileImageData = {};

      profileImageData = Object.assign({}, profileImageData, {
        uri: result.path,
        name: result.mime,
        type: "image/jpeg",
      });

      const imageJsonValue = new FormData();

      imageJsonValue.append("profilePhoto", profileImageData);
      imageJsonValue.append("userId", userDetails.uId);

      dispatch(profilePhotoUpload(imageJsonValue));
    });
    setShowModel(!showModel);
  };

  const galleryOnPress = () => {
    ImageCropPicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
      cropperCircleOverlay: true,
      showCropFrame: false,
      showCropGuidelines: false,
    }).then((result) => {
      LOG("Image Response ", result);
      setImageUri(result.path);

      let profileImageData = {};

      profileImageData = Object.assign({}, profileImageData, {
        uri: result.path,
        name: result.mime,
        type: "image/jpeg",
      });

      const imageJsonValue = new FormData();

      imageJsonValue.append("profilePhoto", profileImageData);
      imageJsonValue.append("userId", userDetails.uId);

      dispatch(profilePhotoUpload(imageJsonValue));
    });
    setShowModel(!showModel);
  };

  const profileDeleteOnPress = () => {
    const okClick = () => {
      // dispatch(
      //   editProfile({
      //     imagePath: null,
      //   })
      // );
      removeItem("profileImage");
    };
    const alert = {
      heading: null,
      title: "Remove profile photo ?",
      okText: "Remove",
      cancelText: "cancel",
    };

    CustomAlert(alert, okClick);
  };

  useEffect(() => {
    const backHandle = BackHandler.addEventListener(
      "hardwareBackPress",
      hardwareBackTriggered
    );

    return () => {
      backHandle.remove();
    };
  }, []);

  const hardwareBackTriggered = () => {
    navigation.goBack();
    return true;
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
      <ScrollView>
        <View style={styles.headerContent}>
          <View style={{ alignSelf: "flex-start" }}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={backArrowPress}
            >
              <Feather
                name="chevron-left"
                size={35}
                color={userTheme ? colors.white : colors.black}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
            }}
          >
            <Text
              style={[
                styles.profileText,
                { color: userTheme ? colors.white : colors.black },
              ]}
            >
              Edit Profile
            </Text>
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={saveOnPress}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.profileContent}>
          <View style={styles.imageContainer}>
            <Image
              source={
                profilephoto
                  ? { uri: ServerUrl + "auth/image/" + profilephoto }
                  : require("../../../Assests/images/Prolile.png")
              }
              style={styles.profileImage}
            />

            <TouchableOpacity style={styles.cameraButton} onPress={editOnPress}>
              <Feather name="camera" size={20} color={colors.white} />
            </TouchableOpacity>
          </View>
        </View>

        {customSpinner ? (
          <View style={styles.loaderView}>
            <ActivityIndicator
              size={"large"}
              color={colors.buttonGreen}
              animating={customSpinner}
              style={styles.loaderStyle}
            />
          </View>
        ) : null}

        <View style={styles.formContainer}>
          <View style={styles.fieldView}>
            <Text
              style={[
                styles.formText,
                { color: userTheme ? colors.white : colors.black },
              ]}
            >
              Name
            </Text>
            <TextInput
              style={styles.textInputs}
              placeholder="Enter your name"
              placeholderTextColor={userTheme ? colors.greyC4 : colors.black}
              color={userTheme ? colors.white : colors.black}
              onChangeText={setName}
              value={name}
            />
          </View>

          <View style={styles.fieldView}>
            <Text
              style={[
                styles.formText,
                { color: userTheme ? colors.white : colors.black },
              ]}
            >
              Email
            </Text>
            <TextInput
              style={styles.textInputs}
              placeholder="Enter your email"
              placeholderTextColor={userTheme ? colors.greyC4 : colors.black}
              color={userTheme ? colors.white : colors.black}
              onChangeText={setEmail}
              value={email}
            />
          </View>

          <View style={styles.fieldView}>
            <Text
              style={[
                styles.formText,
                { color: userTheme ? colors.white : colors.black },
              ]}
            >
              Username
            </Text>
            <TextInput
              style={styles.textInputs}
              placeholder="Enter your username"
              placeholderTextColor={userTheme ? colors.greyC4 : colors.black}
              color={userTheme ? colors.white : colors.black}
              onChangeText={setUserName}
              value={userName}
            />
          </View>

          <View style={styles.fieldView}>
            <Text
              style={[
                styles.formText,
                { color: userTheme ? colors.white : colors.black },
              ]}
            >
              Farm Name
            </Text>
            <TextInput
              style={styles.textInputs}
              placeholder="Enter your Farmname"
              placeholderTextColor={userTheme ? colors.greyC4 : colors.black}
              color={userTheme ? colors.white : colors.black}
              onChangeText={setFarmName}
              value={farmName}
            />
          </View>

          <View style={styles.fieldView}>
            <Text
              style={[
                styles.formText,
                { color: userTheme ? colors.white : colors.black },
              ]}
            >
              Address
            </Text>
            <TextInput
              style={styles.textInputs}
              placeholder="Enter your address"
              placeholderTextColor={userTheme ? colors.greyC4 : colors.black}
              color={userTheme ? colors.white : colors.black}
              onChangeText={setAddress}
              value={address}
            />
          </View>

          <View style={styles.fieldView}>
            <Text
              style={[
                styles.formText,
                { color: userTheme ? colors.white : colors.black },
              ]}
            >
              Phone number
            </Text>
            <TextInput
              style={styles.textInputs}
              placeholder="Enter your number"
              placeholderTextColor={userTheme ? colors.greyC4 : colors.black}
              color={userTheme ? colors.white : colors.black}
              onChangeText={setPhoneNumber}
              value={phoneNumber}
              keyboardType={"number-pad"}
              returnKeyType='done'
            />
          </View>
        </View>

        <RBSheet
        ref={RBref}
        customStyles={{ container: styles.sheetContainer }}
      >
        <View style={styles.sheetWholeView}>
          <TouchableOpacity
            style={styles.modalContainer}
            onPress={() => {
              setShowModel(!showModel);
            }}
            activeOpacity={0}
          >
            <View style={styles.modalView}>
              <View style={styles.imageUploadView}>
                <TouchableOpacity
                  style={styles.cameraView}
                  onPress={cameraOnPress}
                >
                  <FontAwesome name="camera" size={25} color={colors.black} />
                  <Text style={styles.imageViewText}>Camera</Text>
                </TouchableOpacity>

                {/* <TouchableOpacity
                  style={styles.cameraView}
                  onPress={profileDeleteOnPress}
                >
                  <MaterialIcon name="delete" size={29} color={colors.black} />
                  <Text style={styles.imageViewText}>Delete</Text>
                </TouchableOpacity> */}

                <TouchableOpacity
                  style={styles.cameraView}
                  onPress={galleryOnPress}
                >
                  <Ionicons name="md-images" size={27} color={colors.black} />
                  <Text style={styles.imageViewText}>Gallery</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
          </View>

</RBSheet>
</ScrollView>
</View>
</KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  loaderStyle: {
    alignSelf: "center",
  },
  container: {
    flex: 1,
  },
  loaderView: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    zIndex: 2,
    elevation: 5,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  backButton: {
    alignSelf: "flex-start",
    borderWidth: 0.5,
    borderRadius: 50,
    margin: 10,
    borderColor: colors.greyC4,
  },
  profileText: {
    alignSelf: "center",
    fontFamily: textFontFaceMedium,
    fontSize: 20,
    color: "#2C3040",
    position: "absolute",
    zIndex: 2,
  },
  profileContent: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
  },
  saveButton: {
    marginHorizontal: 10,
  },
  saveText: {
    alignSelf: "flex-end",
    fontSize: 15,
    color: colors.buttonGreen,
    fontFamily: textFontFace,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 1,
  },
  profileImage: {
    resizeMode: "contain",
    height: 180,
    width: 180,
    borderRadius: 90,
    borderWidth: 1,
  },
  cameraButton: {
    backgroundColor: colors.buttonGreen,
    borderRadius: 50,
    padding: 5,
    borderColor: colors.white,
    borderWidth: 1,
    position: "absolute",
    alignSelf: "flex-end",
    bottom: 20,
  },
  formContainer: {
    flex: 1,
    marginHorizontal: 30,
    marginVertical: 10,
  },
  fieldView: {
    marginVertical: 5,
  },
  formText: {
    color: colors.tanGrey,
    marginVertical: 10,
    fontSize: 18,
  },
  textInputs: {
    fontFamily: textFontFaceMedium,
    fontSize: fontsSize.smallText,
    alignSelf: "flex-start",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.baseBackground,
    padding: 10,
    marginVertical: 10,
    width: win.width * 0.8,
    color: colors.black,
    marginRight: 20,
  },
  modelStyle: {},
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: colors.lowGrey,
    height: "15%",
    width: "98%",
    // alignItems: "center",
    justifyContent: "center",
    marginTop: "auto",
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 100,
    elevation: 10,
  },
  imageUploadView: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  cameraView: {
    alignItems: "center",
  },
});

export default EditProfile;
