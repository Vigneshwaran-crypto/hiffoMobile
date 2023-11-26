import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import Header from "../../../common/Header";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { colors } from "../../../common/colors";
import { LOG, addFoodItems } from "../../../common/util";

const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = SLIDER_WIDTH;

const ViewSingleFood = (props) => {
  const food = props.route.params.item;
  const [currentIndex, setCurrentIndex] = useState(0);
  const tipCarouselRef = useRef();

  const foodImageRender = ({ item, index }) => {
    return (
      <View style={styles.foodImageParent}>
        <Image source={item} style={styles.foodImage} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header title={"Food Item"} />

      <View style={styles.carouselView}>
        <Carousel
          scrollAnimationDuration={1}
          data={addFoodItems}
          renderItem={foodImageRender}
          itemWidth={ITEM_WIDTH / 1.3}
          sliderWidth={SLIDER_WIDTH / 1.3}
          ref={tipCarouselRef}
          layout={"default"}
          useScrollView={true}
          containerCustomStyle={styles.carouselStyle}
          //   onScrollIndexChanged={(ind) => setCurrentIndex(ind)}
          //   onScrollIndexChanged={(ind) => LOG("current index :", ind)}

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  carouselView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  carouselStyle: {
    alignSelf: "center",
    // borderWidth: 1,
  },

  foodImageParent: {
    flex: 1,
  },
  foodImage: {
    resizeMode: "contain",
  },
  activeDotStyle: {
    height: 10,
    width: 10,
    borderRadius: 10,
    backgroundColor: colors.black,
  },
});

export default ViewSingleFood;
