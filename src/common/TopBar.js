import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { colors } from "./colors";
import Feather from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { textFontFaceMedium } from "./styles";
import { LOG } from "./util";

const TopBar = (props) => {
  const title = props.title;
  const navigation = useNavigation();
  const userTheme = useSelector(({ api }) => api.getTheme);

  var titleLen = title.length;
  var trimedTitle = title.slice(0, 20) + "...";

  useEffect(() => {
    LOG("Title in top bar", title);
    LOG("title length in topBar", titleLen);
    LOG("trimed title in topbat", trimedTitle);
  }, []);

  const backArrowOnPress = () => {
    navigation.goBack();
  };

  const addOnPress = (value) => {
    // if (title == "Harvest Dates" || title == "Define Blocks") {
    //   navigation.navigate("AddHarvestType", { title: title });
    // } else if (title == "Picking, Packing Shipping Record") {
    //   navigation.navigate("EntryFormsAddFarm", {
    //     title: value.title,
    //     index: 1,
    //   });
    // } else if (title == "Washroom cleaning(Plumbed)") {
    //   navigation.navigate("EntryFormsAddFarm", {
    //     title: value.title,
    //     index: 2,
    //   });
    // } else {
    //   navigation.navigate("formTypeAdd", {
    //     title: value.title,
    //     index: value.index,
    //   });
    // }

    props.addBtnCallBack(value);
  };

  const ended = (value) => {
    LOG("ended suuccessfully ", value);
    props.searchSubmit();
  };

  return (
    <View style={styles.container}>
      {/* <Header title={"Entry Forms"} /> */}

      <View style={styles.headerContent}>
        <TouchableOpacity style={styles.backButton} onPress={backArrowOnPress}>
          <Feather
            name="chevron-left"
            size={30}
            color={userTheme ? colors.white : colors.black}
          />
        </TouchableOpacity>

        <View style={styles.headingView}>
          <Text
            adjustsFontSizeToFit={true}
            style={[
              styles.headerText,
              { color: userTheme ? colors.white : colors.black },
            ]}
          >
            {titleLen < 20 ? title : trimedTitle}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.plusButton}
          onPress={() => addOnPress({ title: title })}
        >
          <Feather
            name="plus"
            size={28}
            color={userTheme ? colors.white : colors.black}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.searchView}>
        <Feather
          name="search"
          size={23}
          color={userTheme ? colors.white : colors.black}
        />
        <TextInput
          placeholder="Search"
          style={styles.searchInput}
          placeholderTextColor={userTheme ? colors.greyC4 : colors.black}
          color={userTheme ? colors.white : colors.black}
          // onChange={props.searchText}
          onChangeText={props.searchText}
          onEndEditing={ended}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},

  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  backButton: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: colors.borderGrey,
  },
  plusButton: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: colors.borderGrey,
  },
  headingView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    color: colors.black,
    fontFamily: textFontFaceMedium,
    fontSize: 18,
  },
  searchView: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.borderGrey,
    paddingHorizontal: 15,
    marginTop: 10,
  },
  searchInput: {
    height: 40,
    flex: 1,
    paddingHorizontal: 5,
  },
});

export default TopBar;
