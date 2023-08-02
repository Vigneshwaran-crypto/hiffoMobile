import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { calenderDateFormat, LOG } from "../../common/util";
import { colors } from "../../common/colors";
import {
  fontsSize,
  textFontFaceLight,
  textFontFaceMedium,
} from "../../common/styles";
import { TextInput } from "react-native-paper";
import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import { set } from "react-native-reanimated";

const win = Dimensions.get("window");

const SFTimePicker = (props) => {
  const userTheme = useSelector(({ api }) => api.getTheme);
  const [isDatePicker, setIsDatePicker] = useState(false);
  const [isTimePicker, setIsTimePicker] = useState(false);

  const [dateAndTime, setDateAndTime] = useState({
    date: "Choose Date And Time",
    time: "",
  });

  useEffect(() => {
    LOG("fromDatePickerUpdate-----", props.type);

    if (props.type == "Update Farm") {
      LOG("fromDatePickerUpdate-----", props.type);
      LOG("props.answerUpdate-----", props.answer);

      if (props.answer) {
        setDateAndTime({
          date: props.answer.date,
          time: props.answer.time,
        });
      }
    }
    LOG("SFTimepicker component props :", props);
  }, []);

  const chosenDate = (value) => {
    LOG("Chosen date  in sftimepicker :", value);
    const formattedDate = calenderDateFormat(value);
    LOG("formatted date in SFTimepicker :", formattedDate);
    props.callBack(props.item, { date: formattedDate });

    setDateAndTime({ ...dateAndTime, date: formattedDate });

    setIsDatePicker(false);
  };

  const chosenTime = (value) => {
    LOG("chosen Time :", value);
    const formattedTime = moment(value).format("LT");
    LOG("formatted time in SFTimepicker :", formattedTime);

    props.callBack(props.item, { time: formattedTime });
    setDateAndTime({ ...dateAndTime, time: formattedTime });

    setIsTimePicker(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{props.item}</Text>

      <View style={styles.layout}>
        <View style={styles.contentTextView}>
          <Text style={styles.dateText}>
            {dateAndTime.date} {""} {dateAndTime.time}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.TimeIcons}
          onPress={() => {
            setIsDatePicker(true);
          }}
        >
          <Icon name={"calendar"} color={colors.postTextColor} size={20} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setIsTimePicker(true);
          }}
        >
          <Ionicons
            name={"time-outline"}
            color={colors.postTextColor}
            size={20}
          />
        </TouchableOpacity>
      </View>

      <DateTimePicker
        isVisible={isDatePicker}
        mode={"date"}
        onConfirm={chosenDate}
        onCancel={() => {
          setIsDatePicker(false);
        }}
      />

      <DateTimePicker
        isVisible={isTimePicker}
        mode={"time"}
        onConfirm={chosenTime}
        onCancel={() => {
          setIsTimePicker(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    marginVertical: 10,
  },
  layout: {
    flexDirection: "row",
    backgroundColor: colors.transparent,
    borderRadius: 10,
    borderColor: colors.baseBackground,
    borderWidth: 1,
    paddingVertical: 13,
    paddingHorizontal: 10,
  },
  questionText: {
    marginTop: 15,
    marginVertical: 5,
    fontFamily: textFontFaceLight,
  },
  contentTextView: {
    flex: 1,
  },
  dateText: {
    fontFamily: textFontFaceMedium,
    fontSize: fontsSize.smallText,
    color: colors.black,
  },
  TimeIcons: {
    marginHorizontal: 15,
  },
});

export default SFTimePicker;
