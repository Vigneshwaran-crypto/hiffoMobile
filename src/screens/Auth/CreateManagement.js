import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../../common/colors";
import Header from "../../common/Header";
import {
  textFontFaceLight,
  textFontFaceMedium,
  textFontFaceSemiBold,
} from "../../common/styles";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const CreateManagement = () => {
  const [selected, setSelected] = useState(0);

  const flatData = [
    { id: 1, title: "Restaurant" },
    { id: 2, title: "Food Court" },
    { id: 3, title: "Dessert Shop" },
    { id: 4, title: "Restaurant" },
  ];

  const renderItem = ({ item }) => {
    const itemClick = () => {
      setSelected(item.id);
    };

    return (
      <TouchableOpacity style={styles.singleRenderItem} onPress={itemClick}>
        <View
          style={[
            styles.itemContainer,
            {
              borderColor:
                item.id == selected ? colors.logoOrange : colors.black,
            },
          ]}
        >
          <View style={styles.contView}>
            <MaterialIcons
              name={
                item.id == 2 || item.id == 1 ? "restaurant" : "local-restaurant"
              }
              size={20}
              color={colors.black}
            />
            <Text style={styles.itemText}>{item.title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Header title={"CREATE MANAGEMENT"} />

      <View style={styles.screenContent}>
        <Text style={styles.mediumText}>
          Hiffo welcomes you to join with us
        </Text>

        <Text style={styles.subText}>Create and manage</Text>

        <View style={styles.parentFlat}>
          <FlatList
            data={flatData}
            key={(itm) => itm.id}
            renderItem={renderItem}
            numColumns={2}
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
  screenContent: {
    marginHorizontal: 20,
  },
  mediumText: {
    color: colors.black,
    fontFamily: textFontFaceSemiBold,
    color: colors.black,
    fontSize: 18,
    marginVertical: 5,
  },
  subText: {
    fontFamily: textFontFaceLight,
    color: colors.logoBlue,
    fontSize: 15,
  },
  parentFlat: {
    // marginVertical: 50,
    marginTop: 30,
  },
  singleRenderItem: {
    // borderWidth: 1,
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
  },
  itemContainer: {
    borderWidth: 1.5,
    alignItems: "center",
    // justifyContent: "center",
    marginVertical: 15,
    width: "80%",

    borderRadius: 8,
  },
  itemText: {
    color: colors.logoBlue,
    fontFamily: textFontFaceMedium,
    marginBottom: -2,
  },
  contView: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
});

export default CreateManagement;
