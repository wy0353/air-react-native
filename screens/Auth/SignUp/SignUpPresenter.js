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
const InputContainer = styled.View`
  margin-bottom: 10px;
`;

export default ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  password,
  setPassword,
  loading,
  handleSubmit,
}) => {
  return (
    <DismissKeyboard>
      <Container
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}>
        <StatusBar barStyle="dark-content" />
        <KeyboardAvoidingView behavior="position">
          <InputContainer>
            <Input value={firstName} placeholder="Firstname" autoCapitalize="words" stateFn={setFirstName} />
            <Input value={lastName} placeholder="Lastname" autoCapitalize="words" stateFn={setLastName} />
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
          <Btn loading={loading} onPress={handleSubmit} text={"Sign Up"} accent={true} />
        </KeyboardAvoidingView>
      </Container>
    </DismissKeyboard>
  );
};
