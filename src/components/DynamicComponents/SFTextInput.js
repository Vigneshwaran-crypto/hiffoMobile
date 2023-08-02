import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View, Dimensions } from "react-native";
import { useSelector } from "react-redux";
import { colors } from "../../common/colors";
import {
  fontsSize,
  textFontFaceLight,
  textFontFaceMedium,
} from "../../common/styles";
import { LOG } from "../../common/util";
const win = Dimensions.get("window");

const SFTextInput = (props) => {
  const [textinputValue, setTextinputValue] = useState("");
  const userTheme = useSelector(({ api }) => api.getTheme);

  const isViewFarm = props.type == "View Farm" ? true : false;

  const noMulti =
    props.item.question == "Truck ID" ||
    props.item.question == "Loader" ||
    props.item.question ==
      "Quanitity Harvested (t=Tote) (B = Bin) (P = packaging)"
      ? true
      : false;

  const onChangeTextInput = (value) => {
    props.callBack(value, props.item);
  };

  useEffect(() => {
    LOG("props.item.questionType", props.item);
    LOG("IS VIEW ", props.type);

    if (props.type == "View Farm") {
      setTextinputValue(props.item.answer);
    } else if (props.type == "Update Farm") {
      setTextinputValue(props.item.answer);
    } else if (props.type == "Edit Farm") {
      setTextinputValue(props.item.answer);
    }
  }, []);
  return (
    <View
      style={{
        flex: 1,
        borderRadius: 10,
        marginTop: 10,
      }}
    >
      <Text
        style={[
          styles.questionText,
          { color: userTheme ? colors.white : colors.black },
        ]}
      >
        {props.item.question}
      </Text>
      <TextInput
        multiline={noMulti ? false : true}
        value={textinputValue}
        placeholder={"Enter your answer"}
        placeholderTextColor={userTheme ? "white" : "black"}
        style={styles.searchText(userTheme)}
        editable={isViewFarm ? false : true}
        onChangeText={(text) => {
          setTextinputValue(text);
          onChangeTextInput(text);
        }}
        onEndEditing={(value) => {
          LOG("edting ended");
        }}
        returnKeyType="default"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchText: (userTheme) => ({
    fontFamily: textFontFaceMedium,
    fontSize: fontsSize.smallText,
    alignSelf: "flex-start",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.baseBackground,
    padding: 10,
    marginVertical: 10,
    width: win.width * 0.9 - 5,
    marginRight: 20,
    color: userTheme ? colors.white : colors.black,
  }),
  questionText: {
    marginTop: 10,
    marginVertical: 5,
    fontFamily: textFontFaceLight,
  },
});

export default SFTextInput;
