import React, { useState } from "react";
import { StatusBar, KeyboardAvoidingView } from "react-native";
import styled from "styled-components/native";
import Btn from "../../components/Auth/Btn";
import Input from "../../components/Auth/Input";
import DismissKeyboard from "../../components/DismissKeyboard";
import api from "../../utilities/api";
import { isEmail } from "../../utilities/Validator";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const InputContainer = styled.View`
  margin-bottom: 10px;
`;

export default ({ navigation: { navigate } }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const isFormValid = () => {
    if (firstName === "" || lastName === "" || email === "" || password === "") {
      alert("All fields are required.");
      return false;
    }
    if (!isEmail(email)) {
      alert("Email does not valid.");
      return false;
    }
    return true;
  };
  const handleSubmit = async () => {
    if (!isFormValid()) return;
    setLoading(true);
    try {
      const { status, data } = await api.createAccount({
        first_name: firstName,
        last_name: lastName,
        email,
        username: email,
        password,
      });

      if (status === 201) {
        alert("Account Created. Sign in please.");
        navigate("SignIn", { email, password });
      }
    } catch (e) {
      console.warn(e);
      alert("Email already exists.");
    } finally {
      setLoading(false);
    }
  };
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
