import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Header from "../../../common/Header";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { colors } from "../../../common/colors";
import { LOG, addFoodItems } from "../../../common/util";
import CarouselFoodItem from "./CarouselFoodItem";
import {
  textFontFace,
  textFontFaceLight,
  textFontFaceMedium,
  textFontFaceSemiBold,
} from "../../../common/styles";
import MatIcon from "react-native-vector-icons/FontAwesome";
import MatIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import EnTypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import { useDispatch, useSelector } from "react-redux";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import {
  addOnAvailabilityStatus,
  deleteAddOn,
  deleteMenu,
  editAddOn,
  editMenu,
  foodAvailabilityStatus,
  viewFoodAddOn,
} from "../../../redux/Api-Action";
import { AirbnbRating, Rating } from "react-native-ratings";
const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = SLIDER_WIDTH;

const { height, width } = Dimensions.get("window");

const ViewSingleFood = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const food = props.route.params.item;
  const activeTab = props.route.params.activeTab;
  const category = props.route.params.category;

  const hotelDetails = useSelector(({ auth }) => auth.hotelDetails);
  const allAddOns = useSelector(({ api }) => api.allAddOns);

  const [foodItemAddOn, setFoodItemAddOn] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const tipCarouselRef = useRef();

  const ratingList = useState([]);

  const [foodName, setFoodName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [foodType, setFoodType] = useState("");
  const [description, setDesc] = useState("");
  const [showFoodModal, setShowFoodModal] = useState("");
  const [modalType, setModalType] = useState("");

  let foodId = useRef(0);

  const foodModalTitle = activeTab === 0 ? "Edit Food" : "Edit AddOn";

  useEffect(() => {
    LOG("food item in View SingleFood :", food);

    LOG("all add on list in view single food :", allAddOns);

    let foodAddOnList = [];

    for (let i = 1; i <= 10; i++) {
      const foodAddOn = food[`addon${i}`];
      if (foodAddOn && foodAddOn !== "0") {
        foodAddOnList.push(parseInt(foodAddOn));
      }
    }
    LOG("foodAddOnList :", foodAddOnList);

    if (foodAddOnList.length != 0) {
      const foodAddOn = foodAddOnList.map((fAddOn) => {
        const allAddOn = allAddOns.find((allAdd) => fAddOn === allAdd.addonsId);
        if (allAddOn && allAddOn !== undefined) {
          return allAddOn;
        }
      });

      console.log("matcehd all addOns :", foodAddOn);

      setFoodItemAddOn(foodAddOn);
    }

    let tempRateList = [];

    for (let i = 0; i < food.ratings; i++) {
      tempRateList.push(i);
    }

    ratingList.concat(tempRateList);
  }, []);

  const onEditPress = () => {
    LOG("editOnPress view Food :", food);
    if (activeTab == 0) {
      setShowFoodModal("ef"); //edit food menu
      setFoodName(food.foodName);
      foodId.current = food.foodId;
    } else {
      setShowFoodModal("ea"); // edit add On
      setFoodName(food.addonsName);
      foodId.current = food.addonsId;
    }

    setPrice(food.rate);
    setQuantity(food.unit);
    setFoodType(food.cType);
    setDesc(food.description);
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
    } else if (activeTab == 0 && !description) {
      Toast("Please enter description");
    } else {
      if (activeTab == 0) {
        // Edit Food Item
        const req = {
          hid: hotelDetails.hotelId,
          foodId: foodId.current,
          category: category,
          foodName: foodName,
          unit: quantity,
          rate: price,
          description: description,
          displayTime: "",
          cType: foodType,
          token: hotelDetails.token,
        };
        dispatch(editMenu(req));
      } else {
        // Edit addOn Item
        const req = {
          hid: hotelDetails.hotelId,
          // category: categoryFocus.value.toLocaleLowerCase(),
          addonsName: foodName,
          unit: quantity,
          rate: price,
          cType: foodType,
          token: hotelDetails.token,
          addonsId: foodId.current,
        };
        dispatch(editAddOn(req));
      }
    }

    setShowFoodModal(""); // for closing the modal after done operation
  };

  const modalCloseOnPress = () => {
    setShowFoodModal("");
  };

  const onLinkPress = () => {
    // navigation.navigate("linkAddOn", { item: item, from: "add" });

    const req = {
      token: hotelDetails.token,
      hid: hotelDetails.hotelId,
      foodId: food.foodId,
    };

    dispatch(viewFoodAddOn(req, { ...food, from: "link" }));
  };

  const itemDeleteOnPress = (itm) => {
    LOG("item gonna be deleted clicked :");

    Alert.alert(
      null,
      `Delete This ${activeTab == 0 ? "Food" : "AddOn"} Item ?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Ok",
          style: "destructive",
          onPress: () => {
            if (activeTab == 0) {
              const req = {
                hid: hotelDetails.hotelId,
                token: hotelDetails.token,
                foodId: food.foodId,
              };

              const extra = {
                cat: food.category,
                id: food.foodId,
              };

              dispatch(deleteMenu(req, extra));
            } else {
              const req = {
                hid: hotelDetails.hotelId,
                token: hotelDetails.token,
                addonsId: food.addonsId,
              };
              dispatch(deleteAddOn(req));
            }
          },
        },
      ]
    );
  };

  const onAvailabilityPress = (val) => {
    LOG("pressing values :", val);

    // hid=&token=&addonsId=&availability=

    let req = {
      hid: hotelDetails.hotelId,
      token: hotelDetails.token,
      availability: val,
    };

    if (activeTab === 0) {
      req.foodId = food.foodId;
      dispatch(foodAvailabilityStatus(req));
    } else {
      req.addonsId = food.addonsId;
      // req.cType = food.cType;
      // req.rate = food.rate;
      // req.unit = food.unit;

      dispatch(addOnAvailabilityStatus(req));
    }
  };

  const foodImageRender = ({ item, index }) => {
    return <CarouselFoodItem index={index} item={item} />;
  };

  const renderAddOn = ({ item, index }) => (
    <View style={styles.addOnItem}>
      <View style={styles.itemImage}></View>

      <Text style={styles.addOnName} numberOfLines={1} adjustsFontSizeToFit>
        {item.addonsName}
      </Text>

      <Text style={styles.itemPriceText}>
        <MatIcon
          name="rupee"
          size={SLIDER_WIDTH * 0.023}
          color={colors.activeGreen}
        />
        {item.rate}
      </Text>
    </View>
  );

  // Modal list item
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

  return (
    <View style={styles.container}>
      <Header title={activeTab === 0 ? "Food Item" : "AddOn Item"} />

      <View style={styles.carouselView}>
        <Carousel
          scrollAnimationDuration={1}
          data={addFoodItems}
          renderItem={foodImageRender}
          itemWidth={ITEM_WIDTH / 1.15}
          sliderWidth={SLIDER_WIDTH / 1.15}
          ref={tipCarouselRef}
          layout={"default"}
          useScrollView={true}
          contentContainerCustomStyle={{
            // borderWidth: 1,
            borderRadius: 10,
          }}
          // style={{ borderRadius: 10 }}
          containerCustomStyle={styles.carouselStyle}
          onScrollIndexChanged={(ind) => setCurrentIndex(ind)}
          // onScrollIndexChanged={(ind) => LOG("current index :", ind)}
          pagingEnabled={true}
          autoplay={true}
          disableIntervalMomentum={true}
        />

        <Pagination
          dotsLength={addFoodItems.length}
          activeDotIndex={currentIndex}
          dotStyle={styles.activeDotStyle}
          inactiveDotScale={0.8}
          dotColor={colors.blue}
          inactiveDotColor={colors.grey}
          containerStyle={styles.paginationStyle}
        />
      </View>

      <ScrollView nestedScrollEnabled={true} style={{ flex: 2 }}>
        <View style={styles.foodItemContent}>
          <View style={styles.foodRateView}>
            <Text
              style={styles.foodName}
              adjustsFontSizeToFit
              numberOfLines={1}
            >
              {activeTab === 0 ? food.foodName : food.addonsName}
            </Text>

            <View style={styles.ratingView}>
              {/* {ratingList.map((itm) => (
                <AntDesign
                  key={itm}
                  name="star"
                  color={colors.gold}
                  size={20}
                />
              ))} */}

              <Rating
                style={{ display: activeTab === 0 ? "flex" : "none" }}
                ratingCount={5}
                // readonly
                startingValue={food?.ratings?.toString()}
                fractions={"10"}
                imageSize={30}
                jumpValue={0.5}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              flex: 1,
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.priceText}>
              <MatIcon
                name="rupee"
                size={SLIDER_WIDTH * 0.04}
                color={colors.activeGreen}
              />

              {food.rate}
            </Text>

            <MatIcons
              name="square-circle"
              size={SLIDER_WIDTH * 0.06}
              color={food.cType === "veg" ? colors.activeGreen : colors.red}
            />
          </View>

          {/* Copied code start */}

          <View style={styles.addFoodQuantityView}>
            <TouchableOpacity
              style={styles.itemAddButton}
              onPress={onAvailabilityPress.bind(this, "A")}
            >
              <LinearGradient
                colors={[colors.subTextColor, colors.tanGrey]}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 0 }}
                style={styles.addGradient}
              >
                <Text
                  style={styles.itemButtonsText}
                  adjustsFontSizeToFit={true}
                  numberOfLines={1}
                >
                  Show
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.itemAddButton, { marginHorizontal: 10 }]}
              onPress={onAvailabilityPress.bind(this, "H")}
            >
              <LinearGradient
                colors={[colors.buttonGreen, colors.activeGreen]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.addGradient}
              >
                <Text
                  style={styles.itemButtonsText}
                  adjustsFontSizeToFit={true}
                  numberOfLines={1}
                >
                  Hide
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.itemAddButton,
                { display: activeTab == 0 ? "flex" : "none" },
              ]}
              onPress={onAvailabilityPress.bind(this, "RS")}
            >
              <LinearGradient
                colors={[colors.subTextColor, colors.tanGrey]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.addGradient}
              >
                <Text
                  adjustsFontSizeToFit={true}
                  numberOfLines={1}
                  style={styles.itemButtonsText}
                >
                  Restock
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <View style={styles.roundButtonsView}>
            <TouchableOpacity
              style={styles.itemRoundButton}
              onPress={onEditPress}
            >
              <MatIcons
                name="pencil"
                size={width * 0.035}
                color={colors.white}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.itemRoundButton,
                {
                  display: activeTab === 0 ? "flex" : "none",
                },
              ]}
              onPress={onLinkPress}
            >
              <EnTypo name="link" size={0.032 * width} color={colors.mildBg} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.itemRoundButton}
              onPress={itemDeleteOnPress}
            >
              <Feather
                name="trash-2"
                size={0.032 * width}
                color={colors.mildBg}
              />
            </TouchableOpacity>
          </View>

          {/* copied code ended */}

          <Text style={styles.descText}>{food.description}</Text>

          <Text
            style={[
              styles.addOnTitle,
              { display: activeTab === 0 ? "flex" : "none" },
            ]}
          >
            AddOn List
          </Text>
          <View
            style={[
              styles.addOnListView,
              { display: activeTab === 0 ? "flex" : "none" },
            ]}
          >
            <FlatList
              data={foodItemAddOn}
              key={(item, ind) => ind}
              renderItem={renderAddOn}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </ScrollView>

      {/* Add Food Modal */}
      <Modal
        visible={showFoodModal.length != 0 ? true : false}
        animationType="slide"
        transparent={true}
        statusBarTranslucent={true}
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
                style={[
                  styles.modalInputs,
                  {
                    display:
                      showFoodModal == "af" || showFoodModal == "ef"
                        ? "flex"
                        : "none",
                  },
                ]}
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
  },
  carouselView: {
    flex: 0.8,
    alignItems: "center",
    justifyContent: "center",
    // borderWidth: 1,
  },
  carouselStyle: {
    alignSelf: "center",
    // borderWidth: 1,
    borderRadius: 10,
    flex: 1,
  },
  activeDotStyle: {
    height: 10,
    width: 10,
    borderRadius: 10,
    backgroundColor: colors.black,
  },

  foodItemContent: {
    flex: 1.5,
    // borderWidth: 1,
    width: ITEM_WIDTH / 1.15,
    alignSelf: "center",
  },

  foodRateView: {
    flexDirection: "row",
    // borderWidth: 1,
  },

  foodName: {
    fontFamily: textFontFace,
    color: colors.black,
    fontSize: SLIDER_WIDTH * 0.05,
    flex: 1,
  },

  ratingView: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // borderWidth: 1,
  },
  priceText: {
    marginVertical: 8,
    fontFamily: textFontFaceMedium,
    color: colors.buttonGreen,
    fontSize: SLIDER_WIDTH * 0.045,
  },

  descText: {
    fontFamily: textFontFaceLight,
    color: colors.darkBlue,
    textAlign: "center",
    marginHorizontal: 10,
    marginBottom: 10,
    marginTop: 15,
  },
  addOnTitle: {
    fontFamily: textFontFaceMedium,
    color: colors.black,
    fontSize: SLIDER_WIDTH * 0.025,
    marginVertical: 7,
  },
  addOnListView: {
    flex: 1,
    // borderWidth: 1,
  },
  addOnItem: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: colors.mildBg,
    borderColor: colors.itemBorderGrey,
    flexDirection: "row",
    alignItems: "center",
  },

  itemImage: {
    height: width * 0.1,
    width: width * 0.1,
    borderRadius: width * 0.05,
    zIndex: 2,
    elevation: 2,
    shadowColor: colors.black,
    // borderWidth: 1,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.black,
  },
  addOnName: {
    marginVertical: 8,
    fontFamily: textFontFaceMedium,
    color: colors.vantaBlack,
    fontSize: SLIDER_WIDTH * 0.022,
    marginHorizontal: 10,
    // borderWidth: 1,
    flex: 1,
  },
  itemPriceText: {
    // borderWidth: 1,
    flex: 0.3,
    textAlign: "center",
    fontFamily: textFontFaceMedium,
    color: colors.buttonGreen,
    fontSize: SLIDER_WIDTH * 0.023,
  },
  addFoodQuantityView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // borderWidth: 1,
    // flex: 1,
    // marginVertical: 10,
    // marginBottom: 15,
  },
  itemAddButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    elevation: 15,
    backgroundColor: colors.transparent,
    shadowColor: colors.grey,
    shadowOpacity: 3,
    shadowOffset: { height: 2, width: 2 },
    // borderWidth: 1,
    flex: 1,
    // marginHorizontal: 6,
  },

  roundButtonsView: {
    // borderWidth: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    // marginBottom: 10,
    marginVertical: 10,
    marginTop: 15,
  },

  addGradient: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    width: "100%",
  },
  plusText: {
    fontFamily: textFontFaceSemiBold,
    fontSize: 15,
  },
  itemButtonsText: {
    marginVertical: 5,
    marginHorizontal: 5,
    fontFamily: textFontFaceLight,
    color: colors.mildBg,
    // fontSize: 11,
    fontSize: 0.023 * width,
    // borderWidth: 1,
    // fontSize: liquidFont(5),
  },
  itemRoundButton: {
    alignItems: "center",
    justifyContent: "center",
    // marginEnd: 10,
    backgroundColor: colors.subTextColor,
    // marginHorizontal: 5,
    height: 0.055 * width,
    width: 0.055 * width,
    borderRadius: 0.027 * width,
    marginHorizontal: 10,
  },

  // pasted
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
});

export default ViewSingleFood;
