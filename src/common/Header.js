import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Dimensions,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { useDispatch, useSelector } from "react-redux";

import { colors } from "./colors";
import { textFontFaceMedium } from "./styles";
import { LOG } from "./util";

const win = Dimensions.get("window");

const Header = (props) => {
  const title = props.title;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userTheme = useSelector(({ api }) => api.getTheme);

  // var titleLen = title.length;
  // var trimedTitle = title.slice(0, 20) + "...";

  useEffect(() => {
    LOG("Title in header", title);
    // LOG("title length in header", titleLen);
    // LOG("trimed title in header", trimedTitle);
  }, []);

  const backArrowOnPress = () => {
    LOG("bak");
    navigation.goBack();
  };
  return (
    <View style={styles.headerContent}>
      <TouchableOpacity style={styles.backButton} onPress={backArrowOnPress}>
        <Feather
          name="chevron-left"
          size={31}
          color={userTheme ? colors.white : colors.black}
        />
      </TouchableOpacity>

      <View style={styles.headingView}>
        <Text
          adjustsFontSizeToFit={true}
          allowFontScaling={true}
          style={[
            styles.headerText,
            { color: userTheme ? colors.white : colors.black },
          ]}
        >
          {title}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContent: {
    flexDirection: "row",
    marginVertical: 20,
    alignItems: "center",
    marginHorizontal: 5,
  },
  backButton: {
    borderRadius: 50,
    marginVertical: 10,
    marginRight: 15,
  },
  headingView: {
    alignSelf: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  headerText: {
    color: colors.black,
    fontFamily: textFontFaceMedium,
    fontSize: 16,
    marginStart: -10,
    marginTop: 3,
  },
});

export default Header;
