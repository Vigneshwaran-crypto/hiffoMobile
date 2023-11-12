import React, { useRef, useState } from "react";
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
import { Checkbox } from "react-native-paper";
import { LOG, Toast } from "../../../common/util";

const { height, width } = Dimensions.get("window");

const AddOnModalItem = ({
  item,
  index,
  activeTab,
  onItemPress,
  onCheckingItem,
  checkedList,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  const onFoodItemPress = (item) => {
    onItemPress(item);
  };

  const onCheckItem = () => {
    LOG("already chosen item :", checkedList);

    if (checkedList.length < 10) {
      setIsChecked(!isChecked);
      onCheckingItem(item);
    } else {
      Toast("We Can Only Add 10 Items");
    }
  };

  return (
    <TouchableOpacity
      style={styles.foodItemParent}
      key={index}
      activeOpacity={1}
      onPress={onFoodItemPress.bind(this, item)}
    >
      <View style={styles.itemImageView}>
        {/* <Image style={styles.foodItemImage} source={item.imagePath} /> */}
      </View>

      <View style={styles.foodItemTexts}>
        <Text style={styles.foodName}>{item.addonsName}</Text>
        <Text style={styles.foodItemQuantity}>{item.unit}</Text>

        <View style={styles.foodItemPriceView}>
          <Text style={styles.foodItemPrice}>{item.rate}</Text>

          <View style={styles.addFoodQuantityView}>
            {/* {type ? (
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={styles.itemAddButton}
                  onPress={onDecisionPress.bind(this, 1, item)}
                >
                  <LinearGradient
                    colors={[colors.buttonGreen, colors.activeGreen]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.addGradient}
                  >
                    <Text style={styles.itemButtonsText}>Edit</Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.itemAddButton}
                  onPress={onDecisionPress.bind(this, 2, item)}
                >
                  <LinearGradient
                    colors={[colors.subTextColor, colors.tanGrey]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.addGradient}
                  >
                    <Text style={styles.itemButtonsText}>Delete</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            ) : ( */}
            <View style={styles.checkBoxView}>
              <Checkbox
                status={isChecked ? "checked" : "unchecked"}
                color={colors.activeGreen}
                uncheckedColor={colors.grey}
                onPress={onCheckItem}
                theme={{ dark: true }}
              />
            </View>
            {/* )} */}
          </View>
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
    width: "80%",
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
  checkBoxView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
});

export default AddOnModalItem;
