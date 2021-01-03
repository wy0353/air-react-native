import React from "react";
import { StatusBar, KeyboardAvoidingView } from "react-native";
import styled from "styled-components/native";
import Btn from "../../../components/Auth/Btn";
import Input from "../../../components/Auth/Input";
import DismissKeyboard from "../../../components/DismissKeyboard";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const InputContainer = styled.View``;

export default ({ email, setEmail, password, setPassword, handleSubmit }) => (
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
