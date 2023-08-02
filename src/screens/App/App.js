//Default Libraries
import React, { Component, useEffect, useState } from "react";
import { StatusBar, View } from "react-native";
import { colors } from "../../common/colors";

//User defined Libraries
import { StyleSheet } from "react-native";
import FlashMessage from "react-native-flash-message";
import { SafeAreaView } from "react-native-safe-area-context";
import { getItem, LOG } from "../../common/util";
import Route from "../../Router/Router";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../../redux/Api-Action";

//Global variable (scope=(This Screen)).
const Router = Route();

//Main class
const App = () => {
  const userTheme = useSelector(({ api }) => api.getTheme);
  const Dispatch = useDispatch();

  useEffect(() => {
    LOG("USERTHEME IN APP .JS", userTheme);

    getItem("themeState")
      .then((result) => {
        var parsed = JSON.parse(result);
        LOG("GET ITEM IN APP JS :" + parsed.theme);
        var vals = parsed.theme;
        Dispatch(setTheme(parsed.theme));
      })
      .catch((error) => {
        LOG("GET ITEM ERROR IN App.js", error);
      });
  }, []);

  useEffect(() => {
    LOG("PROPS VALUE IN APP.JS :", userTheme);
  }, []);

  useEffect(() => {
    LOG("===========================");
    LOG("    WELCOME TO My Agri-Comp");
    LOG("===========================");
  }, []);

  //Actual UI
  return (
    <SafeAreaView style={styles.container}>
      <View>
        {/* <StatusBar
            //animated={true}
             backgroundColor={colors.baseBackground}
            hidden={false}
            barStyle="light-content"
          /> */}
        {/* <StatusBar hidden /> 
          import { StatusBar } from 'react-native';
          StatusBar.setHidden(true);
          */}
        {/* <OfflineMonitor />   themeStatus={userTheme} */}
        <View style={{ height: "100%" }}>
          <Route themeStatus={userTheme ? true : false} />
        </View>
        <FlashMessage position={"top"} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.baseBackground,
  },
});

export default App;
