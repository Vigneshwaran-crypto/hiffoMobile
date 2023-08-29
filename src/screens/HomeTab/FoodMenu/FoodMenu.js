import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../../../common/colors";
import Header from "../../../components/DefaultComponents/Header";
import { textFontFaceMedium } from "../../../common/styles";
import Feather from "react-native-vector-icons/Feather";
import FoodItem from "./FoodItem";
import { LOG } from "../../../common/util";

const { height, width } = Dimensions.get("window");

const FoodMenu = () => {
  const navigation = useNavigation();

  const [categoryFocus, setCategoryFocus] = useState({
    id: 1,
    value: "Indian",
  });
  const [activeTab, setActiveTab] = useState(0);

  const categoryList = [
    { id: 1, value: "Indian" },
    { id: 2, value: "Chinese" },
    { id: 3, value: "Italian" },
    { id: 4, value: "Sea food" },
    { id: 5, value: "Chats" },
    { id: 6, value: "+" },
  ];

  const foodList = [
    {
      id: 1,
      name: "Meals with indian chars",
      price: "250 ₹",
      quantity: "200 g",
      type: "set",
      imagePath: require("../../../../Assests/images/meals.jpg"),
    },
    {
      id: 2,
      name: "Muttom Kozhambu",
      price: "200 ₹",
      quantity: "200 g",
      type: "set",
      imagePath: require("../../../../Assests/images/mutton.jpg"),
    },
    {
      id: 3,
      name: "Sea Food",
      price: "350 ₹",
      quantity: "200 g",
      type: "set",
      imagePath: require("../../../../Assests/images/seaFood.jpg"),
    },
    {
      id: 4,
      name: "Chapati and Salna",
      price: "150 ₹",
      quantity: "2 pcs",
      type: "add",
      imagePath: require("../../../../Assests/images/chapati.jpg"),
    },
    {
      id: 5,
      name: "South Indian Filter Coffee",
      price: "50 ₹",
      quantity: "60 ml",
      type: "add",
      imagePath: require("../../../../Assests/images/coffee.jpg"),
    },
  ];

  const addOnList = [
    {
      id: 1,
      name: "Somosa with chutney",
      price: "50 ₹",
      quantity: "2 pcs",
      type: "set",
      imagePath: require("../../../../Assests/images/samosa.jpg"),
    },
    {
      id: 2,
      name: "Special pasta",
      price: "70 ₹",
      quantity: "4 pcs",
      type: "set",
      imagePath: require("../../../../Assests/images/pasta.jpg"),
    },
    {
      id: 3,
      name: "Gulobjamun",
      price: "120 ₹",
      quantity: "6 pcs",
      type: "set",
      imagePath: require("../../../../Assests/images/gulobjamun.jpg"),
    },
  ];

  useEffect(() => {
    const ratio = PixelRatio.get();
  }, []);

  const topTabOnPress = (param) => {
    setActiveTab(param);
  };

  const foodCategoryRender = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={[
          styles.categoryParent,
          {
            borderColor:
              categoryFocus.id == item.id
                ? colors.darkBlue
                : colors.transparent,
          },
        ]}
        key={index}
        onPress={() => {
          setCategoryFocus(item);
        }}
      >
        <Text style={styles.categoryItemText}>{item.value}</Text>
      </TouchableOpacity>
    );
  };

  const foodItemRenderer = ({ item, ind }) => {
    return <FoodItem item={item} index={ind} activeTab={activeTab} />;
  };

  return (
    <View style={styles.container}>
      <Header title={"Adyar Anandha bahavan"} subText={"HID544789"} />

      <View style={styles.screenContent}>
        <View style={styles.foodTab}>
          <View style={styles.foodTabContainer}>
            <TouchableOpacity
              style={[
                styles.tabButton,
                {
                  marginEnd: 5,
                  borderColor:
                    activeTab == 0 ? colors.activeGreen : colors.greyBC,
                },
              ]}
              onPress={topTabOnPress.bind(this, 0)}
            >
              <Text
                style={[
                  styles.tabButtonText,
                  {
                    color: activeTab == 0 ? colors.activeGreen : colors.black,
                  },
                ]}
              >
                Food Menu
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.tabButton,
                {
                  borderColor:
                    activeTab == 1 ? colors.activeGreen : colors.greyBC,
                },
              ]}
              onPress={topTabOnPress.bind(this, 1)}
            >
              <Text
                style={[
                  styles.tabButtonText,
                  {
                    color: activeTab == 1 ? colors.activeGreen : colors.black,
                  },
                ]}
              >
                Add-Ons
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.searchView}>
            <TextInput placeholder="Search" style={styles.searchInput} />
            <Feather
              name="search"
              size={21}
              color={colors.grey}
              style={styles.searchIcon}
            />
          </View>
        </View>

        <View>
          {/* Food category list */}
          <FlatList
            data={categoryList}
            renderItem={foodCategoryRender}
            keyExtractor={(itm, ind) => ind}
            horizontal={true}
            contentContainerStyle={styles.categoryListContainer}
            showsHorizontalScrollIndicator={false}
          />

          <View style={styles.foodFlatListView}>
            {/* Food List flatList */}
            <FlatList
              data={activeTab == 0 ? foodList : addOnList}
              renderItem={foodItemRenderer}
              keyExtractor={(itm, ind) => ind}
              style={styles.foodFlatList}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.foodFlatList}
            />
          </View>
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
  screenContent: {
    flex: 1,
    width: "90%",
    alignSelf: "center",
    marginTop: 15,
    // marginBottom:118
  },
  foodTab: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 15,
  },
  foodTabContainer: {
    flexDirection: "row",
    width: "50%",
  },
  tabButton: {
    borderWidth: 1,
    width: "45%",
    alignItems: "center",
    borderRadius: 8,
    paddingVertical: 5,
  },
  tabButtonText: {
    fontFamily: textFontFaceMedium,
    fontSize: 12,
    marginTop: 3,
  },
  searchView: {
    width: "45%",
    borderWidth: 1,
    borderColor: colors.greyBC,
    borderRadius: 8,
    paddingStart: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.thingrey,
  },
  searchInput: {
    paddingVertical: 3,
    flex: 1,
  },
  searchIcon: {
    marginHorizontal: 8,
  },
  categoryListContainer: {
    // marginTop:15,
    marginVertical: 15,
  },
  categoryParent: {
    borderWidth: 1,
    height: 60,
    width: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    backgroundColor: colors.thingrey,
    borderColor: colors.logoBlue,
  },
  categoryItemText: {
    textAlign: "justify",
    fontFamily: textFontFaceMedium,
    fontSize: 12,
    color: colors.black,
  },
  foodFlatListView: {
    height: "90%",
  },
  foodFlatList: {
    paddingBottom: 120,
  },
});

export default FoodMenu;
