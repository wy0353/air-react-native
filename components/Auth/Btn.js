import React from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import colors from "../../resources/colors";

const { width } = Dimensions.get("screen");

const Button = styled.View`
  align-items: center;
  border-radius: 10px;
  border: 1px solid ${props => (props.accent ? "transparent" : "grey")}
  width: ${width / 1.5}px;
  background-color: ${props => (props.accent ? colors.red : "transparent")};
  padding: 15px 0px;
`;

const Text = styled.Text`
  color: ${props => (props.accent ? "white" : "black")};
`;

const Btn = ({ onPress, text, accent = false }) => (
  <TouchableOpacity onPress={onPress}>
    <Button accent={accent}>
      <Text accent={accent}>{text}</Text>
    </Button>
  </TouchableOpacity>
);

Btn.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  accent: PropTypes.bool,
};
export default Btn;
