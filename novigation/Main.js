import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import Explore from "../screens/Main/Explore";
import Map from "../screens/Main/Map";
import Profile from "../screens/Main/Profile";
import Saved from "../screens/Main/Saved";
import colors from "../resources/colors";
import { isAndroid } from "../utilities/Validator";
import Room from "../screens/Main/Room";
import Search from "../screens/Main/Search";
import BackBtn from "../components/Auth/BackBtn";
import { BlurView } from "expo-blur";
import { StyleSheet } from "react-native";

const TabNavigator = createBottomTabNavigator();

const Tabs = () => (
  <TabNavigator.Navigator
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
        } else if (route.name === "Map") {
          iconName += "map";
        } else if (route.name === "Profile") {
          iconName += "person";
        }
        return <Ionicons name={iconName} color={focused ? colors.red : "grey"} size={26} />;
      },
    })}>
    <TabNavigator.Screen name="Explore" component={Explore} />
    <TabNavigator.Screen name="Saved" component={Saved} />
    <TabNavigator.Screen name="Map" component={Map} />
    <TabNavigator.Screen name="Profile" component={Profile} />
  </TabNavigator.Navigator>
);

const MainNavigator = createStackNavigator();
export default () => (
  <MainNavigator.Navigator
    mode="card"
    screenOptions={{
      headerBackTitleVisible: false,
      headerBackImage: () => <BackBtn />,
    }}>
    <MainNavigator.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
    <MainNavigator.Screen
      options={{
        headerTransparent: true,
        headerBackground: () => (
          <BlurView intensity={isAndroid() ? 80 : 50} tint="light" style={StyleSheet.absoluteFill} />
        ),
      }}
      name="RoomDetail"
      component={Room}
    />
    <MainNavigator.Screen options={{ headerShown: false }} name="Search" component={Search} />
  </MainNavigator.Navigator>
);
