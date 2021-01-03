import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { userLogin } from "../../../redux/usersSlice";
import { isEmail } from "../../../utilities/Validator";
import SignInPresenter from "./SignInPresenter";

export default ({ route: { params } }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState(params?.email || "test@email.com");
  const [password, setPassword] = useState(params?.password || "pppppppp");
  const isFormValid = () => {
    if (email === "" || email === undefined || password === "" || password === undefined) {
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
    <SignInPresenter
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
