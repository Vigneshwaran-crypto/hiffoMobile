import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { useSelector } from "react-redux";
import { colors } from "../../common/colors";
import { TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/Feather";

import {
  fontsSize,
  textFontFaceLight,
  textFontFaceMedium,
} from "../../common/styles";
import { calenderDateFormat, GetDateFormat, LOG } from "../../common/util";
import RBSheet from "react-native-raw-bottom-sheet";
import CalendarPicker from "react-native-calendar-picker";
import moment from "moment";
const win = Dimensions.get("window");

const SFDatePicker = (props) => {
  const RBsheetDatePickerRef = useRef();

  const [selectedDate, setSelectedDate] = useState("");
  const userTheme = useSelector(({ api }) => api.getTheme);

  const isViewFarm = props.type == "View Farm" ? true : false;

  const handleDateofBirth = (value) => {
    props.callBack(value, props.item);
    setSelectedDate(GetDateFormat(value));
  };

  useEffect(() => {
    LOG("props value in date picker :", props);
    LOG("props anser in date picker :", props.item.answer);
    LOG("props.item.questionType", props.item);
    LOG("IS VIEW ", isViewFarm);

    if (props.type == "View Farm") {
      setSelectedDate(GetDateFormat(props.item.answer));
    } else if (props.type == "Update Farm") {
      LOG("SFDATE picker asner sat :", props.item.answer);
      const valiDate = moment(props.item.answer).format("DD/MM/YYYY"); // 5/19/2023

      if (props.item.answer) {
        setSelectedDate(valiDate);
      } else {
        setSelectedDate(props.item.answer);
      }

      LOG("changed date :", valiDate);
    }
  }, [props.item.answer]);
  return (
    <View
      style={{
        borderRadius: 10,
        marginVertical: 10,
      }}
    >
      <Text
        style={[
          styles.questionText,
          {
            display: props.item.hide ? "none" : "flex",
            color: userTheme ? colors.white : colors.black,
          },
        ]}
      >
        {props.item.question}
      </Text>
      <TextInput
        value={selectedDate}
        placeholder={"Please Choose " + props.item.question}
        placeholderTextColor={userTheme ? colors.white : colors.black}
        style={styles.searchText}
        editable={false}
        theme={{ colors: { text: userTheme ? colors.white : colors.black } }}
        underlineColor={colors.transparent}
        right={
          <TextInput.Icon
            onPress={() => {
              RBsheetDatePickerRef.current.open();
            }}
            name={() => (
              <Icon name={"calendar"} color={colors.postTextColor} size={20} />
            )}
          />
        }
      />
      <RBSheet
        closeOnDragDown={false}
        customStyles={{
          container: styles.bottomSheetConatiner,
        }}
        ref={RBsheetDatePickerRef}
      >
        <View style={styles.bottomBaseBackground}>
          <Text style={styles.headtextStyle}>
            {"Select " + props.item.question}
          </Text>

          <CalendarPicker
            minDate={calenderDateFormat(new Date())}
            style={{ borderRadius: 10 }}
            todayBackgroundColor={colors.red}
            onDateChange={(date) => {
              handleDateofBirth(date);
              RBsheetDatePickerRef.current.close();
            }}
          />
        </View>
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomSheetConatiner: {
    height: "50%",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: colors.white,
  },
  headtextStyle: {
    fontFamily: textFontFaceMedium,
    color: colors.black29,
    paddingBottom: 5,
    paddingHorizontal: 5,
    fontSize: fontsSize.username,
    textAlign: "center",
  },
  bottomBaseBackground: {
    justifyContent: "center",
    flex: 1,
  },
  searchText: {
    backgroundColor: colors.transparent,
    fontFamily: textFontFaceMedium,
    fontSize: fontsSize.smallText,
    borderRadius: 10,
    borderColor: colors.baseBackground,
    borderWidth: 1,
  },
  questionText: {
    marginTop: 10,
    marginVertical: 5,
    fontFamily: textFontFaceLight,
  },
});

export default SFDatePicker;
