import React from "react";
import { TouchableOpacity, Demensions, Dimensions } from "react-native";
import styled from "styled-components/native";
import PropTypes from "prop-types";

const { width } = Dimensions.get("screen");

const Container = styled.TextInput`
  width: ${width / 1.5}px;
  padding: 15px;
  border-radius: 15px;
  border: 1px solid grey;
  background-color: white;
  margin-bottom: 10px;
  font-weight: 500;
`;

const Input = ({ value, placeholder, isPassword = false, autoCapitalize, stateFn, keyboardType }) => (
  <Container
    value={value}
    placeholder={placeholder}
    secureTextEntry={isPassword ? true : false}
    autoCapitalize={autoCapitalize}
    onChangeText={text => stateFn(text)}
    keyboardType={keyboardType}
  />
);

Input.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  isPassword: PropTypes.bool,
  autoCapitalize: PropTypes.string,
  stateFn: PropTypes.func.isRequired,
};

export default Input;
