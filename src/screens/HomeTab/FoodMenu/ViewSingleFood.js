import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Header from "../../../common/Header";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { colors } from "../../../common/colors";
import { LOG, addFoodItems } from "../../../common/util";
import CarouselFoodItem from "./CarouselFoodItem";
import {
  textFontFace,
  textFontFaceLight,
  textFontFaceMedium,
  textFontFaceSemiBold,
} from "../../../common/styles";
import MatIcon from "react-native-vector-icons/FontAwesome";
import MatIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import EnTypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import { useSelector } from "react-redux";
import LinearGradient from "react-native-linear-gradient";
const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = SLIDER_WIDTH;

const { height, width } = Dimensions.get("window");

const ViewSingleFood = (props) => {
  const food = props.route.params.item;
  const allAddOns = useSelector(({ api }) => api.allAddOns);

  const [foodItemAddOn, setFoodItemAddOn] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const tipCarouselRef = useRef();

  const ratingList = useState([]);

  const [foodName, setFoodName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [foodType, setFoodType] = useState("");
  const [description, setDesc] = useState("");
  const [showFoodModal, setShowFoodModal] = useState("");

  let foodId = useRef(0);

  useEffect(() => {
    LOG("food item in View SingleFood :", food);

    LOG("all add on list in view single food :", allAddOns);

    let foodAddOnList = [];

    for (let i = 1; i <= 10; i++) {
      const foodAddOn = food[`addon${i}`];
      if (foodAddOn) {
        foodAddOnList.push(parseInt(foodAddOn));
      }
    }
    LOG("foodAddOnList :", foodAddOnList);

    if (foodAddOnList.length != 0) {
      const foodAddOn = foodAddOnList.map((fAddOn) => {
        const allAddOn = allAddOns.find((allAdd) => fAddOn === allAdd.addonsId);
        if (allAddOn) {
          return allAddOn;
        }
      });

      console.log("matcehd all addOns :", foodAddOn);

      setFoodItemAddOn(foodAddOn);
    }

    let tempRateList = [];

    for (let i = 0; i < food.ratings; i++) {
      tempRateList.push(i);
    }

    ratingList.concat(tempRateList);
  }, []);

  // const onEditPress = () => {
  //   LOG("editOnPress view Food :", food);
  //   // if (activeTab == 0) {
  //     setShowFoodModal("ef"); //edit food menu
  //     setFoodName(food.foodName);
  //     foodId.current = food.foodId;
  //   // } else {
  //   //   setShowFoodModal("ea"); // edit add On
  //   //   setFoodName(item.addonsName);
  //   //   foodId.current = item.addonsId;
  //   // }

  //   setPrice(food.rate);
  //   setQuantity(food.unit);
  //   setFoodType(food.cType);
  //   setDesc(food.description);
  // };

  const foodImageRender = ({ item, index }) => {
    return <CarouselFoodItem index={index} item={item} />;
  };

  const renderAddOn = ({ item, index }) => (
    <View style={styles.addOnItem}>
      <View style={styles.itemImage}></View>

      <Text style={styles.addOnName} numberOfLines={1} adjustsFontSizeToFit>
        {item.addonsName}
      </Text>

      <Text style={styles.itemPriceText}>
        <MatIcon
          name="rupee"
          size={SLIDER_WIDTH * 0.023}
          color={colors.activeGreen}
        />
        {item.rate}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title={"Food Item"} />

      <View style={styles.carouselView}>
        <Carousel
          scrollAnimationDuration={1}
          data={addFoodItems}
          renderItem={foodImageRender}
          itemWidth={ITEM_WIDTH / 1.15}
          sliderWidth={SLIDER_WIDTH / 1.15}
          ref={tipCarouselRef}
          layout={"default"}
          useScrollView={true}
          contentContainerCustomStyle={{
            // borderWidth: 1,
            borderRadius: 10,
          }}
          // style={{ borderRadius: 10 }}
          containerCustomStyle={styles.carouselStyle}
          onScrollIndexChanged={(ind) => setCurrentIndex(ind)}
          // onScrollIndexChanged={(ind) => LOG("current index :", ind)}
          pagingEnabled={true}
          autoplay={true}
          disableIntervalMomentum={true}
        />

        <Pagination
          dotsLength={addFoodItems.length}
          activeDotIndex={currentIndex}
          dotStyle={styles.activeDotStyle}
          inactiveDotScale={0.8}
          dotColor={colors.blue}
          inactiveDotColor={colors.grey}
          containerStyle={styles.paginationStyle}
        />
      </View>

      <ScrollView nestedScrollEnabled style={{ flex: 2 }}>
        <View style={styles.foodItemContent}>
          <View style={styles.foodRateView}>
            <Text
              style={styles.foodName}
              adjustsFontSizeToFit
              numberOfLines={1}
            >
              {food.foodName}
            </Text>

            <View style={styles.ratingView}>
              {ratingList.map((itm) => (
                <AntDesign
                  key={itm}
                  name="star"
                  color={colors.gold}
                  size={20}
                />
              ))}
            </View>
          </View>

          <Text style={styles.priceText}>
            <MatIcon
              name="rupee"
              size={SLIDER_WIDTH * 0.04}
              color={colors.activeGreen}
            />

            {food.rate}
          </Text>

          {/* Copied code start */}

          <View style={styles.addFoodQuantityView}>
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
              style={[styles.itemAddButton, { marginHorizontal: 10 }]}
              // onPress={onEditPress.bind(this, item)}
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

            <TouchableOpacity style={styles.itemAddButton}>
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
          </View>

          <View style={styles.roundButtonsView}>
            <TouchableOpacity
              style={styles.itemRoundButton}
              // onPress={onEditPress}
            >
              <MatIcons
                name="pencil"
                size={width * 0.035}
                color={colors.white}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.itemRoundButton, { marginHorizontal: 20 }]}
              // onPress={onLinkPress.bind(this, item)}
            >
              <EnTypo name="link" size={0.032 * width} color={colors.mildBg} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.itemRoundButton}
              // onPress={itemDeleteOnPress.bind(this, item)}
            >
              <Feather
                name="trash-2"
                size={0.032 * width}
                color={colors.mildBg}
              />
            </TouchableOpacity>
          </View>

          {/* copied code ended */}

          <Text style={styles.descText}>
            Upon the symbol's adoption in July 2010, the Indian government said
            it would try to adopt the sign within six months in the country and
            globally within 18 to 24 months, Major banks have also started
            printing cheques with the new Indian rupee sign, where the
            traditional ⟨₨⟩ sign was used. The Indian Postal Department also
            started printing
          </Text>

          <Text style={styles.addOnTitle}>AddOn List</Text>
          <View style={styles.addOnListView}>
            <FlatList
              data={foodItemAddOn}
              key={(item, ind) => ind}
              renderItem={renderAddOn}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  carouselView: {
    flex: 0.8,
    alignItems: "center",
    justifyContent: "center",
    // borderWidth: 1,
  },
  carouselStyle: {
    alignSelf: "center",
    // borderWidth: 1,
    borderRadius: 10,
    flex: 1,
  },
  activeDotStyle: {
    height: 10,
    width: 10,
    borderRadius: 10,
    backgroundColor: colors.black,
  },

  foodItemContent: {
    flex: 1.5,
    // borderWidth: 1,
    width: ITEM_WIDTH / 1.15,
    alignSelf: "center",
  },

  foodRateView: {
    flexDirection: "row",
    // borderWidth: 1,
  },

  foodName: {
    fontFamily: textFontFace,
    color: colors.black,
    fontSize: SLIDER_WIDTH * 0.05,
    flex: 1,
  },

  ratingView: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // borderWidth: 1,
  },
  priceText: {
    marginVertical: 8,
    fontFamily: textFontFaceMedium,
    color: colors.buttonGreen,
    fontSize: SLIDER_WIDTH * 0.045,
  },

  descText: {
    fontFamily: textFontFaceLight,
    color: colors.darkBlue,
    textAlign: "center",
    marginHorizontal: 10,
    marginBottom: 10,
    marginTop: 15,
  },
  addOnTitle: {
    fontFamily: textFontFaceMedium,
    color: colors.black,
    fontSize: SLIDER_WIDTH * 0.025,
    marginVertical: 7,
  },
  addOnListView: {
    flex: 1,
    // borderWidth: 1,
  },
  addOnItem: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: colors.mildBg,
    borderColor: colors.itemBorderGrey,
    flexDirection: "row",
    alignItems: "center",
  },

  itemImage: {
    height: width * 0.1,
    width: width * 0.1,
    borderRadius: width * 0.05,
    zIndex: 2,
    elevation: 2,
    shadowColor: colors.black,
    // borderWidth: 1,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.black,
  },
  addOnName: {
    marginVertical: 8,
    fontFamily: textFontFaceMedium,
    color: colors.vantaBlack,
    fontSize: SLIDER_WIDTH * 0.022,
    marginHorizontal: 10,
    // borderWidth: 1,
    flex: 1,
  },
  itemPriceText: {
    // borderWidth: 1,
    flex: 0.3,
    textAlign: "center",
    fontFamily: textFontFaceMedium,
    color: colors.buttonGreen,
    fontSize: SLIDER_WIDTH * 0.023,
  },
  addFoodQuantityView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // borderWidth: 1,
    // flex: 1,
    // marginVertical: 10,
    // marginBottom: 15,
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
    // marginHorizontal: 6,
  },

  roundButtonsView: {
    // borderWidth: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    // marginBottom: 10,
    marginVertical: 10,
    marginTop: 15,
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
    fontSize: 0.023 * width,
    // borderWidth: 1,
    // fontSize: liquidFont(5),
  },
  itemRoundButton: {
    alignItems: "center",
    justifyContent: "center",
    // marginEnd: 10,
    backgroundColor: colors.subTextColor,
    // marginHorizontal: 5,
    height: 0.055 * width,
    width: 0.055 * width,
    borderRadius: 0.027 * width,
  },
});

export default ViewSingleFood;
