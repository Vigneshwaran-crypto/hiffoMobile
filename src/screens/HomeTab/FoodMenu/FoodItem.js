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
const { height, width } = Dimensions.get("window");

const FoodItem = ({ item, index, activeTab, onItemPress }) => {
  const navigation = useNavigation();
  const onFoodItemPress = (item) => {
    onItemPress(item);
  };

  const onLinkPress = () => {
    navigation.navigate("linkAddOn");
  };

  return (
    <TouchableOpacity
      style={styles.foodItemParent}
      key={index}
      activeOpacity={1}
      onPress={onFoodItemPress.bind(this, item)}
    >
      <View style={styles.itemImageView}>
        <Image style={styles.foodItemImage} source={item.imagePath} />
      </View>

      <View style={styles.foodItemTexts}>
        <Text style={styles.foodName}>{item.name}</Text>
        <Text style={styles.foodItemQuantity}>{item.quantity}</Text>

        <View style={styles.foodItemPriceView}>
          <Text style={styles.foodItemPrice}>{item.price}</Text>

          {/* <ScrollView style={{ borderWidth: 1 }} horizontal={true}> */}
          <View style={styles.addFoodQuantityView}>
            <TouchableOpacity style={styles.itemAddButton}>
              <LinearGradient
                colors={[colors.subTextColor, colors.tanGrey]}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 0 }}
                style={styles.addGradient}
              >
                <Text style={styles.itemButtonsText}>Show</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.itemAddButton}>
              <LinearGradient
                colors={[colors.buttonGreen, colors.activeGreen]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.addGradient}
              >
                <Text style={styles.itemButtonsText}>Hide</Text>
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
                <Text style={styles.itemButtonsText}>Restock</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.itemRoundButton,
                { display: activeTab == 0 ? "flex" : "none" },
              ]}
              onPress={onLinkPress}
            >
              <EnTypo name="link" size={19} color={colors.mildBg} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.itemRoundButton}>
              <Feather name="trash-2" size={19} color={colors.mildBg} />
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
    padding: 20,
    paddingVertical: 28,
    backgroundColor: colors.mildBg,
    borderRadius: 25,
    width: "100%",
  },
  itemImageView: {
    elevation: 15,
    shadowColor: colors.black,
    shadowOpacity: 10,
    backgroundColor: colors.white,
    height: 75,
    width: 75,
    borderRadius: 50,
    padding: 0.3,
  },
  foodItemImage: {
    height: 75,
    width: 75,
    borderRadius: 50,
    resizeMode: "cover",
  },
  foodItemTexts: {
    marginStart: 20,
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
    marginTop: 5,
    width: "20%",
  },
  foodItemPriceView: {
    flexDirection: "row",
    width: width * 0.7,
    justifyContent: "space-between",
    alignItems: "center",
  },
  addFoodQuantityView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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
    padding: 0.1,
    width: width * 0.12,
    marginEnd: 12,
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
    fontFamily: textFontFaceLight,
    color: colors.mildBg,
    fontSize: 11,
  },
  itemRoundButton: {
    height: 31,
    width: 31,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginEnd: 10,
    backgroundColor: colors.subTextColor,
  },
});

export default FoodItem;
