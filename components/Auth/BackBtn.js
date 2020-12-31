import React from "react";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import isAndroid from "../../utilities/Checker";

const Container = styled.View`
  ${isAndroid ? "padding-left: 0px;" : "padding-left: 10px;"}
`;
export default () => (
  <Container>
    <Ionicons name="chevron-back-sharp" size={24} color="black" />
  </Container>
);
