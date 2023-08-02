//Default Libraries
import React, { Component } from "react";
import { AppRegistry } from "react-native";
import App from "./src/screens/App/App";
import { name as appName } from "./app.json";

//Plugin Libraries
import { Provider } from "react-redux";

//User Defined Libraries
import configureStore from "./src/redux/store";

//Global variable (scope=(This Screen)).
const store = configureStore();

//Main Function which returns the application
const reactNativeRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

//Main Registary where we will provide our application and its name.
AppRegistry.registerComponent(appName, () => reactNativeRedux);
