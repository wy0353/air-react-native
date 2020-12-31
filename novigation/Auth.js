import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Welcome from "../screens/Welcome";
import SignUp from "../screens/SignUp";
import SignIn from "../screens/SignIn";
import BackBtn from "../components/Auth/BackBtn";
import isAndroid from "../utilities/Checker";

const Auth = createStackNavigator();

export default () => {
  return (
    <Auth.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTitleAlign: "center",
        headerTransparent: isAndroid ? false : true,
        headerBackImage: () => <BackBtn />,
      }}
      headerMode={isAndroid ? "screen" : "float"}>
      <Auth.Screen
        name="Welcome"
        component={Welcome}
        options={{
          headerTitleStyle: {
            color: isAndroid ? "black" : "white",
          },
        }}
      />
      <Auth.Screen name="SignUp" component={SignUp} />
      <Auth.Screen name="SignIn" component={SignIn} />
    </Auth.Navigator>
  );
};
