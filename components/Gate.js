import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Auth from "../novigation/Auth";
import Main from "../novigation/Main";

export default () => {
  const { isLoggedIn } = useSelector(state => state.usersReducer);
  const dispatch = useDispatch();
  return <NavigationContainer>{isLoggedIn ? <Main /> : <Auth />}</NavigationContainer>;
};
