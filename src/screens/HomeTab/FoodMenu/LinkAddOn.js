import React, { useCallback, useRef, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AddOnModalItem from "./AddOnModalItem";
import { LOG, foodList } from "../../../common/util";
import { colors } from "../../../common/colors";
import { textFontFaceSemiBold } from "../../../common/styles";
import Header from "../../../common/Header";

const LinkAddOn = () => {
  const [modalShowType, setModalShowType] = useState(false);
  const [addOnList, setAddOnList] = useState([]);
  let addingAddOnList = useRef([]);

  const addAddOnPress = () => {
    setModalShowType(!modalShowType);

    if (modalShowType) {
    } else {
      setAddOnList(addingAddOnList.current);
    }
  };

  const onCheckingItem = useCallback((item) => {
    LOG("Clicked Item In Parent :", item);
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
        type={modalShowType}
        onItemPress={() => {}}
        onCheckingItem={onCheckingItem}
        onDecisionPress={onDecisionPress}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Header title={"Link AddOn"} />

      <View style={styles.screenContent}>
        <View style={styles.addAddOnView}>
          <FlatList
            data={modalShowType ? addOnList : foodList}
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
                    {modalShowType ? "Add AddOns" : "Submit"}
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
