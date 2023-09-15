import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../../common/colors";

const Tables = () => {
  return (
    <View style={styles.container}>
      <View style={styles.firstHalf}>
        <View style={styles.first1} />
        <View style={styles.first2} />
        <View style={styles.first3} />
      </View>
      <View style={styles.secondHalf}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  firstHalf: {
    backgroundColor: colors.assessExt,
    flex: 3,
    flexDirection: "row",
  },
  first1: {
    backgroundColor: colors.activeGreen,
    flex: 1,
  },
  first2: {
    backgroundColor: colors.lowGreen,
    flex: 1,
  },
  first3: {
    backgroundColor: colors.accent,
    flex: 1,
  },
  secondHalf: {
    backgroundColor: colors.amber,
    flex: 3,
  },
});

export default Tables;
