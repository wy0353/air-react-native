import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Explore from "../screens/Main/Explore";
import MapScreen from "../screens/Main/MapScreen";
import Profile from "../screens/Main/Profile";
import Saved from "../screens/Main/Saved";
import colors from "../resources/colors";
import { isAndroid } from "../utilities/Validator";

const Main = createBottomTabNavigator();

export default () => (
  <Main.Navigator
    tabBarOptions={{
      activeTintColor: colors.red,
      labelStyle: {
        textTransform: "uppercase",
        fontWeight: "600",
      },
    }}
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused }) => {
        let iconName = `${isAndroid() ? "md-" : "ios-"}`;
        if (route.name === "Explore") {
          iconName += "search";
        } else if (route.name === "Saved") {
          iconName += "heart";
        } else if (route.name === "MapScreen") {
          iconName += "map";
        } else if (route.name === "Profile") {
          iconName += "person";
        }

        return <Ionicons name={iconName} color={focused ? colors.red : "grey"} size={26} />;
      },
    })}>
    <Main.Screen name="Explore" component={Explore}></Main.Screen>
    <Main.Screen name="Saved" component={Saved}></Main.Screen>
    <Main.Screen name="MapScreen" component={MapScreen}></Main.Screen>
    <Main.Screen name="Profile" component={Profile}></Main.Screen>
  </Main.Navigator>
);
