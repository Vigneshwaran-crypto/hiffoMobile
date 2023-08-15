import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import { colors } from "../../../common/colors";
import { textFontFaceMedium } from "../../../common/styles";
import orderList from "../../../../Assests/OrdereList.json";
import LinearGradient from "react-native-linear-gradient";

const Orders = () => {
  const orderListItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
        }}
      >
        <LinearGradient
          colors={["#512B81", "#241468"]}
          start={{ x: 0.7, y: 0.4 }}
          end={{ x: 0, y: 1 }}
          style={styles.itemParent}
        >
          <LinearGradient
            colors={["#20A090", "#a0ce4e"]}
            start={{ x: 0.7, y: 0.4 }}
            end={{ x: 0, y: 1 }}
            style={styles.tableView}
          >
            <Text style={styles.tableText}>{item.table}</Text>
          </LinearGradient>

          <View style={styles.billContainer}>
            <Text style={styles.billText}>{item.billNo}</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.screenContent}>
        <View style={styles.titleView}>
          <Image
            source={require("../../../../Assests/images/hiffoTitle.png")}
            style={styles.titleImage}
          />

          <View>
            <Text style={styles.hotelNameText}>
              <FontAwesome5 name="hotel" color={colors.logoBlue} size={20} />{" "}
              Adyar Anandha bahavan
            </Text>
            <Text style={styles.hotelBranchText}>Branch Name</Text>
          </View>
        </View>

        <View style={styles.searchParent}>
          <View style={styles.searchIconParent}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Feather
                name="search"
                color={colors.activeGreen}
                size={22}
                style={{ marginHorizontal: 3, marginStart: 10 }}
              />
              <TextInput
                placeholder="Search orders"
                style={styles.searchInput}
              />
            </View>
          </View>
        </View>
      </View>

      <FlatList
        data={orderList}
        key={(item) => item.id}
        renderItem={orderListItem}
        style={styles.flatListStyle}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        numColumns={4}
        horizontal={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screenContent: {
    marginHorizontal: 15,
    marginVertical: 14,
    alignSelf: "center",
  },
  flatListStyle: {
    flex: 1,
    marginBottom: 50,
    width: "90%",
    alignSelf: "center",
  },
  titleView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
  titleImage: {
    resizeMode: "cover",
    height: "100%",
    width: "45%",
    marginStart: -15,
  },
  hotelNameText: {
    color: colors.logoBlue,
    fontFamily: textFontFaceMedium,
    fontSize: 14,
  },
  hotelBranchText: {
    alignSelf: "flex-end",
    color: colors.logoBlue,
    fontFamily: textFontFaceMedium,
  },
  searchParent: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },

  searchIconParent: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.activeGreen,
    borderRadius: 8,
  },
  searchInput: {
    marginVertical: -5,
  },

  itemParent: {
    margin: 5,
    borderRadius: 5,
    marginHorizontal: 15,
    marginVertical: 12,
    backgroundColor: colors.lightBlue,
  },
  billContainer: {
    alignItems: "center",
    paddingTop: 30,
  },
  billText: {
    fontFamily: textFontFaceMedium,
    color: colors.white,
  },
  tableView: {
    alignItems: "flex-end",
    position: "absolute",
    right: -5,
    marginTop: -12,
    height: 30,
    width: 30,
    borderRadius: 15,
    justifyContent: "center",
    backgroundColor: colors.lightGreen,
    elevation: 5,
  },
  tableText: {
    alignSelf: "center",
    fontFamily: textFontFaceMedium,
    color: colors.white,
  },
});

export default Orders;
