import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../../common/colors";
import Header from "../../common/Header";
import {
  textFontFaceLight,
  textFontFaceMedium,
  textFontFaceSemiBold,
} from "../../common/styles";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const CreateManagement = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(0);
  const fadInButton = useRef(new Animated.Value(0)).current;

  const flatData = [
    { id: 1, title: "Restaurant" },
    { id: 2, title: "Food Court" },
    { id: 3, title: "Dessert Shop" },
    { id: 4, title: "Restaurant" },
  ];

  const createManage = () => {
    navigation.navigate("homeTab");
  };

  const renderItem = ({ item }) => {
    const itemClick = () => {
      setSelected(item.id);
      Animated.timing(fadInButton, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    };

    return (
      <TouchableOpacity style={styles.singleRenderItem} onPress={itemClick}>
        <View
          style={[
            styles.itemContainer,
            {
              borderColor:
                item.id == selected ? colors.lightGreen : colors.black,
            },
          ]}
        >
          <View style={styles.contView}>
            <MaterialIcons
              name={
                item.id == 2 || item.id == 1 ? "restaurant" : "local-restaurant"
              }
              size={20}
              color={colors.black}
            />
            <Text style={styles.itemText}>{item.title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Header title={"CREATE MANAGEMENT"} />

      <View style={styles.splashContent}>
        <Image
          source={require("../../../Assests/images/hiffoDesk.png")}
          style={styles.hiffoLogo}
        />
      </View>

      <View style={styles.screenContent}>
        <Text style={styles.mediumText}>
          Hiffo welcomes you to join with us
        </Text>

        <Text style={styles.subText}>Create and manage</Text>

        <View style={styles.parentFlat}>
          <FlatList
            data={flatData}
            key={(itm) => itm.id}
            renderItem={renderItem}
            numColumns={2}
          />
        </View>

        <Animated.View style={{ opacity: fadInButton, position: "absolute",width: "100%", }}>
          <TouchableOpacity onPress={createManage} >
            <LinearGradient
              colors={[colors.buttonGreen, colors.activeGreen]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.createButton}
            >
              <Text style={styles.createText}>CREATE</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  screenContent: {
    marginHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  splashContent: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    marginTop: 20,
    width: "70%",
    alignSelf: "center",
  },
  hiffoLogo: {
    height: height * 0.2,
    width: width * 0.8,
    resizeMode: "contain",
    borderColor: colors.black,
    marginTop: -30,
  },
  mediumText: {
    color: colors.black,
    fontFamily: textFontFaceSemiBold,
    color: colors.black,
    fontSize: 18,
    marginTop: 25,
  },
  subText: {
    fontFamily: textFontFaceLight,
    color: colors.logoBlue,
    fontSize: 15,
  },
  parentFlat: {
    marginTop: 30,
  },
  singleRenderItem: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
  },
  itemContainer: {
    borderWidth: 1.5,
    alignItems: "center",
    marginVertical: 15,
    width: "80%",
    borderRadius: 8,
  },
  itemText: {
    color: colors.logoBlue,
    fontFamily: textFontFaceMedium,
    marginBottom: -2,
  },
  contView: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
  createButton: {
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 30,
    marginTop: 50,
    width: "60%",
    alignSelf: "center",
  },
  createText: {
    color: colors.white,
    fontFamily: textFontFaceMedium,
    paddingVertical: 2,
  },
});

export default CreateManagement;
