import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Modal,
  PixelRatio,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../../../common/colors";
import Header from "../../../components/DefaultComponents/Header";
import {
  textFontFaceLight,
  textFontFaceMedium,
  textFontFaceSemiBold,
} from "../../../common/styles";
import Feather from "react-native-vector-icons/Feather";
import MatIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import FoodItem from "./FoodItem";
import {
  LOG,
  Toast,
  addFoodItems,
  addOnList,
  categoryList,
  foodList,
  scrWidth,
} from "../../../common/util";
import LinearGradient from "react-native-linear-gradient";
import AddOnModalItem from "../FoodMenu/AddOnModalItem";
import { useDispatch, useSelector } from "react-redux";
import {
  createAddOn,
  createMenu,
  editMenu,
  getAllFoods,
} from "../../../redux/Api-Action";
const { height, width } = Dimensions.get("window");

const FoodMenu = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const hotelDetails = useSelector(({ auth }) => auth.hotelDetails);
  const allFoods = useSelector(({ api }) => api.allFoods);

  const [categoryFocus, setCategoryFocus] = useState({
    id: 1,
    value: "Indian",
  });
  const [activeTab, setActiveTab] = useState(0);
  const [showFoodModal, setShowFoodModal] = useState("");
  const [modalType, setModalType] = useState("");

  // 0 for addMenu , 1 for EditMenu , 2 for AddAddOn , 3 for editAddOn
  let modalNeed = useRef(null).current;

  const [foodName, setFoodName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [foodType, setFoodType] = useState("");
  const [description, setDesc] = useState("");

  const [foodItem, setFoodItem] = useState({});

  let foodId = useRef(0);

  const foodModalTitle =
    showFoodModal == "af"
      ? "Add Food"
      : showFoodModal == "ef"
      ? "Edit Food"
      : showFoodModal == "aa"
      ? "Add AddOn"
      : "Edit AddOn";

  useEffect(() => {
    LOG("modal need :" + modalNeed);
    const ratio = PixelRatio.get();
    LOG("hotelDetails in fMenu :", hotelDetails);

    if (hotelDetails.token) {
      const req = {
        hid: hotelDetails.hotelId,
        token: hotelDetails.token,
      };

      dispatch(getAllFoods(req));
    }
  }, [hotelDetails]);

  useEffect(() => {
    LOG("All foods in food menu :", allFoods);
    setFoodName("Dosa");
    setPrice("20");
    setQuantity("5");
    setFoodType("veg");
    setDesc("Nice food ever");
  }, [allFoods]);

  const topTabOnPress = (param) => {
    setActiveTab(param);
  };

  //af means addFood , ef means edit food , aa means addAddOn , ea means editAddOn
  const onFloatingAddPress = () => {
    if (activeTab == 0) {
      setShowFoodModal("af");
    } else {
      setShowFoodModal("aa");
    }
  };

  const modalCloseOnPress = () => {
    setShowFoodModal("");
  };

  const onCreateMenuSave = () => {
    if (!foodName) {
      Toast("Please enter food name");
    } else if (!price) {
      Toast("Please enter price");
    } else if (!quantity) {
      Toast("Please enter quantity");
    } else if (!foodType) {
      Toast("Please enter food type");
    } else if (!description) {
      Toast("Please enter description");
    } else {
      //Add Food menu
      if (activeTab == 0) {
        if (showFoodModal == "af") {
          const req = {
            hid: hotelDetails.hotelId,
            category: categoryFocus.value,
            foodName: foodName,
            unit: quantity,
            rate: price,
            img1: "",
            img2: "",
            img3: "",
            description: description,
            displayTime: "",
            cType: foodType,
            token: hotelDetails.token,
          };
          dispatch(createMenu(req));
        } else {
          const req = {
            hid: hotelDetails.hotelId,
            foodId: foodId.current,
            category: categoryFocus.value,
            foodName: foodName,
            unit: quantity,
            rate: price,
            description: description,
            displayTime: "",
            cType: foodType,
            token: hotelDetails.token,
          };
          dispatch(editMenu(req));
        }
      } else {
        //Add AddOn
        if (showFoodModal == "aa") {
          const req = {
            hid: hotelDetails.hotelId,
            category: categoryFocus.value,
            foodName: foodName,
            unit: quantity,
            rate: price,
            img1: "",
            img2: "",
            img3: "",
            description: description,
            displayTime: "",
            cType: foodType,
            token: hotelDetails.token,
          };
          dispatch(createAddOn(req));
        } else {
        }
      }
    }

    setShowFoodModal(""); // for closing the modal after done operation
  };

  const onItemPress = (item) => {
    LOG("onItemPress Item :", item);
  };

  const onEditPress = (item) => {
    LOG("editOnPress Item :", item);
    if (activeTab == 0) {
      setShowFoodModal("ef"); //edit food menu
    } else {
      setShowFoodModal("ea"); // edit add On
    }

    setFoodName(item.foodName);
    setPrice(item.rate);
    setQuantity(item.unit);
    setFoodType(item.cType);
    setDesc(item.description);

    // setFoodItem(item)
    foodId.current = item.foodId;
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

  const renderAddFoodInModal = ({ item, index }) => {
    return (
      <View style={styles.addFoodItemParent}>
        <View style={styles.itemImageView}>
          <Image
            style={styles.foodItemImage}
            source={require("../../../../Assests/images/nofood1.png")}
          />
        </View>
        <Text
          style={[
            styles.slotText,
            { display: modalType == "addOn" ? "flex" : "none" },
          ]}
        >
          {"Slot " + item}
        </Text>
      </View>
    );
  };

  const foodItemRenderer = ({ item, index }) => {
    return (
      <FoodItem
        item={item}
        index={index}
        activeTab={activeTab}
        onItemPress={onItemPress}
        editOnPress={onEditPress}
      />
    );
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

        <View
          style={{
            flex: 1,
          }}
        >
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
              // data={activeTab == 0 ? foodList : addOnList}
              data={activeTab == 0 ? allFoods : allFoods}
              renderItem={foodItemRenderer}
              keyExtractor={(item, index) => index}
              key={({ item }) => item.foodId}
              style={styles.foodFlatList}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.foodFlatList}
              ListEmptyComponent={
                <Text style={styles.noItemsIndicatorText}>
                  No Foods To Show
                </Text>
              }
            />
          </View>

          {/* Floating Bottom Buttons */}
          <View style={styles.bottomButtonsView}>
            <TouchableOpacity style={styles.bottomButton}>
              <MatIcons name="pencil" size={21} color={colors.black} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.bottomButton}
              onPress={onFloatingAddPress}
            >
              <Entypo name="plus" size={24} color={colors.black} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.bottomButton}>
              <MatIcons
                name="trash-can-outline"
                size={21}
                color={colors.black}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Add Food Modal */}
      <Modal
        visible={showFoodModal.length != 0 ? true : false}
        animationType="slide"
        transparent={true}
      >
        <TouchableOpacity
          style={styles.modalParent}
          activeOpacity={1}
          onPress={() => setShowFoodModal("")}
        >
          <TouchableOpacity style={styles.modalContent} activeOpacity={1}>
            <View style={styles.modalWholeView}>
              <Text style={styles.modalTopicText}>{foodModalTitle}</Text>

              <View style={styles.addFoodListView}>
                <FlatList
                  data={[1, 2, 3, 4, 5]}
                  renderItem={renderAddFoodInModal}
                  keyExtractor={(itm, ind) => ind}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                />
              </View>

              <TextInput
                style={styles.modalInputs}
                placeholder={"Food name"}
                placeholderTextColor={colors.grey}
                keyboardType={"ascii-capable"}
                underlineColorAndroid={colors.transparent}
                selectionColor={colors.baseBackground}
                textContentType="emailAddress"
                autoCapitalize="none"
                autoCorrect={false}
                autoCompleteType="email"
                onChangeText={setFoodName}
                value={foodName}
              />
              <TextInput
                style={styles.modalInputs}
                placeholder={"Price"}
                placeholderTextColor={colors.grey}
                keyboardType={"ascii-capable"}
                underlineColorAndroid={colors.transparent}
                selectionColor={colors.baseBackground}
                textContentType="emailAddress"
                autoCapitalize="none"
                autoCorrect={false}
                autoCompleteType="email"
                onChangeText={setPrice}
                value={price}
              />
              <TextInput
                style={styles.modalInputs}
                placeholder={"Quantity"}
                placeholderTextColor={colors.grey}
                keyboardType={"ascii-capable"}
                underlineColorAndroid={colors.transparent}
                selectionColor={colors.baseBackground}
                textContentType="emailAddress"
                autoCapitalize="none"
                autoCorrect={false}
                autoCompleteType="email"
                onChangeText={setQuantity}
                value={quantity}
              />
              <TextInput
                style={styles.modalInputs}
                placeholder={"Veg or Non-veg"}
                placeholderTextColor={colors.grey}
                keyboardType={"ascii-capable"}
                underlineColorAndroid={colors.transparent}
                selectionColor={colors.baseBackground}
                textContentType="emailAddress"
                autoCapitalize="none"
                autoCorrect={false}
                autoCompleteType="email"
                onChangeText={setFoodType}
                value={foodType}
              />
              <TextInput
                style={styles.modalInputs}
                placeholder={"Description"}
                placeholderTextColor={colors.grey}
                keyboardType={"ascii-capable"}
                underlineColorAndroid={colors.transparent}
                selectionColor={colors.baseBackground}
                textContentType="emailAddress"
                autoCapitalize="none"
                autoCorrect={false}
                autoCompleteType="email"
                onChangeText={setDesc}
                value={description}
              />

              <View style={styles.modalBottomButtonsView}>
                <TouchableOpacity
                  style={styles.modalBottomButtons}
                  onPress={modalCloseOnPress}
                >
                  <LinearGradient
                    colors={[colors.buttonGreen, colors.activeGreen]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.modalButtonGradient}
                  >
                    <Text style={styles.modalButtontext}>Close</Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.modalBottomButtons}
                  onPress={onCreateMenuSave}
                >
                  <LinearGradient
                    colors={[colors.buttonGreen, colors.activeGreen]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.modalButtonGradient}
                  >
                    <Text style={styles.modalButtontext}>Save</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    height: height,
  },
  screenContent: {
    flex: 1,
    width: "90%",
    alignSelf: "center",
    marginTop: 15,
    // borderWidth: 1,
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
    height: "87%",
  },
  foodFlatList: {
    paddingBottom: 160,
  },
  noItemsIndicatorText: {
    alignSelf: "center",
    fontFamily: textFontFaceLight,
    fontSize: 13,
  },
  bottomButtonsView: {
    position: "absolute",
    bottom: height * 0.06,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.greyF1,
    borderRadius: 40,
    width: width * 0.2,
  },
  bottomButton: {
    borderWidth: 1,
    height: 32,
    width: 32,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
    marginVertical: 5,
  },
  modalParent: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: colors.transparentGrey,
  },
  modalContent: {
    height: "75%",
    width: "85%",
    backgroundColor: colors.white,
    borderRadius: 15,
    borderWidth: 1,
  },
  modalWholeView: {
    flex: 1,
    margin: 15,
    alignItems: "center",
    justifyContent: "space-around",
  },
  modalTopicText: {
    color: colors.activeGreen,
    fontFamily: textFontFaceMedium,
    fontSize: 23,
    alignSelf: "center",
  },
  addFoodListView: {
    height: "18%",
    width: "90%",
    marginVertical: 10,
    alignItems: "center",
  },
  addFoodItemParent: {
    justifyContent: "center",
    backgroundColor: colors.white,
    marginVertical: 8,
    marginHorizontal: 5,
    alignItems: "center",
  },
  itemImageView: {
    elevation: 7,
    shadowColor: colors.black,
    shadowOpacity: 1,
    backgroundColor: colors.white,
    height: 77,
    width: 77,
    borderRadius: 40,
    padding: 0.3,
    marginHorizontal: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  foodItemImage: {
    height: 110,
    width: 110,
    borderRadius: 60,
    resizeMode: "center",
  },
  slotText: {
    fontFamily: textFontFaceLight,
    marginVertical: 2,
  },
  modalInputs: {
    backgroundColor: colors.inputGrey,
    color: colors.black,
    paddingVertical: 10,
    borderRadius: 5,
    fontFamily: textFontFaceLight,
    paddingStart: 10,
    width: "80%",
    marginVertical: 12,
  },
  modalBottomButtonsView: {
    width: "80%",
    flexDirection: "row",
    marginTop: 15,
  },
  modalBottomButtons: {
    flex: 1,
    marginHorizontal: 10,
  },
  modalButtonGradient: {
    borderRadius: 156,
    marginVertical: 10,
    paddingVertical: 8,
  },
  modalButtontext: {
    color: colors.white,
    alignSelf: "center",
    paddingBottom: 2,
  },
});

export default FoodMenu;
