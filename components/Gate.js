import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Text, View, TouchableOpacity, TouchableOpacityBase } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Auth from "../novigation/Auth";
import { logIn, logOut } from "../redux/usersSlice";

export default () => {
  const { isLoggedIn } = useSelector(state => state.usersReducer);
  const dispatch = useDispatch();
  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
          onPress={() => dispatch(logOut())}>
          <Text>Log Out</Text>
        </TouchableOpacity>
      ) : (
        <Auth />
      )}
    </NavigationContainer>
  );
};
