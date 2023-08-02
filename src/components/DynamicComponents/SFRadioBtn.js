import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { RadioButton } from "react-native-paper";
import { colors } from "../../common/colors";
import {
  fontsSize,
  textFontFaceMedium,
  textInputTheme,
} from "../../common/styles";
import { LOG } from "../../common/util";
const SFRadioBtn = (props) => {
  const [status, setStatus] = useState("");

  useEffect(() => {
    LOG("props.item.questionType", props.item);
  }, []);
  return (
    <View
      style={{
        flex: 1,
        margin: 20,
        backgroundColor: colors.lightgrey,
        padding: 10,
        borderRadius: 10,
      }}
    >
      <Text
        style={{
          fontFamily: textFontFaceMedium,
          fontSize: fontsSize.size14,
        }}
      >
        {props.item.question}
      </Text>
      <RadioButton.Group
        theme={textInputTheme}
        onValueChange={(value) => {
          if (value != null) {
            setStatus(value);
          }
        }}
        value={status}
      >
        {props.item.options.map((item, key) => {
          return (
            <View key={key}>
              <RadioButton.Item
                color={colors.baseSecondary}
                label={item.optionName}
                value={item.optionValue}
                labelStyle={styles.RadioText}
              />
            </View>
          );
        })}
      </RadioButton.Group>
    </View>
  );
};

const styles = StyleSheet.create({
  RadioText: {
    fontFamily: textFontFaceMedium,
    fontSize: fontsSize.size13,
    color: colors.black29,
  },
  searchText: {
    fontFamily: textFontFaceMedium,
    fontSize: fontsSize.smallText,
    alignSelf: "flex-start",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.baseBackground,
    padding: 10,
    marginVertical: 10,
    flex: 1,
  },
});

export default SFRadioBtn;
