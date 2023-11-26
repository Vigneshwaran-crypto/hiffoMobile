import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AddOnModalItem from "./AddOnModalItem";
import { LOG, Toast, foodList } from "../../../common/util";
import { colors } from "../../../common/colors";
import { textFontFaceSemiBold } from "../../../common/styles";
import Header from "../../../common/Header";
import { useDispatch, useSelector } from "react-redux";
import { linkAddOn } from "../../../redux/Api-Action";

const LinkAddOn = (props) => {
  const dispatch = useDispatch();
  const [modalShowType, setModalShowType] = useState(false);
  const [addOnList, setAddOnList] = useState([]);
  let addingAddOnList = useRef([]);

  const allAddOns = useSelector(({ api }) => api.allAddOns);
  const linkedAddOns = useSelector(({ api }) => api.viewFoodAddOn.addonArray);
  const hotelDetails = useSelector(({ auth }) => auth.hotelDetails);

  const foodItem = props.route.params.item;

  const from = props.route.params.from;

  const addedAddOnProps = props.route.params.foodData.addonArray || [];

  useEffect(() => {
    LOG("allAdd ons list in linkAddOn :", allAddOns);
    LOG("linked addOn from props  :", addedAddOnProps);
    LOG("linked add on by store :", linkedAddOns);
    LOG("clicked food item :", foodItem);

    let mergedAddOn = allAddOns;
    let clearAddON = addedAddOnProps;

    if (clearAddON.length !== 0) {
      clearAddON = clearAddON.map((item) => ({ ...item, checked: true }));
      clearAddON.forEach((item) => {
        addingAddOnList.current.push(item);
      });

      mergedAddOn = allAddOns.filter((item) => {
        const isHave = clearAddON.find(
          (adItem) => adItem.addonsId === item.addonsId
        );
        if (isHave) {
          // return isHave;
        } else {
          return item;
        }
      });

      LOG("merged array :", mergedAddOn);
      mergedAddOn = clearAddON.concat(mergedAddOn);
      LOG("clear Merged addOn :", mergedAddOn);
    }

    setAddOnList(mergedAddOn);
  }, [props]);

  const addAddOnPress = () => {
    const addonsIdsList = addingAddOnList.current.map((item) => {
      return item.addonsId;
    });
    LOG("splitted item with values :", addonsIdsList);
    let addonsIdsObj = {};

    addonsIdsList.forEach((itm, ind) => {
      //adding every addOn with it ids
      addonsIdsObj[`addonsId${ind + 1}`] = itm;
    });
    addonsIdsObj.hid = hotelDetails.hotelId;
    addonsIdsObj.token = hotelDetails.token;
    addonsIdsObj.foodId = foodItem.foodId;

    LOG("changed array into object :", addonsIdsObj);

    dispatch(linkAddOn(addonsIdsObj));
  };

  const onCheckingItem = useCallback((item) => {
    addingAddOnList.current.push(item);
  }, []);

  const onDecisionPress = (is, item) => {
    LOG("Pressed item :", is);
    LOG("Pressed item :", item);

    if (is == 1) {
    } else {
    }
  };

  const addAddOnRenderItem = ({ item, index }) => {
    return (
      <AddOnModalItem
        item={item}
        index={index}
        activeTab={1}
        onItemPress={() => {}}
        onCheckingItem={onCheckingItem}
        onDecisionPress={onDecisionPress}
        checkedList={addingAddOnList.current}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Header title={"Link AddOn"} />

      <View style={styles.screenContent}>
        <View style={styles.addAddOnView}>
          <FlatList
            // data={isView ? linkedAddOns : allAddOns}
            data={addOnList}
            renderItem={addAddOnRenderItem}
            keyExtractor={(itm, ind) => ind}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 30 }}
            ListFooterComponent={
              <View style={styles.modalListEmptyParent}>
                <TouchableOpacity
                  style={styles.itemAddButton}
                  onPress={addAddOnPress}
                >
                  <Text style={styles.itemButtonsText}>
                    {/* {modalShowType ? "Add AddOns" : "Submit"} */}
                    Add AddOns
                  </Text>
                </TouchableOpacity>
              </View>
            }
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
    flex: 1,
  },
  addAddOnView: {
    alignSelf: "center",
    flex: 1,
    marginTop: 10,
    marginHorizontal: 25,
  },
  modalListEmptyParent: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: colors.itemBorderGrey,
    marginTop: 15,
    padding: 20,
    paddingVertical: 28,
    backgroundColor: colors.mildBg,
    borderRadius: 25,
    width: "100%",
    height: "40%",
    justifyContent: "center",
    flex: 1,
  },
  itemAddButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    alignSelf: "center",
  },
  itemButtonsText: {
    marginVertical: 5,
    fontFamily: textFontFaceSemiBold,
    color: colors.greyBC,
    fontSize: 15,
  },
});

export default LinkAddOn;
