import { useNavigation } from "@react-navigation/native";
import axios, { Axios } from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { BackHandler, StyleSheet, Text, View } from "react-native";
import { Checkbox } from "react-native-paper";
import { useSelector } from "react-redux";
import { colors } from "../../../common/colors";
import TopBar from "../../../common/TopBar";
import { getItem, LOG } from "../../../common/util";

const FoodMenu = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>FoodMenu</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default FoodMenu;
