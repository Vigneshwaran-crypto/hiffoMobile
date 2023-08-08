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

import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//Auth screens
import Application from "../screens/App/Application";
import Login from "../screens/Auth/login";
import ForgotPassword from "../screens/Auth/ForgotPassword";
import ResetPassword from "../screens/Auth/ResetPassword";
import VerifyOtp from "../screens/Auth/VerifyOtp";
import Intro from "../screens/Auth/Intro";
import SignUp from "../screens/Auth/SignUp";

//home tab screens
import Orders from "../screens/HomeTab/Orders/Orders";
import FoodMenu from "../screens/HomeTab/FoodMenu/FoodMenu";
import Tables from "../screens/HomeTab/Tables/Tables";
import Analytics from "../screens/HomeTab/Analytics/Analytics";
import Users from "../screens/HomeTab/Users/Users";

import { darkMode, getItem, LOG } from "../common/util";
import Ionicons from "react-native-vector-icons/Ionicons";
import Foundation from "react-native-vector-icons/Foundation";
import { navigationRef } from "./RootNavigation";
import CreateRest from "../screens/Auth/CreateRest";
import CreateManagement from "../screens/Auth/CreateManagement";

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

            if (route.name === "orders") {
              return (
                <View style={[styles.tabView]}>
                  <Feather
                    name="clipboard"
                    size={focused ? 22 : 20}
                    color={color}
                  />
                  <Text style={[styles.tabLabel, (color = { color })]}>
                    Orders
                  </Text>
                </View>
              );
            } else if (route.name === "foodMenu") {
              return (
                <View style={[styles.tabView]}>
                  <Feather
                    name="align-center"
                    size={focused ? 22 : 20}
                    color={color}
                  />
                  <Text style={[styles.tabLabel, (color = { color })]}>
                    FoodMenu
                  </Text>
                </View>
              );
            } else if (route.name === "tables") {
              return (
                <View style={[styles.tabView]}>
                  <Feather name="disc" size={focused ? 25 : 20} color={color} />
                  <Text style={[styles.tabLabel, (color = { color })]}>
                    Tables
                  </Text>
                </View>
              );
            } else if (route.name === "analytics") {
              return (
                <View style={[styles.tabView]}>
                  <Feather
                    name="trending-up"
                    size={focused ? 22 : 20}
                    color={color}
                  />
                  <Text style={[styles.tabLabel, (color = { color })]}>
                    Analytics
                  </Text>
                </View>
              );
            } else if (route.name === "users") {
              return (
                <View style={[styles.tabView]}>
                  <Feather name="user" size={focused ? 22 : 20} color={color} />
                  <Text style={[styles.tabLabel, (color = { color })]}>
                    Users
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
        initialRouteName="orders"
      >
        <Tab.Screen
          name="orders"
          component={Orders}
          options={{
            color: colors.baseBackground,
            headerShown: false,
            headerBackVisible: false,
          }}
        />
        <Tab.Screen
          name="foodMenu"
          component={FoodMenu}
          options={{
            color: colors.baseBackground,
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="tables"
          component={Tables}
          options={{
            color: colors.baseBackground,
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="analytics"
          component={Analytics}
          options={{
            color: colors.baseBackground,
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="users"
          component={Users}
          options={{
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
          name="signUp"
          component={SignUp}
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
          name="createRest"
          component={CreateRest}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="createManagement"
          component={CreateManagement}
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
