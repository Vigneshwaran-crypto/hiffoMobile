import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { colors } from "./colors";
import { textFontFace, textFontFaceLight, textFontFaceMedium } from "./styles";
import { LOG } from "./util";

const ChooseButton = (props) => {
  // LOG("props in choose button component", props.question);
  const [isClicked, setIsClicked] = useState(0);
  const userTheme = useSelector(({ api }) => api.getTheme);

  // Are provided toilets plumbed or portable?

  const isViewFarm =
    props.type == "View Farm" || props.type == "Update Farm" ? true : false;

  useEffect(() => {
    LOG("PROPS VALUE IN CHOOSE");
    LOG("PROPS VALUE OF CHOSENBUTTON ", isViewFarm);
    LOG("PROPS VALUE OF CHOSENBUTTON props.item", props.item);

    if (props.item.answer == "") {
      setIsClicked(0);
    }

    if (isViewFarm) {
      LOG("choose btn view form", props.item.question);

      LOG("choose btn view form", props.item.answer);
      LOG("choose btn view form", props.item.value);

      if (props.question == "Label Followed - Yes") {
        if (props.item.answer == "YES") {
          setIsClicked(1);
        } else {
          setIsClicked(2);
        }
      } else if (props.item.value) {
        if (props.item.value == "YES") {
          setIsClicked(1);
        } else {
          setIsClicked(2);
        }
      } else if (props.item.answer === "") {
        setIsClicked(0);
      } else {
        if (props.item.answer == "YES") {
          setIsClicked(1);
        } else {
          setIsClicked(2);
        }
      }
    } else if (props.type == "Edit Farm") {
      if (props.item.answer == "YES") {
        setIsClicked(1);
      } else {
        setIsClicked(2);
      }
    } else if (props.item.answer == "") {
      setIsClicked(0);
    } else {
      setIsClicked(0);
    }
  }, []);

  useEffect(() => {
    LOG("choose btn view form", props.item.answer);
    LOG("choose btn view form", props.type);
  }, [props.type]);

  useEffect(() => {
    if (props.type == "Update Farm") {
      if (props.item.answer == "YES") {
        setIsClicked(1);
      } else {
        setIsClicked(2);
      }
    }

    if (props.item.answer == "") {
      setIsClicked(0);
    }
  }, [props.item]);

  const yesOnPress = () => {
    LOG("YES PRESSED");
    setIsClicked(1);
    props.callBack("YES", props.item);
    LOG("yes click value :", isClicked);
  };

  const noOnPress = () => {
    LOG("NO PRESSED");
    setIsClicked(2);
    props.callBack("NO", props.item);
  };
  return (
    <View style={styles.buttonView}>
      <Text
        style={[
          styles.questionText,
          { color: userTheme ? colors.white : colors.black },
        ]}
      >
        {props.question}
      </Text>
      <View
        style={{ flexDirection: "row" }}
        pointerEvents={props.type == "View Farm" ? "none" : "auto"}
      >
        <TouchableOpacity
          style={[
            styles.yesButton,
            {
              backgroundColor:
                isClicked == 1 ? colors.baseBackground : colors.transparent,
            },
          ]}
          activeOpacity={1}
          // onPress={yesOnPress}
          onPress={yesOnPress}
        >
          <Text
            style={{
              color: userTheme
                ? isClicked
                  ? colors.white
                  : colors.tanGrey
                : isClicked == 1
                ? colors.white
                : colors.tanGrey,
            }}
          >
            Yes
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.noButton,
            {
              backgroundColor:
                isClicked == 2 ? colors.baseBackground : colors.transparent,
            },
          ]}
          activeOpacity={1}
          onPress={noOnPress}
        >
          <Text
            style={{
              color: userTheme
                ? isClicked
                  ? colors.white
                  : colors.tanGrey
                : isClicked == 2
                ? colors.white
                : colors.tanGrey,
            }}
          >
            No
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  questionText: {
    marginTop: 10,
    marginVertical: 5,
    marginBottom: 10,
    fontFamily: textFontFaceLight,
  },
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  buttonView: {
    marginVertical: 10,
  },
  yesButton: {
    borderWidth: 1,
    borderColor: colors.borderGrey,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  noButton: {
    borderWidth: 1,
    borderColor: colors.borderGrey,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 22,
    marginHorizontal: 20,
  },
});

export default ChooseButton;
