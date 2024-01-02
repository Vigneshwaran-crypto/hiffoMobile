import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../../../common/colors";
import {
  textFontFace,
  textFontFaceLight,
  textFontFaceMedium,
  textFontFaceSemiBold,
} from "../../../common/styles";
import EnTypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import LinearGradient from "react-native-linear-gradient";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { LOG, liquidFont } from "../../../common/util";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAddOn,
  deleteMenu,
  viewFoodAddOn,
} from "../../../redux/Api-Action";
const { height, width } = Dimensions.get("window");

const FoodItem = ({ item, index, activeTab, onItemPress, editOnPress }) => {
  const dispatch = useDispatch();
  const hotelDetails = useSelector(({ auth }) => auth.hotelDetails);

  const navigation = useNavigation();

  const onFoodItemPress = (item) => {
    onItemPress(item);
  };

  const onLinkPress = (item) => {
    // navigation.navigate("linkAddOn", { item: item, from: "add" });

    const req = {
      token: hotelDetails.token,
      hid: hotelDetails.hotelId,
      foodId: item.foodId,
    };

    dispatch(viewFoodAddOn(req, { ...item, from: "link" }));
  };

  const itemDeleteOnPress = (itm) => {
    LOG("item gonna be deleted clicked :");

    if (activeTab == 0) {
      const req = {
        hid: hotelDetails.hotelId,
        token: hotelDetails.token,
        foodId: itm.foodId,
      };

      const extra = {
        cat: itm.category,
        id: itm.foodId,
      };

      dispatch(deleteMenu(req, extra));
    } else {
      const req = {
        hid: hotelDetails.hotelId,
        token: hotelDetails.token,
        addonsId: itm.addonsId,
      };
      dispatch(deleteAddOn(req));
    }
  };

  const onEditPress = (item) => {
    editOnPress(item);
  };

  return (
    <TouchableOpacity
      style={styles.foodItemParent}
      key={index}
      activeOpacity={1}
      onPress={onFoodItemPress.bind(this, item)}
    >
      <View style={styles.itemImageView}>
        <View style={styles.imageContainer}></View>

        {/* <Image style={styles.foodItemImage} source={item.imagePath} /> */}
      </View>

      <View style={styles.foodItemTexts}>
        <Text style={styles.foodName}>
          {activeTab == 0 ? item.foodName : item.addonsName}
        </Text>

        <Text style={styles.foodItemQuantity}>{item.unit}</Text>

        <View style={styles.foodItemPriceView}>
          <Text style={styles.foodItemPrice}>{item.rate}</Text>

          {/* <ScrollView style={{ borderWidth: 1 }} horizontal={true}> */}
          <View
            style={[
              styles.addFoodQuantityView,
              { display: activeTab === 0 ? "none" : "flex" },
            ]}
          >
            <TouchableOpacity style={styles.itemAddButton}>
              <LinearGradient
                colors={[colors.subTextColor, colors.tanGrey]}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 0 }}
                style={styles.addGradient}
              >
                <Text
                  style={styles.itemButtonsText}
                  adjustsFontSizeToFit={true}
                  numberOfLines={1}
                >
                  Show
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.itemAddButton}
              onPress={onEditPress.bind(this, item)}
            >
              <LinearGradient
                colors={[colors.buttonGreen, colors.activeGreen]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.addGradient}
              >
                <Text
                  style={styles.itemButtonsText}
                  adjustsFontSizeToFit={true}
                  numberOfLines={1}
                >
                  Hide
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.itemAddButton,
                { display: activeTab == 0 ? "flex" : "none" },
              ]}
            >
              <LinearGradient
                colors={[colors.subTextColor, colors.tanGrey]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.addGradient}
              >
                <Text
                  adjustsFontSizeToFit={true}
                  numberOfLines={1}
                  style={styles.itemButtonsText}
                >
                  Restock
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.itemRoundButton,
                { display: activeTab == 0 ? "flex" : "none" },
              ]}
              onPress={onLinkPress.bind(this, item)}
            >
              <EnTypo name="link" size={0.03 * width} color={colors.mildBg} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.itemRoundButton}
              onPress={itemDeleteOnPress.bind(this, item)}
            >
              <Feather
                name="trash-2"
                size={0.03 * width}
                color={colors.mildBg}
              />
            </TouchableOpacity>
          </View>
          {/* </ScrollView> */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  foodItemParent: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: colors.itemBorderGrey,
    marginTop: 15,
    backgroundColor: colors.mildBg,
    borderRadius: 23,
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 0.035 * width,
  },
  itemImageView: {
    // borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  imageContainer: {
    elevation: 10,
    shadowColor: colors.black,
    shadowOpacity: 10,
    backgroundColor: colors.white,
    height: 0.12 * width,
    width: 0.12 * width,
    borderRadius: 0.06 * width,
    // borderWidth: 1,
  },
  foodItemImage: {
    height: 75,
    width: 75,
    borderRadius: 50,
    resizeMode: "cover",
  },
  foodItemTexts: {
    marginStart: 20,
    // borderWidth: 1,
    flex: 6,
  },
  foodName: {
    color: colors.black,
    fontFamily: textFontFaceMedium,
  },
  foodItemQuantity: {
    color: colors.subTextColor,
    fontFamily: textFontFace,
  },
  foodItemPrice: {
    color: colors.black,
    fontFamily: textFontFaceLight,
    // marginTop: 5,
    // width: "20%",
    alignSelf: "flex-end",
    // borderWidth: 1,
    flex: 1,
  },
  foodItemPriceView: {
    flexDirection: "row",
    // width: width * 0.7,
    justifyContent: "space-between",
    alignItems: "center",
    // borderWidth: 1,
    flex: 1,
  },
  addFoodQuantityView: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    // borderWidth: 1,
    flex: 6,
  },
  itemAddButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    elevation: 15,
    backgroundColor: colors.transparent,
    shadowColor: colors.grey,
    shadowOpacity: 3,
    shadowOffset: { height: 2, width: 2 },
    // borderWidth: 1,
    flex: 1,
    marginHorizontal: 6,
  },

  addGradient: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    width: "100%",
  },
  plusText: {
    fontFamily: textFontFaceSemiBold,
    fontSize: 15,
  },
  itemButtonsText: {
    marginVertical: 5,
    marginHorizontal: 5,
    fontFamily: textFontFaceLight,
    color: colors.mildBg,
    // fontSize: 11,
    fontSize: 0.019 * width,
    // borderWidth: 1,
    // fontSize: liquidFont(5),
  },
  itemRoundButton: {
    alignItems: "center",
    justifyContent: "center",
    // marginEnd: 10,
    backgroundColor: colors.subTextColor,
    marginHorizontal: 5,
    height: 0.045 * width,
    width: 0.045 * width,
    borderRadius: 0.025 * width,
  },
});

export default FoodItem;
