import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const CarouselFoodItem = ({ item, index }) => {
  return (
    <View style={styles.foodImageParent} key={index}>
      <Image source={item} style={styles.foodImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  foodImageParent: {
    flex: 1,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  foodImage: {
    resizeMode: "cover",
    flex: 1,
    borderRadius: 15,
    overflow: "hidden",
    height: "100%",
    width: "100%",
  },
});

export default CarouselFoodItem;
