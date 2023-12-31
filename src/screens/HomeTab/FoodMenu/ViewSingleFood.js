import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
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
} from "../../../common/styles";
import MatIcon from "react-native-vector-icons/FontAwesome";
import { useSelector } from "react-redux";
const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = SLIDER_WIDTH;

const { height, width } = Dimensions.get("window");

const ViewSingleFood = (props) => {
  const food = props.route.params.item;
  const allAddOns = useSelector(({ api }) => api.allAddOns);

  const [foodItemAddOn, setFoodItemAddOn] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const tipCarouselRef = useRef();

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
  }, []);

  const foodImageRender = ({ item, index }) => {
    return <CarouselFoodItem index={index} item={item} />;
  };

  const renderAddOn = ({ item, index }) => (
    <View style={styles.addOnItem}>
      <View style={styles.itemImage}></View>

      <Text style={styles.addOnName}>{item.addonsName}</Text>
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

      <View style={styles.foodItemContent}>
        <View style={styles.foodRateView}>
          <Text style={styles.foodName} adjustsFontSizeToFit numberOfLines={1}>
            {food.foodName}
          </Text>

          <View style={styles.ratingView}>
            <Text>Rating</Text>
          </View>
        </View>

        <Text style={styles.priceText}>
          {food.rate} <MatIcon name="rupee" size={26} color={colors.black} />
        </Text>

        <Text style={styles.descText}>
          Upon the symbol's adoption in July 2010, the Indian government said it
          would try to adopt the sign within six months in the country and
          globally within 18 to 24 months, Major banks have also started
          printing cheques with the new Indian rupee sign, where the traditional
          ⟨₨⟩ sign was used. The Indian Postal Department also started printing
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  carouselView: {
    flex: 1,
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
  },
  addOnName: {
    marginVertical: 8,
    fontFamily: textFontFaceMedium,
    color: colors.buttonGreen,
    fontSize: SLIDER_WIDTH * 0.022,
    marginHorizontal: 10,
  },
});

export default ViewSingleFood;
