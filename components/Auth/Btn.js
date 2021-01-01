import React from "react";
import { ActivityIndicator, Dimensions, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import colors from "../../resources/colors";

const { width } = Dimensions.get("screen");

const Button = styled.View`
margin-bottom: 10px;
  align-items: center;
  border-radius: 15px;
  border: 1px solid ${props => (props.accent ? "transparent" : "grey")}
  width: ${width / 1.5}px;
  background-color: ${props => (props.accent ? colors.red : "transparent")};
  padding: 15px 0px;
`;

const Text = styled.Text`
  font-weight: 600;
  color: ${props => (props.accent ? "white" : "black")};
  font-size: 16px;
`;

const Btn = ({ loading, onPress, text, accent = false }) => (
  <TouchableOpacity onPress={loading ? null : onPress}>
    <Button accent={accent}>
      {loading ? <ActivityIndicator color={accent ? "white" : "black"} /> : <Text accent={accent}>{text}</Text>}
    </Button>
  </TouchableOpacity>
);

Btn.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  accent: PropTypes.bool,
  loading: PropTypes.bool,
};
export default Btn;
