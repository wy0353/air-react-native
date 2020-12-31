import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Welcome from "../screens/Welcome";
import SignUp from "../screens/SignUp";
import SignIn from "../screens/SignIn";

const Auth = createStackNavigator();

export default () => (
  <Auth.Navigator>
    <Auth.Screen name="Welcome" component={Welcome} />
    <Auth.Screen name="SignUp" component={SignUp} />
    <Auth.Screen name="SignIn" component={SignIn} />
  </Auth.Navigator>
);
