import React, { useState } from "react";
import api from "../../../utilities/api";
import { isEmail } from "../../../utilities/Validator";
import SignUpPresenter from "./SignUpPresenter";

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
    <SignUpPresenter
      firstName={firstName}
      setFirstName={setFirstName}
      lastName={lastName}
      setLastName={setLastName}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      loading={loading}
      handleSubmit={handleSubmit}
    />
  );
};
