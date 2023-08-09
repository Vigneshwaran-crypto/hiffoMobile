import React from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { colors } from "../../../common/colors";
import { textFontFaceMedium } from "../../../common/styles";
import orderList from "../../../../Assests/OrdereList.json";

const Orders = () => {
  const orderListItem = ({ item }) => {
    return (
      <View style={styles.itemParent}>
        <View style={styles.tableView}>
          <Text style={styles.tableText}>{item.table}</Text>
        </View>

        <View style={styles.billContainer}>
          <Text style={styles.billText}>{item.billNo}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.screenContent}>
        <Text style={styles.titleText}>Orders</Text>

        <View style={styles.searchParent}>
          <View style={styles.filterIconParent}>
            <Feather
              name="filter"
              color={colors.activeGreen}
              size={22}
              style={{ padding: 8 }}
            />
          </View>

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
  },
  titleText: {
    fontFamily: textFontFaceMedium,
    fontSize: 21,
    color: colors.black,
  },
  searchParent: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  filterIconParent: {
    borderWidth: 1,
    marginEnd: 15,
    borderColor: colors.activeGreen,
    borderRadius: 8,
  },
  searchIconParent: {
    flex: 0.95,
    borderWidth: 1,
    borderColor: colors.activeGreen,
    borderRadius: 8,
  },
  searchInput: {
    marginVertical: -5,
  },
  flatListStyle: {
    flex: 1,
    marginHorizontal: 10,
    marginBottom: 50,
  },
  itemParent: {
    margin: 5,
    flex: 1,
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
