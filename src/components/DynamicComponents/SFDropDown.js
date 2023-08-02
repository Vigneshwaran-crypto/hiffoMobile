import React, { useState } from "react";
import { useEffect } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { useSelector } from "react-redux";
import { colors } from "../../common/colors";
import { textFontFaceLight, textFontFaceMedium } from "../../common/styles";
import { LOG } from "../../common/util";
const win = Dimensions.get("window");

const SFDropDown = (props) => {
  const userTheme = useSelector(({ api }) => api.getTheme);
  const allFormsData = useSelector(({ api }) => api.getAllFormData);

  const [chosen, setChosen] = useState();
  const [dropDownDatas, setDropDownData] = useState([]);

  const [selectedAnswer, setSeletedAns] = useState("");
  const dropDownOptions = props.item.options;

  useEffect(() => {
    if (props.type == "View Farm") {
      LOG("HELLO THIS IS VIEW FARM");
      // const chosenVal = { label: props.item.answer, value: 1 };
      // setChosen(chosenVal);
    } else {
      LOG("HELLO THIS IS ADD FARM", dropDownOptions);

      var dropDownData = [];

      if (dropDownOptions && dropDownOptions.length != 0) {
        for (let i = 0; i < dropDownOptions.length; i++) {
          var optionNames = dropDownOptions[i].optionValue;
          var optionId = dropDownOptions[i].id;

          dropDownData.push({ label: optionNames, value: optionId });
          if (optionId == props.item.answer) {
            const chosenVal = { label: optionNames, value: optionId };
            setChosen(chosenVal);
            setSeletedAns(optionNames);
          }
        }
        LOG("Formatted drop down data :", dropDownOptions);
        LOG("Formatted dropdown dataaaaaa ", dropDownData);
        setDropDownData(dropDownData);
      } else {
        LOG("DROP DOWN ITEM NULL ", dropDownOptions);
      }
    }
  }, [allFormsData]);

  useEffect(() => {
    LOG("PROPS VALUE OF SFDROPDOWN :", props);
    LOG("IS PROPER DROPDOWN DATA :", dropDownDatas);
  }, []);

  const onAnswerChange = (value) => {
    LOG("chosen dropdown value in sfDrp ", value);
    setChosen(value);

    props.callBack(value.value, props.item, value.label);
  };

  // const dropDownChange = (value) => {
  //   LOG("DROP DOWN CHANge IN DRPDWN ", value);
  //   setChosen(value);
  //   props.callBack({ label: value.label, value: props.question });
  // };

  return (
    <View style={[styles.constainer, props.style ? props.style : ""]}>
      <Text style={styles.questionText(userTheme)}>{props.question}</Text>
      <Dropdown
        style={styles.dropdownStyle}
        selectedTextStyle={styles.selectedTextStyle(userTheme)}
        placeholder={props.type == "Update Farm" ? selectedAnswer : "choose"}
        placeholderStyle={styles.placeholderTextStyle(userTheme)}
        placeholderTextColor={colors.black}
        data={dropDownDatas ? dropDownDatas : []}
        labelField={"label"}
        valueField={"value"}
        onChange={onAnswerChange}
        value={chosen}
        iconColor={userTheme ? colors.white : colors.black}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  questionText: (userTheme) => ({
    color: userTheme ? colors.white : colors.grey,
    marginTop: 10,
    marginVertical: 5,
    fontFamily: textFontFaceLight,
    marginTop: 20,
  }),
  constainer: {
    borderRadius: 10,
    marginTop: 10,
  },
  dropdownStyle: {
    borderWidth: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.baseBackground,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  selectedTextStyle: (userTheme) => ({
    color: userTheme ? colors.white : colors.black,
    fontFamily: textFontFaceMedium,
  }),
  placeholderTextStyle: (userTheme) => ({
    color: userTheme ? colors.white : colors.black,
    fontFamily: textFontFaceMedium,
  }),
});

export default SFDropDown;
