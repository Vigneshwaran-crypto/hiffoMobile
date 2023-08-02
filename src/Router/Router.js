import React, { useEffect, useState } from "react";
import {
  Alert,
  BackHandler,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Ionicon from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";

import { colors } from "../common/colors";
import { textFontFace, textFontFaceMedium } from "../common/styles";
import Application from "../screens/App/Application";
import Login from "../screens/Auth/login";
import ForgotPassword from "../screens/Auth/ForgotPassword";
import ResetPassword from "../screens/Auth/ResetPassword";
import VerifyOtp from "../screens/Auth/VerifyOtp";
import Intro from "../screens/Auth/Intro";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "../screens/HomeTab/Home/Home";
import Chat from "../screens/HomeTab/Chat";
import Profile from "../screens/HomeTab/Profile";

import { darkMode, getItem, LOG } from "../common/util";
import Ionicons from "react-native-vector-icons/Ionicons";
import Foundation from "react-native-vector-icons/Foundation";
import { navigationRef } from "./RootNavigation";

const Route = (props) => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  // var userTheme = props.themeStatus;
  LOG("PROPS VALUE IN ROUTER :", props);
  var userTheme = props != undefined && props != "" ? props.themeStatus : false;

  const HomeTab = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "home") {
              return (
                <View style={[styles.tabView]}>
                  <Foundation name="home" size={20} color={color} />
                  <Text style={[styles.tabLabel, (color = { color })]}>
                    Home
                  </Text>
                </View>
              );
            } else if (route.name === "chat") {
              return (
                <View style={[styles.tabView]}>
                  <Ionicon
                    name="chatbubble-ellipses-outline"
                    size={20}
                    color={color}
                  />
                  <Text style={[styles.tabLabel, (color = { color })]}>
                    Chat
                  </Text>
                </View>
              );
            } else if (route.name === "profile") {
              return (
                <View style={[styles.tabView]}>
                  <Feather name="user" size={20} color={color} />
                  <Text style={[styles.tabLabel, (color = { color })]}>
                    Profile
                  </Text>
                </View>
              );
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: colors.activeGreen,
          tabBarInactiveTintColor: colors.grey,
          tabBarStyle: {
            position: "absolute",
            backgroundColor: userTheme ? colors.black : colors.white,
          },
          tabBarShowLabel: false,
        })}
        initialRouteName="home"
      >
        <Tab.Screen
          name="home"
          component={Home}
          title={"home"}
          options={{
            tabBarLabel: "Client",
            color: colors.baseBackground,
            headerShown: false,
            headerBackVisible: false,
          }}
        />
        <Tab.Screen
          name="chat"
          component={Chat}
          title={"AdminChat"}
          options={{
            tabBarLabel: "",
            title: "AdminChat",
            color: colors.baseBackground,
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="profile"
          component={Profile}
          options={{
            tabBarLabel: "",
            color: colors.baseBackground,
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen
          name="application"
          component={Application}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="intro"
          component={Intro}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="login"
          component={Login}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="forgotPassword"
          component={ForgotPassword}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="verifyOtp"
          component={VerifyOtp}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="resetPassword"
          component={ResetPassword}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="homeTab"
          component={HomeTab}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

//Style used in this screens
const styles = StyleSheet.create({
  tabView: {
    alignItems: "center",
    marginHorizontal: 5,
  },
  tabLabel: {
    fontSize: 10,
    textAlign: "center",
    fontFamily: textFontFaceMedium,
    alignSelf: "center",
    width: 100,
  },
});

//default export
export default Route;
