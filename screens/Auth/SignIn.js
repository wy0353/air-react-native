import React, { useState } from "react";
import { StatusBar, KeyboardAvoidingView } from "react-native";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";
import Btn from "../../components/Auth/Btn";
import Input from "../../components/Auth/Input";
import DismissKeyboard from "../../components/DismissKeyboard";
import { userLogin } from "../../redux/usersSlice";
import api from "../../utilities/api";
import { isEmail } from "../../utilities/Validator";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const InputContainer = styled.View``;

export default ({ route: { params } }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState(params?.email);
  const [password, setPassword] = useState(params?.password);
  const isFormValid = () => {
    if (email === "" || password === "") {
      alert("All fields are required.");
      return false;
    }

    if (!isEmail(email)) {
      alert("Email does not valid.");
      return false;
    }

    return true;
  };
  const handleSubmit = () => {
    if (!isFormValid()) return;
    dispatch(
      userLogin({
        username: email,
        password,
      })
    );
  };
  return (
    <DismissKeyboard>
      <Container>
        <StatusBar barStyle="dark-content" />
        <KeyboardAvoidingView behavior="position">
          <InputContainer>
            <Input
              value={email}
              placeholder="Email"
              autoCapitalize="none"
              stateFn={setEmail}
              keyboardType="email-address"
            />
            <Input
              value={password}
              placeholder="Password"
              autoCapitalize="none"
              stateFn={setPassword}
              isPassword={true}
            />
          </InputContainer>
          <Btn onPress={handleSubmit} text={"Sign In"} accent={true} />
        </KeyboardAvoidingView>
      </Container>
    </DismissKeyboard>
  );
};
